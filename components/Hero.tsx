"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SymptomSearchBar from "./SymptomsSearchBar";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const trustItems = [
  "HIPAA Compliant Infrastructure",
  "Trusted by 1,200+ Clinicians",
  "ISO 27001 Certified",
];

const Hero = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative min-h-[640px] w-full bg-[#fafafa] dark:bg-[#080e1a] overflow-hidden">
      {/* Subtle teal accent — top right only */}
      <div
        className="absolute -top-40 right-0 w-[520px] h-[520px] rounded-full opacity-[0.07] dark:opacity-[0.12]"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, hsl(162,72%,34%), transparent 70%)",
        }}
        aria-hidden
      />
      {/* Faint horizontal rule grid — hidden in dark mode */}
      <div
        className="absolute inset-0 pointer-events-none dark:opacity-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 79px, hsl(220,14%,91%,0.4) 79px, hsl(220,14%,91%,0.4) 80px)",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 pt-20 pb-28 sm:pt-28 sm:pb-36 grid lg:grid-cols-[1fr_400px] gap-12 items-center">
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
            className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/40"
          >
            <span className="block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 tracking-wide uppercase">
              Healthcare Platform
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-[2.6rem] sm:text-5xl md:text-6xl font-normal leading-[1.12] tracking-tight text-slate-900 dark:text-white mb-6"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Seamless care,{" "}
            <em className="not-italic text-emerald-600 dark:text-emerald-400">
              for everyone
            </em>{" "}
            in the loop.
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-lg text-slate-500 dark:text-slate-400 mb-8 leading-relaxed max-w-xl"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            VitalSync connects hospitals, doctors, and patients on one platform —
            real-time coordination, intelligent tools, and complete care records.
          </motion.p>

          {/* Search bar (desktop) */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="hidden md:block mb-8 max-w-lg"
          >
            <SymptomSearchBar className="" variant="hero" />
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">
              Search symptoms, doctors, or specialties
            </p>
          </motion.div>

          {/* Mobile CTA */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="md:hidden mb-8"
          >
            <Link href="/patient-auth">
              <Button
                size="lg"
                className="rounded-full px-8 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm h-12 font-medium"
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
            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 text-sm"
          >
            {trustItems.map((item) => (
              <span
                key={item}
                className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right column — stat card cluster */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="hidden lg:flex flex-col gap-4"
        >
          {/* Metric cards */}
          {[
            { label: "Active Patients", value: "124k+", sub: "across network" },
            { label: "Avg. Wait Reduced", value: "68%", sub: "vs traditional" },
            { label: "Hospitals Connected", value: "340+", sub: "nationwide" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-5 flex items-center justify-between shadow-sm"
            >
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-0.5">
                  {stat.label}
                </p>
                <p
                  className="text-2xl font-semibold text-slate-900 dark:text-white"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  {stat.value}
                </p>
              </div>
              <span className="text-xs text-slate-400 dark:text-slate-500 text-right">
                {stat.sub}
              </span>
            </div>
          ))}

          {/* AI teaser card */}
          <div className="bg-emerald-600 dark:bg-emerald-700 rounded-2xl px-6 py-5 text-white shadow-md">
            <p className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-1">
              AI Health Assistant
            </p>
            <p className="text-lg font-medium leading-snug">
              HealthBuddy — your clinical copilot, available 24 / 7.
            </p>
            <Link href="/assistantBhura">
              <button className="mt-3 text-xs font-semibold underline underline-offset-2 opacity-90 hover:opacity-100 flex items-center gap-1">
                Try it now <ArrowRight className="h-3 w-3" />
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
