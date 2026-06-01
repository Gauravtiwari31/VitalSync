"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const features = [
  {
    icon: Bell,
    title: "Smart Notifications",
    description:
      "Receive personalized health alerts based on your appointments, medication schedule, and wellness goals. Our AI-driven system prioritizes what matters most to you.",
    accent: "#2BB57C",
    accentLight: "#d1fae5",
    component: (
      <AnimatedListDemo className="h-[300px] w-full scale-90 border-none transition-all duration-300 [mask-image:linear-gradient(to_top,transparent_10%,#000_50%)]" />
    ),
  },
  {
    icon: QrCode,
    title: "Virtual Queue System",
    description:
      "Skip the physical waiting room. Scan, queue up virtually, and get real-time updates on your position. Arrive just when the doctor is ready.",
    accent: "#0284c7",
    accentLight: "#e0f2fe",
    component: null,
  },
  {
    icon: Bed,
    title: "Smart Bed Allocation",
    description:
      "Our predictive algorithm optimizes bed availability across departments. Reserve your space in advance with real-time visibility on care options.",
    accent: "#059669",
    accentLight: "#ecfdf5",
    component: null,
  },
  {
    icon: ClipboardList,
    title: "Health Timeline",
    description:
      "Visualize your complete medical journey on an interactive timeline. Track conditions, treatments, and recovery with detailed visual analytics.",
    accent: "#d97706",
    accentLight: "#fef3c7",
    component: null,
  },
  {
    icon: Search,
    title: "Care Facility Finder",
    description:
      "Find hospitals and clinics with advanced filtering. Compare specialist availability, equipment, reviews, and insurance coverage.",
    accent: "#dc2626",
    accentLight: "#fee2e2",
    component: (
      <div className="h-[300px] w-full scale-90 [mask-image:linear-gradient(to_top,transparent_10%,#000_50%)]">
        <HospitalCard />
      </div>
    ),
  },
  {
    icon: PillIcon,
    title: "Medication Management",
    description:
      "Track medications, receive dosage reminders, and get low-supply alerts. We'll suggest the nearest pharmacy with your prescriptions in stock.",
    accent: "#7c3aed",
    accentLight: "#ede9fe",
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

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-[#080e1a] relative overflow-hidden">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-3">
            Platform features
          </p>
          <h2
            className="text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white mb-4"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Built for every role
            <br />
            in healthcare.
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl text-lg leading-relaxed">
            From front desk to bedside — tools that actually fit the way clinical teams work.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 xl:gap-14 items-start">
          {/* Feature list */}
          <div className="flex flex-col gap-1">
            {features.map((f, idx) => {
              const FIcon = f.icon;
              const isActive = idx === active;
              return (
                <button
                  key={idx}
                  onClick={() => setActive(idx)}
                  className={`group flex items-start gap-4 px-4 py-4 rounded-xl text-left transition-all duration-200 ${
                    isActive
                      ? "bg-slate-50 dark:bg-slate-800/60 shadow-sm"
                      : "hover:bg-slate-50/60 dark:hover:bg-slate-800/30"
                  }`}
                >
                  <div
                    className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5 transition-all"
                    style={{
                      backgroundColor: isActive ? f.accentLight : "transparent",
                    }}
                  >
                    <FIcon
                      className="h-[18px] w-[18px] transition-colors"
                      style={{ color: isActive ? f.accent : "#94a3b8" }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-semibold mb-0.5 transition-colors ${
                        isActive
                          ? "text-slate-900 dark:text-white"
                          : "text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300"
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
                          className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed overflow-hidden"
                        >
                          {f.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  {isActive && (
                    <ArrowRight className="flex-shrink-0 h-4 w-4 mt-1" style={{ color: f.accent }} />
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
                  className="transition-all duration-300"
                  style={{
                    width: idx === active ? 20 : 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: idx === active ? feat.accent : "#cbd5e1",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Visual panel */}
          <div className="hidden lg:block sticky top-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="relative rounded-2xl overflow-hidden aspect-[4/3] flex flex-col items-center justify-center p-10 border border-slate-200 dark:border-slate-700"
                style={{
                  backgroundColor: feat.accentLight,
                }}
              >
                {/* Background pattern */}
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `radial-gradient(circle at 70% 70%, ${feat.accent}, transparent 60%)`,
                  }}
                />

                {feat.component ? (
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    {feat.component}
                  </div>
                ) : (
                  <div className="relative z-10 flex flex-col items-center text-center gap-5">
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-sm"
                      style={{ backgroundColor: feat.accent }}
                    >
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <p
                        className="text-2xl font-normal mb-2 text-slate-900"
                        style={{ fontFamily: "'DM Serif Display', serif" }}
                      >
                        {feat.title}
                      </p>
                      <p className="text-sm text-slate-600 max-w-xs leading-relaxed">
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
