import type { ReactNode } from "react";
import { cn } from "@/lib/utils/format";

interface DropdownPanelProps {
  children: ReactNode;
  className?: string;
}

/**
 * Shared floating surface for every custom dropdown/listbox panel on the
 * site — keeps them all on the same on-brand background instead of each
 * dropdown styling its own popup (or falling back to the browser default).
 */
export function DropdownPanel({ children, className }: DropdownPanelProps) {
  return (
    <div
      className={cn(
        "absolute z-30 rounded-xl border border-ink/10 bg-white p-1 shadow-[0_16px_32px_-12px_rgba(11,14,20,0.25)]",
        className
      )}
    >
      {children}
    </div>
  );
}
