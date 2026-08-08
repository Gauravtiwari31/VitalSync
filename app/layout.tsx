import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

// Body face: warm geometric humanist — legible at small sizes in dense tables.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// Display face: used for headings and every numeric vitals readout.
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["500", "600", "700"],
});
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jakarta.variable} ${sora.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://api.opencagedata.com" />
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('themeMode');
                  var isDark = false;
                  if (saved === 'dark') {
                    isDark = true;
                  } else if (saved === 'light') {
                    isDark = false;
                  } else {
                    isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  }
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />

      </head>
      <body className="font-sans antialiased">
        <div className="relative w-full bg-background">
          {/*
            Clinical backdrop: a faint chart grid with a single teal wash,
            instead of scattered pastel blobs. Reads as instrument paper.
          */}
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            aria-hidden="true"
          >
            <div className="clinical-grid absolute inset-0 opacity-60 dark:opacity-30" />

            {/* Fades the grid out toward the bottom so it never fights content */}
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/70 to-background" />

            {/* Vital-sign wash, anchored top-left and bottom-centre */}
            <div className="absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl dark:bg-primary/15" />
            <div className="absolute bottom-0 left-1/2 h-[18rem] w-[42rem] -translate-x-1/2 rounded-t-full bg-linear-to-t from-primary/15 to-transparent blur-3xl" />
            <div className="absolute top-[60%] right-0 h-[22rem] w-[22rem] rounded-full bg-vital-low/8 blur-3xl dark:bg-vital-low/10" />
          </div>

          <div className="relative z-10">{children}</div>
          <Toaster richColors closeButton position="top-center" />
        </div>
      </body>
    </html>
  );
}
