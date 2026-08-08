"use client";
import React from "react";
import { motion } from "motion/react";
import { Check, Sparkles, MessageSquare, Heart, Bell, BarChart2, Users, Brain, Video, Activity, AlertTriangle, Users2, Save, Headphones, Zap, FileText, ClipboardList } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const plans = [
  {
    name: "Basic",
    sub: "For Patients",
    price: "₹0",
    billing: "Forever Free",
    yearlyNote: null,
    desc: "Essential tools to start your health journey.",
    features: [
      "HealthBuddy Chat (3/day)",
      "Essential Health Monitoring",
      "Doctor & Medication Reminders",
      "Basic Analytics",
      "Community Support",
    ],
    cta: "Get started free",
    href: "/patient-auth",
    highlight: false,
  },
  {
    name: "Plus",
    sub: "Premium Plan",
    price: "₹299",
    billing: "per month",
    yearlyNote: "₹2,999/year — save 16%",
    desc: "Proactive insights and personalised guidance.",
    features: [
      "Unlimited HealthBuddy Chat",
      "Advanced Health Analytics",
      "Symptom Tracking & Reports",
      "Priority Appointment Booking",
      "Telehealth Video Calls",
      "24 / 7 Support",
    ],
    cta: "Upgrade to Plus",
    href: "/patient-auth",
    highlight: true,
  },
  {
    name: "Pro",
    sub: "Chronic Care",
    price: "Custom",
    billing: "Tailored Pricing",
    yearlyNote: null,
    desc: "Comprehensive chronic condition management.",
    features: [
      "All Plus features",
      "Continuous Remote Monitoring",
      "Instant Health Alerts",
      "Coordinated Care Network",
      "Unlimited Chat History",
    ],
    cta: "Contact Sales",
    href: "/contact-us",
    highlight: false,
  },
];

export default function PricingSection() {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-[#080e1a]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-3">
            Pricing
          </p>
          <h2
            className="text-4xl md:text-5xl font-normal text-slate-900 dark:text-white mb-4"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Simple, honest pricing.
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-md text-lg leading-relaxed">
            Start free. Upgrade when you need more.
          </p>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { y: 16, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
              className={`relative flex flex-col rounded-2xl border transition-shadow hover:shadow-lg ${
                plan.highlight
                  ? "border-emerald-400 dark:border-emerald-600 shadow-md"
                  : "border-slate-200 dark:border-slate-700"
              } bg-white dark:bg-slate-800/60`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-semibold bg-emerald-600 text-white shadow-xs">
                    <Sparkles className="h-3 w-3" />
                    Recommended
                  </span>
                </div>
              )}

              <div className="p-6 border-b border-slate-100 dark:border-slate-700">
                <div className="mb-3">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                    {plan.sub}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                  {plan.desc}
                </p>
                <div>
                  <span
                    className="text-3xl font-bold text-slate-900 dark:text-white"
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-sm text-slate-400 ml-1.5">{plan.billing}</span>
                </div>
                {plan.yearlyNote && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                    {plan.yearlyNote}
                  </p>
                )}
              </div>

              <div className="p-6 flex-1">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link href={plan.href}>
                  <button
                    className={`w-full h-11 rounded-xl text-sm font-semibold transition-colors ${
                      plan.highlight
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 text-white"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
