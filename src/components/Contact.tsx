"use client";

import { MagneticButton } from "./ui/MagneticButton";
import { TextReveal } from "./effects/TextReveal";
import { siteConfig } from "@/config/site";

export function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 px-6 md:px-12 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-sm font-mono uppercase tracking-widest text-muted mb-8">
          06 / Contact
        </h2>
        <h3 className="text-3xl sm:text-5xl md:text-8xl font-xanh mb-12 leading-none">
          <TextReveal>LET'S CREATE SOMETHING EXTRAORDINARY</TextReveal>
        </h3>
        <div className="flex flex-col items-center justify-center gap-8">
          <MagneticButton className="text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 w-full sm:w-auto">
            {siteConfig.links.email}
          </MagneticButton>
          <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-mono uppercase tracking-widest text-muted">
            <a href={siteConfig.links.linkedin} className="hover:text-foreground transition-colors">LinkedIn</a>
            <a href={siteConfig.links.github} className="hover:text-foreground transition-colors">GitHub</a>
            <a href={siteConfig.links.discord} className="hover:text-foreground transition-colors">Discord</a>
          </div>
        </div>
      </div>
    </section>
  );
}
