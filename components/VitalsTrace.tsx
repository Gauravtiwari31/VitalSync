"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * A repeating PQRST complex — the shape a real single-lead ECG draws.
 * Built once at module scope so every instance shares the same path data.
 *
 * Coordinates are in a 0 0 {BEATS*BEAT_WIDTH} 120 space with the isoelectric
 * line at y = 60. Lower y = taller deflection, so R (the tall spike) is the
 * smallest y value.
 */
const BEAT_WIDTH = 150;
const BASELINE = 60;

function beatPath(offset: number): string {
  const x = (n: number) => offset + n;
  return [
    `H${x(18)}`,
    // P wave — atrial depolarisation, a low rounded bump
    `C${x(24)},${BASELINE - 11} ${x(32)},${BASELINE - 11} ${x(38)},${BASELINE}`,
    `H${x(48)}`,
    // QRS complex — the spike
    `L${x(53)},${BASELINE + 9}`,
    `L${x(60)},${BASELINE - 44}`,
    `L${x(67)},${BASELINE + 20}`,
    `L${x(73)},${BASELINE}`,
    `H${x(92)}`,
    // T wave — ventricular repolarisation, broader and softer than P
    `C${x(102)},${BASELINE - 17} ${x(114)},${BASELINE - 17} ${x(124)},${BASELINE}`,
    `H${x(BEAT_WIDTH)}`,
  ].join(" ");
}

function buildTrace(beats: number): string {
  let d = `M0,${BASELINE}`;
  for (let i = 0; i < beats; i++) d += ` ${beatPath(i * BEAT_WIDTH)}`;
  return d;
}

type VitalsTraceProps = {
  /** Number of PQRST complexes drawn across the full width. */
  beats?: number;
  /** Seconds for the trace to sweep once end to end. */
  duration?: number;
  className?: string;
  /** Renders the ECG graph-paper backdrop behind the trace. */
  showPaper?: boolean;
  strokeWidth?: number;
};

export function VitalsTrace({
  beats = 4,
  duration = 3.5,
  className,
  showPaper = false,
  strokeWidth = 2,
}: VitalsTraceProps) {
  const width = beats * BEAT_WIDTH;
  const d = React.useMemo(() => buildTrace(beats), [beats]);
  const gradientId = React.useId();

  return (
    <div className={cn("relative w-full", className)} aria-hidden="true">
      {showPaper && (
        <div className="ecg-paper absolute inset-0 rounded-lg opacity-70" />
      )}
      <svg
        viewBox={`0 0 ${width} 120`}
        preserveAspectRatio="none"
        className="relative h-full w-full"
        role="presentation"
      >
        <defs>
          {/* Fades the tail so the sweep reads as a moving stylus */}
          <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
            <stop offset="55%" stopColor="currentColor" stopOpacity="0.7" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Static ghost of the full trace, so the line never fully disappears */}
        <path
          d={d}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.16}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Animated sweep */}
        <path
          d={d}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1000}
          strokeDasharray="1000"
          style={{
            // Consumed by the `ecg-trace` keyframes in globals.css
            ["--ecg-length" as string]: "1000",
            animation: `ecg-trace ${duration}s linear infinite`,
          }}
        />
      </svg>
    </div>
  );
}

export default VitalsTrace;
