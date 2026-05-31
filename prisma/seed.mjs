/**
 * Seed script to create test Doctor and Hospital accounts.
 *
 * Usage:  node prisma/seed.mjs
 *
 * Credentials created:
 *   Doctor   →  userId: "admin-doc"    password: "admin123"
 *   Hospital →  idToLogin: "admin-hos" password: "admin123"
 */

import { PrismaClient } from "@prisma/client";
import { Argon2id } from "oslo/password";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await new Argon2id().hash("admin123");

  // ── Doctor ──────────────────────────────────────────────
  const existingDoctor = await prisma.doctor.findUnique({
    where: { userId: "admin-doc" },
  });

  if (existingDoctor) {
    console.log("⚠  Doctor 'admin-doc' already exists – skipping.");
  } else {
    const doctor = await prisma.doctor.create({
      data: {
        userId: "admin-doc",
        name: "Dr. Admin Test",
        dob: new Date("1985-06-15"),
        aadharNo: "111122223333",
        licenceNo: "LIC-ADMIN-001",
        contactno: "9876543210",
        email: "admin.doctor@vitalsync.test",
        hashedPassword,
        ratings: 4.5,
        imageUrl: null,
      },
    });
    console.log("✅ Doctor created  →  id:", doctor.id);
  }

  // ── Hospital ────────────────────────────────────────────
  const existingHospital = await prisma.hospital.findUnique({
    where: { idToLogin: "admin-hos" },
  });

  if (existingHospital) {
    console.log("⚠  Hospital 'admin-hos' already exists – skipping.");
  } else {
    const hospital = await prisma.hospital.create({
      data: {
        name: "VitalSync Test Hospital",
        licenceno: "HOSP-LIC-001",
        estyear: 2010,
        Website: "https://vitalsync-hospital.test",
        contactno: "0112345678",
        alternatecontactno: "0119876543",
        email: "admin.hospital@vitalsync.test",
        address: "123 Health Street, Medical District",
        City: "New Delhi",
        State: "Delhi",
        Zipcode: "110001",
        hashedPassword,
        idToLogin: "admin-hos",
        isVerified: true,
        bedsAvailable: 100,
        opdsAvailable: 20,
        icuAvailable: 10,
        labsAvailable: 5,
        doctorsAvailable: 30,
        sharedAvailable: 15,
        generalWardAvailable: 40,
      },
    });
    console.log("✅ Hospital created →  id:", hospital.id);
  }

  // ── Patient (Aadhar-based login) ────────────────────────
  const existingPatient = await prisma.patient.findFirst({
    where: { email: "admin.patient@vitalsync.test" },
  });

  if (existingPatient) {
    console.log("⚠  Patient 'admin-patient' already exists – skipping.");
  } else {
    const patient = await prisma.patient.create({
      data: {
        email: "admin.patient@vitalsync.test",
        name: "Test Patient",
        gender: "Male",
        dob: "1995-01-01",
        aadharno: "999988887777",
        bloodgroup: "O+",
        hashedPassword,
        contactno: "9988776655",
        alternatecontactno: "9988776644",
        address: "456 Wellness Road, Health City",
        emergencycontact: "9988776633",
        prevHis: "None",
      },
    });
    console.log("✅ Patient created →  id:", patient.id);
  }

  console.log("\n──────────────────────────────────────────────");
  console.log("  TEST CREDENTIALS");
  console.log("──────────────────────────────────────────────");
  console.log("  Doctor Login   (http://localhost:3000/doctor-auth)");
  console.log("    Unique ID : admin-doc");
  console.log("    Password  : admin123");
  console.log("");
  console.log("  Hospital Login (http://localhost:3000/hospital-auth)");
  console.log("    Unique ID : admin-hos");
  console.log("    Password  : admin123");
  console.log("");
  console.log("  Patient Login  (http://localhost:3000/patient-auth)");
  console.log("    Aadhar No : 999988887777");
  console.log("    Password  : admin123");
  console.log("──────────────────────────────────────────────\n");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
