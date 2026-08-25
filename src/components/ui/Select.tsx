"use client";

import { useEffect, useRef, useState } from "react";
import { CaretDown, Check } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils/format";
import { DropdownPanel } from "@/components/ui/DropdownPanel";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

/**
 * Custom listbox replacing the native <select> — gives us a consistent,
 * on-brand dropdown panel (instead of the browser's default UI) and keeps
 * it scrollable when the option list runs long (e.g. brands).
 */
export function Select({ options, value, onChange, className, placeholder }: SelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-11 w-full items-center justify-between gap-2 rounded-xl border border-ink/12 bg-white px-3 text-left text-sm font-medium text-ink transition-colors hover:border-ink/25 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
      >
        <span className="truncate">{selected?.label ?? placeholder}</span>
        <CaretDown
          size={14}
          weight="bold"
          className={cn("shrink-0 text-ink/40 transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <DropdownPanel className="left-0 top-[calc(100%+6px)] max-h-64 w-full min-w-[11rem] overflow-y-auto">
          <ul role="listbox">
            {options.map((option) => {
              const active = option.value === value;
              return (
                <li key={option.value || "_all_"}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                      active
                        ? "bg-brand-red-soft font-semibold text-brand-red"
                        : "text-ink/75 hover:bg-paper-dim"
                    )}
                  >
                    {option.label}
                    {active && <Check size={14} weight="bold" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </DropdownPanel>
      )}
    </div>
  );
}
