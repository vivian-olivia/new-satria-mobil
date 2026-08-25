import type { ReactNode } from "react";

export function PageHero({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="texture-grain relative overflow-hidden bg-ink py-16 text-white sm:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h1 className="font-display text-3xl font-extrabold leading-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-white/65">{description}</p>
        {children && <div className="mt-8 flex justify-center">{children}</div>}
      </div>
    </section>
  );
}
