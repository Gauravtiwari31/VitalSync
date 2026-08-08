import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
  className?: string;
};

const Logo = ({ className }: Props) => {
  return (
    <Link
      href={"/."}
      className={cn("flex items-center gap-2 select-none", className)}
      aria-label="VitalSync home"
    >
      {/* Icon mark: a medical cross with a pulse trace cut through it */}
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary">
        <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]">
          {/* Cross, drawn faintly so the pulse stays the hero */}
          <path
            d="M9.5 4h5v5.5H20v5h-5.5V20h-5v-5.5H4v-5h5.5V4z"
            fill="white"
            fillOpacity="0.28"
          />
          {/* Single-lead pulse */}
          <path
            d="M3 12h3.6l1.7-4.2 2.5 8.4 2-6.2 1.5 2h6.7"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {/* Wordmark */}
      <span className="font-display text-lg font-semibold tracking-tight text-foreground">
        Vital<span className="text-primary">Sync</span>
      </span>
    </Link>
  );
};

export default Logo;
