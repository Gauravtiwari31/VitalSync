import { NextRequest, NextResponse } from "next/server";
import { lucia } from "@/lib/lucia";
import prisma from "@/lib/db";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const USERINFO_URL = "https://openidconnect.googleapis.com/v1/userinfo";

function generateRandomAadhar() {
  const min = 100000000000;
  const max = 999999999999;
  return Math.floor(Math.random() * (max - min + 1) + min).toString();
}

async function findUniqueAadhar() {
  let aadhar = generateRandomAadhar();
  let exists = await prisma.patient.findUnique({
    where: {
      aadharno: aadhar,
    },
  });
  let attempts = 0;
  while (exists && attempts < 10) {
    aadhar = generateRandomAadhar();
    exists = await prisma.patient.findUnique({
      where: {
        aadharno: aadhar,
      },
    });
    attempts += 1;
  }
  return aadhar;
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const error = request.nextUrl.searchParams.get("error");

  if (error) {
    console.error("Google OAuth error:", error);
    return NextResponse.redirect(new URL("/patient-auth", request.url));
  }

  if (!code) {
    console.error("Google OAuth callback: No authorization code received");
    return NextResponse.redirect(new URL("/patient-auth", request.url));
  }

  const clientId = process.env.GOOGLE_CLIENT_ID ?? process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret || clientId.startsWith("your_") || clientSecret.startsWith("your_")) {
    console.error("Google OAuth: Missing or invalid credentials");
    return NextResponse.json({ error: "Missing or invalid Google OAuth credentials" }, { status: 500 });
  }

  const origin = request.nextUrl.origin;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI ?? `${origin}/api/auth/google/callback`;

  // Exchange authorization code for tokens
  let tokenData: any;
  try {
    const tokenResponse = await fetch(TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });
    tokenData = await tokenResponse.json();
    if (!tokenResponse.ok) {
      console.error("Google OAuth token exchange failed:", tokenData);
      return NextResponse.redirect(new URL("/patient-auth", request.url));
    }
  } catch (err) {
    console.error("Google OAuth token fetch error:", err);
    return NextResponse.redirect(new URL("/patient-auth", request.url));
  }

  const accessToken = tokenData.access_token;
  if (!accessToken) {
    console.error("Google OAuth: No access_token in response", tokenData);
    return NextResponse.redirect(new URL("/patient-auth", request.url));
  }

  // Fetch user info from Google
  let userInfo: any;
  try {
    const userResponse = await fetch(USERINFO_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    userInfo = await userResponse.json();
    if (!userResponse.ok) {
      console.error("Google OAuth userinfo failed:", userInfo);
      return NextResponse.redirect(new URL("/patient-auth", request.url));
    }
  } catch (err) {
    console.error("Google OAuth userinfo fetch error:", err);
    return NextResponse.redirect(new URL("/patient-auth", request.url));
  }

  const email = (userInfo.email as string | undefined)?.toLowerCase();
  if (!email) {
    console.error("Google OAuth: No email in user info", userInfo);
    return NextResponse.redirect(new URL("/patient-auth", request.url));
  }

  // Find or create patient, then create session
  try {
    let patient = await prisma.patient.findFirst({
      where: { email },
    });
    if (!patient) {
      const aadharno = await findUniqueAadhar();
      patient = await prisma.patient.create({
        data: {
          email,
          name: (userInfo.name as string) ?? "Google Patient",
          hashedPassword: null,
          gender: "Not specified",
          dob: "1970-01-01",
          aadharno,
          bloodgroup: "Unknown",
          contactno: "",
          alternatecontactno: "",
          address: "",
          emergencycontact: "",
          prevHis: "",
          imageUrl: (userInfo.picture as string) ?? null,
        },
      });
      console.log("Google OAuth: Created new patient", patient.id);
    } else {
      console.log("Google OAuth: Found existing patient", patient.id);
    }

    const session = await lucia.createSession(patient.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    const response = NextResponse.redirect(new URL(`/patient-dash/${patient.id}`, request.url));
    response.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return response;
  } catch (err) {
    console.error("Google OAuth: Database/session error:", err);
    return NextResponse.redirect(new URL("/patient-auth", request.url));
  }
}
