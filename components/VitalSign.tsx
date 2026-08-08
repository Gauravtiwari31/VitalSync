"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Clinical status scale, shared by vitals tiles, triage badges, bed state and
 * queue chips so a colour means the same thing everywhere in the product.
 */
export type VitalStatus = "normal" | "low" | "elevated" | "critical" | "info";

const STATUS_STYLES: Record<
  VitalStatus,
  { text: string; bg: string; ring: string; label: string }
> = {
  normal: {
    text: "text-vital-normal",
    bg: "bg-vital-normal/10",
    ring: "ring-vital-normal/25",
    label: "Normal",
  },
  low: {
    text: "text-vital-low",
    bg: "bg-vital-low/10",
    ring: "ring-vital-low/25",
    label: "Low",
  },
  elevated: {
    text: "text-vital-elevated",
    bg: "bg-vital-elevated/10",
    ring: "ring-vital-elevated/25",
    label: "Elevated",
  },
  critical: {
    text: "text-vital-critical",
    bg: "bg-vital-critical/10",
    ring: "ring-vital-critical/25",
    label: "Critical",
  },
  info: {
    text: "text-vital-info",
    bg: "bg-vital-info/10",
    ring: "ring-vital-info/25",
    label: "Info",
  },
};

export function VitalStatusBadge({
  status,
  children,
  className,
  pulse = false,
}: {
  status: VitalStatus;
  children?: React.ReactNode;
  className?: string;
  pulse?: boolean;
}) {
  const s = STATUS_STYLES[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ring-inset",
        s.text,
        s.bg,
        s.ring,
        className
      )}
    >
      <span className={pulse ? "status-dot" : "h-1.5 w-1.5 rounded-full bg-current"} />
      {children ?? s.label}
    </span>
  );
}

type VitalSignProps = {
  /** Short clinical name, e.g. "Heart rate". */
  label: string;
  value: React.ReactNode;
  /** Unit shown de-emphasised beside the reading, e.g. "bpm". */
  unit?: string;
  status?: VitalStatus;
  icon?: React.ComponentType<{ className?: string }>;
  /** Reference range, e.g. "60–100". Shown small, under the reading. */
  range?: string;
  className?: string;
};

/**
 * A single vital-sign readout. Numbers use the display face with tabular
 * figures so a changing reading never shifts the layout.
 */
export function VitalSign({
  label,
  value,
  unit,
  status = "normal",
  icon: Icon,
  range,
  className,
}: VitalSignProps) {
  const s = STATUS_STYLES[status];

  return (
    <div className={cn("clinical-card p-4", className)}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        {Icon ? <Icon className={cn("h-4 w-4 shrink-0", s.text)} /> : null}
      </div>

      <div className="mt-2 flex items-baseline gap-1.5">
        <span className={cn("vitals-num text-3xl font-semibold", s.text)}>
          {value}
        </span>
        {unit ? (
          <span className="text-sm font-medium text-muted-foreground">
            {unit}
          </span>
        ) : null}
      </div>

      {range ? (
        <p className="mt-1 text-xs text-muted-foreground">Ref {range}</p>
      ) : null}
    </div>
  );
}

export default VitalSign;
