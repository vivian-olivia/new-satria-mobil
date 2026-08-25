import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { faqs } from "@/lib/data/faqs";

export function FaqSection() {
  return (
    <section className="texture-grain relative overflow-hidden bg-ink py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-center font-display text-2xl font-extrabold text-white sm:text-3xl">
          Pertanyaan yang Sering Diajukan
        </h2>

        <div className="mt-8 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-md transition-colors duration-300 open:bg-white/[0.09] sm:p-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-display text-sm font-bold text-white sm:text-base">
                {faq.question}
                <CaretDown
                  size={16}
                  weight="bold"
                  className="shrink-0 text-white/50 transition-transform group-open:rotate-180"
                />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
