"use client";

import { useEffect, useRef, useState } from "react";
import { CaretDown, Check } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils/format";
import { DropdownPanel } from "@/components/ui/DropdownPanel";

interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  values: string[];
  onChange: (values: string[]) => void;
  className?: string;
  allLabel: string;
  countLabel: string;
}

/**
 * Checkbox-list dropdown for filters where more than one value can apply
 * at once (e.g. brand). Same on-brand dropdown chrome as <Select> (see
 * src/components/ui/Select.tsx), but toggles values instead of replacing
 * one, and stays open across clicks so multiple options can be picked in
 * one go.
 */
export function MultiSelect({
  options,
  values,
  onChange,
  className,
  allLabel,
  countLabel,
}: MultiSelectProps) {
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

  function toggle(value: string) {
    onChange(values.includes(value) ? values.filter((v) => v !== value) : [...values, value]);
  }

  const label =
    values.length === 0
      ? allLabel
      : values.length === 1
        ? (options.find((o) => o.value === values[0])?.label ?? values[0])
        : `${values.length} ${countLabel} dipilih`;

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-11 w-full items-center justify-between gap-2 rounded-xl border border-ink/12 bg-white px-3 text-left text-sm font-medium text-ink transition-colors hover:border-ink/25 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
      >
        <span className="truncate">{label}</span>
        <CaretDown
          size={14}
          weight="bold"
          className={cn("shrink-0 text-ink/40 transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <DropdownPanel className="left-0 top-[calc(100%+6px)] max-h-64 w-full min-w-[11rem] overflow-y-auto">
          <ul role="listbox" aria-multiselectable="true">
            {options.map((option) => {
              const active = values.includes(option.value);
              return (
                <li key={option.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => toggle(option.value)}
                    className={cn(
                      "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                      active
                        ? "bg-brand-red-soft font-semibold text-brand-red"
                        : "text-ink/75 hover:bg-paper-dim"
                    )}
                  >
                    {option.label}
                    <span
                      className={cn(
                        "flex h-4 w-4 shrink-0 items-center justify-center rounded border",
                        active ? "border-brand-red bg-brand-red text-white" : "border-ink/20"
                      )}
                    >
                      {active && <Check size={11} weight="bold" />}
                    </span>
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
