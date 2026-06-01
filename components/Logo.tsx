import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
  className?: string;
};

const Logo = ({ className }: Props) => {
  return (
    <Link href={"/."}  className={cn("flex items-center gap-2 select-none", className)}>
      {/* Icon mark */}
      <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center flex-shrink-0">
        <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
          <path d="M10 2L4 7v9h4v-5h4v5h4V7L10 2z" fill="white" fillOpacity="0.9" />
          <path d="M7 12h6" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
      {/* Wordmark */}
      <span
        className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white"
        style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
      >
        Vital<span className="text-emerald-600">Sync</span>
      </span>
    </Link>
  );
};

export default Logo;
