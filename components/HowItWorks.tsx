"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  Video,
  FileText,
  Users,
  BarChart2,
  Activity,
  Clock,
  Stethoscope,
  FileX,
} from "lucide-react";

type UserType = "Patient" | "Hospital" | "Doctor";

const steps: Record<UserType, { title: string; description: string; icon: React.ElementType; num: number }[]> = {
  Patient: [
    { title: "Find & Book", description: "Search doctors by specialty, location, and availability. Confirm in seconds.", icon: Calendar, num: 1 },
    { title: "Consult", description: "Visit in person or join a secure video consultation — your choice.", icon: Video, num: 2 },
    { title: "Manage Records", description: "All prescriptions, labs, and history in one private, accessible dashboard.", icon: FileText, num: 3 },
  ],
  Hospital: [
    { title: "Patient Management", description: "Optimise OPD queues, bed allocation, and emergency case routing.", icon: Users, num: 1 },
    { title: "Streamlined Ops", description: "Automate appointments, billing, and inventory in one unified system.", icon: Activity, num: 2 },
    { title: "Live Analytics", description: "Monitor department performance with real-time dashboards and reports.", icon: BarChart2, num: 3 },
  ],
  Doctor: [
    { title: "Smart Scheduling", description: "Set your availability, manage appointments, and cut patient wait time.", icon: Clock, num: 1 },
    { title: "Consultations", description: "In-person or telehealth via encrypted video — fully integrated.", icon: Stethoscope, num: 2 },
    { title: "Digital Prescriptions", description: "Generate, sign, and share prescriptions while accessing full patient history.", icon: FileX, num: 3 },
  ],
};

const userTypes: UserType[] = ["Patient", "Hospital", "Doctor"];

// Each role gets one of the clinical scale hues, resolved from the theme so
// both light and dark modes stay in step.
const accentVars: Record<UserType, string> = {
  Patient: "var(--primary)",
  Hospital: "var(--vital-low)",
  Doctor: "var(--vital-info)",
};

const HowItWorks: React.FC = () => {
  const [userType, setUserType] = useState<UserType>("Patient");
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.15 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  const accent = `hsl(${accentVars[userType]})`;
  const accentSoft = `hsl(${accentVars[userType]} / 0.12)`;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-y border-border bg-muted/40 py-20 md:py-28"
    >
      <div
        className="clinical-grid pointer-events-none absolute inset-0 opacity-40 dark:opacity-25"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
            Care pathway
          </p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Three steps, start to discharge.
          </h2>
        </div>

        {/* Role tabs */}
        <div className="mb-12 flex justify-center">
          <div
            className="inline-flex gap-1 rounded-xl border border-border bg-card p-1"
            role="tablist"
            aria-label="Select a role"
          >
            {userTypes.map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={userType === t}
                onClick={() => setUserType(t)}
                className={`relative rounded-lg px-5 py-2 text-sm font-medium transition-all duration-200 ${
                  userType === t
                    ? "text-white shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={userType === t ? { backgroundColor: accent } : {}}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={userType}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="relative grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {/* Pathway line joining the three stages */}
            <div
              className="pointer-events-none absolute inset-x-[16%] top-[3.25rem] hidden h-px md:block"
              style={{
                backgroundImage: `linear-gradient(to right, transparent, ${accent}, transparent)`,
                opacity: 0.4,
              }}
              aria-hidden
            />

            {steps[userType].map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="clinical-card p-6 transition-shadow hover:shadow-md"
                >
                  <div className="mb-5 flex items-start justify-between">
                    <span
                      className="vitals-num flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: accent }}
                    >
                      {step.num}
                    </span>
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: accentSoft }}
                    >
                      <Icon className="h-5 w-5" style={{ color: accent }} />
                    </div>
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HowItWorks;
