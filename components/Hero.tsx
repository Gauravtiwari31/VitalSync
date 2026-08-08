"use client";
import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import SymptomSearchBar from "./SymptomsSearchBar";
import {
  Activity,
  ArrowRight,
  Droplets,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  Thermometer,
} from "lucide-react";
import VitalsTrace from "./VitalsTrace";
import { VitalStatusBadge } from "./VitalSign";

const trustItems = [
  { icon: ShieldCheck, label: "HIPAA-compliant infrastructure" },
  { icon: Stethoscope, label: "Trusted by 1,200+ clinicians" },
  { icon: ShieldCheck, label: "ISO 27001 certified" },
];

// Illustrative readings for the monitor panel. The reference ranges are the
// real adult values, so the colour coding is defensible rather than decorative.
const vitals = [
  {
    label: "Heart rate",
    value: "72",
    unit: "bpm",
    range: "60–100",
    icon: HeartPulse,
    tone: "text-vital-normal",
  },
  {
    label: "SpO₂",
    value: "98",
    unit: "%",
    range: "95–100",
    icon: Droplets,
    tone: "text-vital-low",
  },
  {
    label: "Temp",
    value: "36.8",
    unit: "°C",
    range: "36.1–37.2",
    icon: Thermometer,
    tone: "text-vital-normal",
  },
  {
    label: "BP",
    value: "118/76",
    unit: "mmHg",
    range: "<120/80",
    icon: Activity,
    tone: "text-vital-normal",
  },
];

const Hero = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative min-h-[640px] w-full overflow-hidden bg-background">
      {/* Clinical wash, top right */}
      <div
        className="absolute -top-40 right-0 h-[520px] w-[520px] rounded-full opacity-[0.09] dark:opacity-[0.16]"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, hsl(var(--primary)), transparent 70%)",
        }}
        aria-hidden
      />
      {/* Chart-paper rule lines, fading out down the section */}
      <div
        className="clinical-grid pointer-events-none absolute inset-0 opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent)] dark:opacity-40"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-5 pt-20 pb-28 sm:px-8 sm:pt-28 sm:pb-36 lg:grid-cols-[1fr_400px]">
        {/* Left column */}
        <motion.div
          initial="initial"
          animate="animate"
          transition={{ staggerChildren: 0.12 }}
          className="max-w-2xl"
        >
          {/* Eyebrow */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-primary"
          >
            <span className="status-dot" />
            <span className="text-xs font-semibold uppercase tracking-wide">
              Connected care platform
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-6 text-balance font-display text-[2.6rem] font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl"
          >
            Every vital, every record,{" "}
            <span className="text-primary">one care team</span>.
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-8 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
          >
            VitalSync links hospitals, clinicians and patients on a single
            record — live OPD queues, bed availability, and a full history that
            travels with the patient.
          </motion.p>

          {/* Search bar (desktop) */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mb-8 hidden max-w-lg md:block"
          >
            <SymptomSearchBar className="" variant="hero" />
            <p className="mt-2 text-sm text-muted-foreground">
              Describe a symptom, or search a doctor or specialty
            </p>
          </motion.div>

          {/* Mobile CTA */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mb-8 md:hidden"
          >
            <Link href="/patient-auth">
              <Button
                size="lg"
                className="h-12 rounded-full bg-primary px-8 font-medium text-primary-foreground shadow-xs hover:bg-primary/90"
              >
                Get started free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:gap-5"
          >
            {trustItems.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 text-muted-foreground"
              >
                <Icon className="h-4 w-4 shrink-0 text-primary" />
                {label}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right column — patient monitor panel */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="hidden flex-col gap-4 lg:flex"
        >
          <div className="clinical-card overflow-hidden">
            {/* Monitor header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Bed 04 · Live
              </p>
              <VitalStatusBadge status="normal" pulse>
                Stable
              </VitalStatusBadge>
            </div>

            {/* ECG trace */}
            <div className="h-24 px-2 py-2 text-vital-normal">
              <VitalsTrace beats={3} duration={3} showPaper />
            </div>

            {/* Vitals grid */}
            <div className="grid grid-cols-2 divide-x divide-y divide-border border-t border-border">
              {vitals.map(({ label, value, unit, range, icon: Icon, tone }) => (
                <div key={label} className="p-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[0.7rem] font-medium uppercase tracking-wider text-muted-foreground">
                      {label}
                    </p>
                    <Icon className={`h-3.5 w-3.5 shrink-0 ${tone}`} />
                  </div>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span
                      className={`vitals-num text-2xl font-semibold ${tone}`}
                    >
                      {value}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">
                      {unit}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[0.7rem] text-muted-foreground">
                    Ref {range}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* AI teaser card */}
          <div className="relative overflow-hidden rounded-lg bg-primary px-6 py-5 text-primary-foreground shadow-md">
            <div className="absolute inset-0 opacity-20" aria-hidden>
              <VitalsTrace beats={4} duration={4} strokeWidth={1.5} />
            </div>
            <div className="relative">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider opacity-80">
                AI health assistant
              </p>
              <p className="font-display text-lg font-medium leading-snug">
                HealthBuddy — triage, explain, and follow up, 24/7.
              </p>
              <Link href="/assistantBhura">
                <button className="mt-3 flex items-center gap-1 text-xs font-semibold underline underline-offset-2 opacity-90 hover:opacity-100">
                  Try it now <ArrowRight className="h-3 w-3" />
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
