"use client";

import { cn } from "@/lib/utils/format";

const THUMB = cn(
  "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4",
  "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full",
  "[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-brand-red [&::-webkit-slider-thumb]:bg-white",
  "[&::-webkit-slider-thumb]:shadow-[0_1px_4px_rgba(11,14,20,0.35)] [&::-webkit-slider-thumb]:cursor-pointer",
  "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4",
  "[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2",
  "[&::-moz-range-thumb]:border-brand-red [&::-moz-range-thumb]:bg-white",
  "[&::-moz-range-thumb]:shadow-[0_1px_4px_rgba(11,14,20,0.35)] [&::-moz-range-thumb]:cursor-pointer",
  "[&::-webkit-slider-runnable-track]:appearance-none [&::-moz-range-track]:appearance-none"
);

interface RangeSliderProps {
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  className?: string;
}

/**
 * Dual-thumb ("bullet") range slider. No range-slider library exists in
 * this project, so it's built the standard way: two native <input
 * type="range"> stacked on the same track, each transparent with
 * pointer-events disabled except on its own thumb (the arbitrary
 * [&::-webkit-slider-thumb] / [&::-moz-range-thumb] variants above), so
 * each handle stays independently draggable without a JS drag handler.
 */
export function RangeSlider({ min, max, step, value, onChange, className }: RangeSliderProps) {
  const [low, high] = value;
  const pctLow = ((low - min) / (max - min)) * 100;
  const pctHigh = ((high - min) / (max - min)) * 100;

  function onLowChange(next: number) {
    onChange([Math.min(next, high - step), high]);
  }

  function onHighChange(next: number) {
    onChange([low, Math.max(next, low + step)]);
  }

  return (
    <div className={cn("relative h-4", className)}>
      <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-ink/10" />
      <div
        className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-brand-red"
        style={{ left: `${pctLow}%`, right: `${100 - pctHigh}%` }}
      />

      <input
        type="range"
        aria-label="Harga minimum"
        min={min}
        max={max}
        step={step}
        value={low}
        onChange={(e) => onLowChange(Number(e.target.value))}
        className={cn(
          "absolute inset-0 h-4 w-full appearance-none bg-transparent pointer-events-none",
          THUMB
        )}
      />
      <input
        type="range"
        aria-label="Harga maksimum"
        min={min}
        max={max}
        step={step}
        value={high}
        onChange={(e) => onHighChange(Number(e.target.value))}
        className={cn(
          "absolute inset-0 h-4 w-full appearance-none bg-transparent pointer-events-none",
          THUMB
        )}
      />
    </div>
  );
}
