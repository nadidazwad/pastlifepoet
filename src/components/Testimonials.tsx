"use client";

import { testimonials } from "@/data/portfolio";
import { TextReveal } from "./effects/TextReveal";

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 bg-foreground text-background">
      <h2 className="text-sm font-mono uppercase tracking-widest opacity-50 mb-12 md:mb-16">
        05 / Feedback
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {testimonials.map((t, index) => (
          <div key={index} className="space-y-6 md:space-y-8">
            <p className="text-xl sm:text-2xl md:text-4xl font-xanh leading-tight italic">
              "{t.text}"
            </p>
            <div>
              <p className="text-lg sm:text-xl font-xanh">{t.name}</p>
              <p className="text-xs sm:text-sm font-mono opacity-50 uppercase tracking-widest">
                {t.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
