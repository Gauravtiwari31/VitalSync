import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "sonner";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { usePathname } from "next/navigation";
import { headers } from "next/headers";
import { Bot } from "lucide-react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title:
    "VitalSync | Advanced Real-Time Healthcare Solution for Hospitals, Patients, Doctors, and Pharmacies",
  description:
    "VitalSync is an all-in-one healthcare platform designed for hospitals, patients, doctors, and pharmacies. Offering real-time OPD management, bed availability tracking, patient care optimization, pharmacy inventory management, and a centralized health dashboard. Experience seamless healthcare collaboration with cutting-edge technology built for the modern healthcare ecosystem.",
  icons: {
    icon: ["https://i.imghippo.com/files/4OFtW1729338402.jpg"],
  },
  openGraph: {
    title:
      "VitalSync | Real-Time Healthcare Solution for Hospitals, Doctors, Patients & Pharmacies",
    description:
      "VitalSync revolutionizes healthcare with an integrated platform for hospitals, patients, doctors, and pharmacies. It offers real-time OPD tracking, pharmacy inventory control, bed availability updates, and a centralized patient dashboard for optimized care.",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    images: [
      {
        url: "https://i.imghippo.com/files/4OFtW1729338402.jpg",
        width: 800,
        height: 600,
        alt: "VitalSync logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "VitalSync | Transforming Real-Time Healthcare for Hospitals, Doctors, Patients & Pharmacies",
    description:
      "Join the future of healthcare with VitalSync's all-in-one platform for hospitals, patients, doctors, and pharmacies. Real-time OPD management, bed tracking, pharmacy solutions, and patient dashboards for seamless healthcare collaboration.",
    images: ["https://i.imghippo.com/files/4OFtW1729338402.jpg"],
  },
  keywords:
    "VitalSync, healthcare platform, real-time healthcare solution, hospital management software, patient care system, pharmacy inventory management, doctor-patient communication, OPD tracking software, bed availability tracker, healthcare technology, health dashboard, modern healthcare ecosystem, OPD queuing, patient history management, patient care optimization",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.opencagedata.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="shortcut icon"
          href="https://i.imghippo.com/files/4OFtW1729338402.jpg"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "VitalSync",
              description:
                "VitalSync is an all-in-one healthcare platform for hospitals, doctors, patients, and pharmacies, offering real-time OPD management, bed tracking, pharmacy control, and patient dashboards.",
              applicationCategory: "Healthcare",
              operatingSystem: "Web",
              author: {
                "@type": "Person",
                name: "Gaurav Tiwari",
                description: "Creator and maintainer",
              },
              url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
              image: "https://i.imghippo.com/files/4OFtW1729338402.jpg",
              screenshot: "https://i.imghippo.com/files/4OFtW1729338402.jpg",
            }),
          }}
        />

      </head>
      <body className={inter.className}>
        <div className="relative w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Primary Background Elements */}
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-teal-200/30 dark:bg-teal-900/20 blur-3xl" />
            <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-amber-200/30 dark:bg-amber-900/20 blur-3xl" />

            {/* Centered Bottom Glow - Light Mode */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40rem] h-[20rem] 
                          bg-gradient-to-t from-teal-300/50 to-teal-200/10 
                          blur-3xl rounded-t-full 
                          dark:opacity-0"
            />

            {/* Centered Bottom Glow - Dark Mode */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40rem] h-[20rem] 
                          bg-gradient-to-t from-teal-800/60 to-teal-700/5
                          blur-3xl rounded-t-full opacity-0 
                          dark:opacity-100"
            />

            {/* Additional Background Elements */}
            <div className="absolute -bottom-32 left-1/4 w-64 h-64 rounded-full bg-emerald-200/30 dark:bg-emerald-900/20 blur-3xl" />

            {/* Light Mode Particles */}
            <div className="absolute bottom-24 left-1/4 w-4 h-4 rounded-full bg-teal-400/40 blur-sm dark:opacity-0" />
            <div className="absolute bottom-36 left-2/3 w-3 h-3 rounded-full bg-teal-400/40 blur-sm dark:opacity-0" />
            <div className="absolute bottom-48 left-1/3 w-2 h-2 rounded-full bg-teal-400/40 blur-sm dark:opacity-0" />

            {/* Dark Mode Particles */}
            <div className="absolute bottom-24 left-1/4 w-4 h-4 rounded-full bg-teal-600/40 blur-sm opacity-0 dark:opacity-100" />
            <div className="absolute bottom-36 left-2/3 w-3 h-3 rounded-full bg-teal-600/40 blur-sm opacity-0 dark:opacity-100" />
            <div className="absolute bottom-48 left-1/3 w-2 h-2 rounded-full bg-teal-600/40 blur-sm opacity-0 dark:opacity-100" />

            {/* Repeated Pattern for Longer Pages */}
            <div className="absolute top-[60%] -left-32 w-96 h-96 rounded-full bg-teal-200/30 dark:bg-teal-900/20 blur-3xl" />
            <div className="absolute top-[90%] right-0 w-80 h-80 rounded-full bg-amber-200/30 dark:bg-amber-900/20 blur-3xl" />
            <div className="absolute top-[120%] left-1/4 w-64 h-64 rounded-full bg-emerald-200/30 dark:bg-emerald-900/20 blur-3xl" />
          </div>

          {/* Main Content Container */}
          
          <div className="relative z-10">{children}</div>
          <Toaster richColors></Toaster>

        </div>
      </body>
    </html>
  );
}
