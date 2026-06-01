"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
const accentColors: Record<UserType, string> = {
  Patient: "#2BB57C",
  Hospital: "#0284c7",
  Doctor: "#7c3aed",
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

  const accent = accentColors[userType];

  return (
    <section ref={ref} className="py-20 md:py-28 bg-slate-50 dark:bg-slate-900/40">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-3">
            How it works
          </p>
          <h2
            className="text-4xl md:text-5xl font-normal text-slate-900 dark:text-white"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Three steps to better care.
          </h2>
        </div>

        {/* Role tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-1 gap-1">
            {userTypes.map((t) => (
              <button
                key={t}
                onClick={() => setUserType(t)}
                className={`relative px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  userType === t
                    ? "text-white shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
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
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {steps[userType].map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-5">
                    <span
                      className="text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center text-white flex-shrink-0"
                      style={{ backgroundColor: accent }}
                    >
                      {step.num}
                    </span>
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${accent}18` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: accent }} />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
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
