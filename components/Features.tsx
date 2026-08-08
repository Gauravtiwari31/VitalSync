"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Bell,
  QrCode,
  Bed,
  ClipboardList,
  Search,
  PillIcon,
  ArrowRight,
} from "lucide-react";
import { AnimatedListDemo } from "./magicui/animatedListDemo";
import HospitalCard from "./magicui/HospitalCardDemo";

/**
 * Each feature is keyed to a hue from the clinical status scale rather than an
 * arbitrary hex, so it themes correctly in dark mode and the colour carries the
 * same meaning it does on a vitals tile: amber = attention, blue = flow,
 * green = availability, teal = the record, red = dosage safety.
 */
const features = [
  {
    icon: Bell,
    title: "Smart Notifications",
    description:
      "Receive personalized health alerts based on your appointments, medication schedule, and wellness goals. Our AI-driven system prioritizes what matters most to you.",
    accentVar: "--vital-elevated",
    component: (
      <AnimatedListDemo className="h-[300px] w-full scale-90 border-none transition-all duration-300 mask-[linear-gradient(to_top,transparent_10%,#000_50%)]" />
    ),
  },
  {
    icon: QrCode,
    title: "Virtual Queue System",
    description:
      "Skip the physical waiting room. Scan, queue up virtually, and get real-time updates on your position. Arrive just when the doctor is ready.",
    accentVar: "--vital-low",
    component: null,
  },
  {
    icon: Bed,
    title: "Smart Bed Allocation",
    description:
      "Our predictive algorithm optimizes bed availability across departments. Reserve your space in advance with real-time visibility on care options.",
    accentVar: "--vital-normal",
    component: null,
  },
  {
    icon: ClipboardList,
    title: "Health Timeline",
    description:
      "Visualize your complete medical journey on an interactive timeline. Track conditions, treatments, and recovery with detailed visual analytics.",
    accentVar: "--primary",
    component: null,
  },
  {
    icon: Search,
    title: "Care Facility Finder",
    description:
      "Find hospitals and clinics with advanced filtering. Compare specialist availability, equipment, reviews, and insurance coverage.",
    accentVar: "--vital-info",
    component: (
      <div className="h-[300px] w-full scale-90 mask-[linear-gradient(to_top,transparent_10%,#000_50%)]">
        <HospitalCard />
      </div>
    ),
  },
  {
    icon: PillIcon,
    title: "Medication Management",
    description:
      "Track medications, receive dosage reminders, and get low-supply alerts. We'll suggest the nearest pharmacy with your prescriptions in stock.",
    accentVar: "--vital-critical",
    component: null,
  },
];

const Features = () => {
  const [active, setActive] = useState(0);

  // auto-advance
  useEffect(() => {
    const id = setInterval(() => setActive((c) => (c + 1) % features.length), 6000);
    return () => clearInterval(id);
  }, []);

  const feat = features[active];
  const Icon = feat.icon;
  const accent = `hsl(var(${feat.accentVar}))`;
  const accentSoft = `hsl(var(${feat.accentVar}) / 0.1)`;

  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-28">
      {/* Section header */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
            Platform features
          </p>
          <h2 className="mb-4 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Built for every role
            <br />
            in healthcare.
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            From front desk to bedside — tools that actually fit the way clinical
            teams work.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[380px_1fr] xl:gap-14">
          {/* Feature list */}
          <div className="flex flex-col gap-1">
            {features.map((f, idx) => {
              const FIcon = f.icon;
              const isActive = idx === active;
              const fAccent = `hsl(var(${f.accentVar}))`;
              return (
                <button
                  key={idx}
                  onClick={() => setActive(idx)}
                  aria-pressed={isActive}
                  className={`group flex items-start gap-4 rounded-xl px-4 py-4 text-left transition-all duration-200 ${
                    isActive ? "bg-muted shadow-xs" : "hover:bg-muted/60"
                  }`}
                >
                  <div
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all"
                    style={{
                      backgroundColor: isActive
                        ? `hsl(var(${f.accentVar}) / 0.12)`
                        : "transparent",
                    }}
                  >
                    <FIcon
                      className={`h-[18px] w-[18px] transition-colors ${
                        isActive ? "" : "text-muted-foreground"
                      }`}
                      style={isActive ? { color: fAccent } : undefined}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`mb-0.5 text-sm font-semibold transition-colors ${
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {f.title}
                    </p>
                    <AnimatePresence>
                      {isActive && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden text-sm leading-relaxed text-muted-foreground"
                        >
                          {f.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  {isActive && (
                    <ArrowRight
                      className="mt-1 h-4 w-4 shrink-0"
                      style={{ color: fAccent }}
                    />
                  )}
                </button>
              );
            })}

            {/* Progress dots */}
            <div className="flex items-center gap-1.5 px-4 pt-2">
              {features.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActive(idx)}
                  aria-label={`Show feature ${idx + 1}`}
                  className="transition-all duration-300"
                  style={{
                    width: idx === active ? 20 : 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor:
                      idx === active ? accent : "hsl(var(--border))",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Visual panel */}
          <div className="sticky top-20 hidden lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="relative flex aspect-4/3 flex-col items-center justify-center overflow-hidden rounded-2xl border border-border p-10"
                style={{ backgroundColor: accentSoft }}
              >
                {/* ECG chart paper behind the panel content */}
                <div
                  className="clinical-grid absolute inset-0 opacity-50"
                  aria-hidden
                />
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `radial-gradient(circle at 70% 70%, ${accent}, transparent 60%)`,
                  }}
                  aria-hidden
                />

                {feat.component ? (
                  <div className="relative z-10 flex h-full w-full items-center justify-center">
                    {feat.component}
                  </div>
                ) : (
                  <div className="relative z-10 flex flex-col items-center gap-5 text-center">
                    <div
                      className="flex h-20 w-20 items-center justify-center rounded-2xl shadow-xs"
                      style={{ backgroundColor: accent }}
                    >
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <p className="mb-2 font-display text-2xl font-semibold text-foreground">
                        {feat.title}
                      </p>
                      <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
