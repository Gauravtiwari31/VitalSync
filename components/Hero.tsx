import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SymptomSearchBar from "./SymptomsSearchBar";
import { Heart, Activity, Shield } from "lucide-react";

const Hero = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.18,
      },
    },
  };

  const pills = [
    { icon: <Heart className="w-3.5 h-3.5" />, label: "24/7 Care" },
    { icon: <Activity className="w-3.5 h-3.5" />, label: "Real-time Monitoring" },
    { icon: <Shield className="w-3.5 h-3.5" />, label: "Trusted Doctors" },
  ];

  return (
    <div className="relative min-h-[620px] w-full bg-gradient-to-br from-rose-50 via-white to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Coral glow top-left */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-rose-300/25 dark:bg-rose-700/10 blur-3xl" />
        {/* Amber glow top-right */}
        <div className="absolute -top-20 right-0 w-80 h-80 rounded-full bg-amber-200/30 dark:bg-amber-800/10 blur-3xl" />
        {/* Bottom coral glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[50rem] h-[18rem] bg-gradient-to-t from-rose-200/50 to-transparent dark:from-rose-900/20 blur-3xl rounded-t-full dark:opacity-60" />
        {/* Floating particles */}
        {[
          "top-24 left-[15%] w-5 h-5 bg-rose-400/30",
          "top-40 right-[20%] w-3 h-3 bg-amber-400/30",
          "bottom-32 left-[30%] w-4 h-4 bg-orange-400/30",
          "bottom-20 right-[25%] w-3 h-3 bg-rose-500/25",
          "top-60 left-[60%] w-2 h-2 bg-amber-500/35",
        ].map((cls, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full blur-sm ${cls}`}
            animate={{ y: [0, -12, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-start text-center pt-16 sm:pt-24 px-4"
        initial="initial"
        animate="animate"
        variants={staggerChildren}
      >
        <div className="container mx-auto px-4">
          <motion.div className="max-w-3xl mx-auto" variants={staggerChildren}>

            {/* Badge pills */}
            <motion.div className="flex flex-wrap justify-center gap-2 mb-6" variants={fadeInUp}>
              {pills.map((pill, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/50"
                >
                  {pill.icon}
                  {pill.label}
                </span>
              ))}
            </motion.div>

            <motion.h2
              className="text-sm sm:text-base font-semibold text-amber-600 dark:text-amber-400 mb-3 uppercase tracking-widest"
              variants={fadeInUp}
            >
              Seamless Healthcare Management
            </motion.h2>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-800 dark:text-white mb-6 leading-tight drop-shadow-sm"
              variants={fadeInUp}
            >
              Your{" "}
              <span className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
                Health
              </span>
              ,{" "}
              <br className="hidden sm:block" />
              Our{" "}
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                Priority
              </span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg text-slate-500 dark:text-slate-400 mb-10 mx-auto max-w-xl leading-relaxed"
              variants={fadeInUp}
            >
              Bringing hospitals, doctors, and patients together on a single
              platform for better, faster healthcare coordination.
            </motion.p>

            {/* CTA Section */}
            <motion.div
              className="w-full max-w-3xl mx-auto flex flex-col md:flex-row md:items-start justify-center gap-3"
              variants={fadeInUp}
            >
              {/* Mobile CTA */}
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="md:hidden"
              >
                <Link href="/patient-auth">
                  <Button
                    size="lg"
                    className="h-13 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white text-base px-8 py-4 rounded-full shadow-lg shadow-rose-200 dark:shadow-rose-900/30 hover:shadow-xl transition-all duration-300 font-semibold"
                  >
                    Get Started / Login
                  </Button>
                </Link>
              </motion.div>

              {/* Desktop search bar */}
              <div className="hidden md:block w-full max-w-lg">
                <SymptomSearchBar className="" variant="hero" />
                <p className="text-sm text-slate-400 dark:text-slate-500 mt-3 text-left">
                  Search for symptoms, doctors, or health concerns
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
