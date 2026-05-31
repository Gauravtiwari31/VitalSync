import { NextRequest, NextResponse } from "next/server";
import { curoFlash } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { input, messages } = await req.json();
    if (!input || typeof input !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'input' field" },
        { status: 400 }
      );
    }
    const response = await curoFlash(input, messages || []);
    return NextResponse.json({ response });
  } catch (error) {
    console.error("API /api/bhura/flash error:", error);
    return NextResponse.json(
      {
        response:
          "Something went wrong on the server. " +
          (error instanceof Error ? error.message : String(error)),
      },
      { status: 200 }
    );
  }
}
