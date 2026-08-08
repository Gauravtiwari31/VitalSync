"use client";
import React from "react";
import Logo from "./Logo";
import { BsLinkedin, BsGithub, BsInstagram } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import GoogleTranslate from "./GoogleTranslate";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-900 dark:bg-[#050b14] text-slate-300 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            {/* Logo on dark background — override */}
            <Link href={"/."}  className="flex items-center gap-2 select-none mb-4">
              <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                  <path d="M10 2L4 7v9h4v-5h4v5h4V7L10 2z" fill="white" fillOpacity="0.9" />
                </svg>
              </div>
              <span
                className="text-lg font-semibold text-white"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
              >
                Vital<span className="text-emerald-400">Sync</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Connecting hospitals, doctors, and patients through intelligent healthcare coordination.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
              Platform
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/discuss", label: "Feedback" },
                { href: "/pricing", label: "Pricing" },
                { href: "/about-us", label: "About Us" },
                { href: "/assistantBhura", label: "HealthBuddy AI" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-slate-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
              Contact
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <FiPhoneCall className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                +91-9580561706
              </li>
              <li className="flex items-center gap-2">
                <MdEmail className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                gauravt9431@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <FaRegClock className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                24 / 7 Available
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
              Language
            </h3>
            <GoogleTranslate />
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Gaurav Tiwari · VitalSync. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-slate-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
            <div className="flex items-center gap-3">
              <a href="https://www.linkedin.com/in/gaurav-tiwari-66012831b/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                <BsLinkedin className="h-4 w-4" />
              </a>
              <a href="https://github.com/Gauravtiwari31" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                <BsGithub className="h-4 w-4" />
              </a>
              <a href="https://www.instagram.com/gau.ravtiwari01" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                <BsInstagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
