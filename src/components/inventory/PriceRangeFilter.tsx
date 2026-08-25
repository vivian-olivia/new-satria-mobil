"use client";

import { useEffect, useRef, useState } from "react";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { cn, formatIDR } from "@/lib/utils/format";
import { DropdownPanel } from "@/components/ui/DropdownPanel";
import { RangeSlider } from "@/components/ui/RangeSlider";
import { vehicles } from "@/lib/data/vehicles";

const SLIDER_MIN = 0;
const SLIDER_STEP = 5_000_000;
// Rounded up to the nearest 50jt above the highest-priced sample unit, so
// the slider's top handle always covers the full catalog range.
const SLIDER_MAX =
  Math.ceil(Math.max(...vehicles.map((v) => v.price), 100_000_000) / 50_000_000) * 50_000_000;

interface PriceRangeFilterProps {
  min?: number;
  max?: number;
  onApply: (min: number | undefined, max: number | undefined) => void;
  className?: string;
}

export function PriceRangeFilter({ min, max, onApply, className }: PriceRangeFilterProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<[number, number]>([min ?? SLIDER_MIN, max ?? SLIDER_MAX]);
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

  let label = "Semua Budget";
  if (min !== undefined && max !== undefined) {
    label = `${formatIDR(min)} - ${formatIDR(max)}`;
  } else if (min !== undefined) {
    label = `Min ${formatIDR(min)}`;
  } else if (max !== undefined) {
    label = `Maks ${formatIDR(max)}`;
  }

  const [draftLow, draftHigh] = draft;

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => {
          setOpen((v) => {
            if (!v) setDraft([min ?? SLIDER_MIN, max ?? SLIDER_MAX]);
            return !v;
          });
        }}
        aria-haspopup="dialog"
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
        <DropdownPanel className="left-0 top-[calc(100%+6px)] w-80">
          <div className="p-4">
            <p className="text-xs font-semibold text-ink/60">Rentang Harga</p>
            <p className="mt-1 text-sm font-bold text-ink">
              {formatIDR(draftLow)} — {draftHigh >= SLIDER_MAX ? `${formatIDR(draftHigh)}+` : formatIDR(draftHigh)}
            </p>

            <div className="mt-5 px-1.5">
              <RangeSlider
                min={SLIDER_MIN}
                max={SLIDER_MAX}
                step={SLIDER_STEP}
                value={draft}
                onChange={setDraft}
              />
            </div>

            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setDraft([SLIDER_MIN, SLIDER_MAX]);
                  onApply(undefined, undefined);
                  setOpen(false);
                }}
                className="h-9 flex-1 rounded-lg border border-ink/12 text-xs font-semibold text-ink/60 transition-colors hover:border-ink/25"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => {
                  onApply(
                    draftLow > SLIDER_MIN ? draftLow : undefined,
                    draftHigh < SLIDER_MAX ? draftHigh : undefined
                  );
                  setOpen(false);
                }}
                className="h-9 flex-1 rounded-lg bg-brand-red text-xs font-semibold text-white transition-colors hover:bg-brand-red-dark"
              >
                Terapkan
              </button>
            </div>
          </div>
        </DropdownPanel>
      )}
    </div>
  );
}
