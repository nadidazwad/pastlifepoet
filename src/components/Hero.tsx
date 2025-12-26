"use client";

import { TextReveal } from "./effects/TextReveal";
import { TextDistort } from "./effects/TextDistort";
import { MagneticButton } from "./ui/MagneticButton";
import { ArrowDownRight, Github } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLenis } from "lenis/react";

export function Hero() {
  const lenis = useLenis();

  return (
    <section id="home" className="relative flex min-h-screen flex-col justify-center px-6 pt-16 md:px-12 md:pt-20">
      <div className="max-w-5xl">
        <h2 className="mb-4 text-sm font-mono uppercase tracking-widest text-muted">
          {siteConfig.title.split('|')[1]?.trim() || "Creative Technologist"}
        </h2>
        <h1 className="text-4xl sm:text-5xl md:text-9xl lg:text-[12rem] font-xanh leading-[0.9] uppercase">
          <TextReveal>PASTLIFE</TextReveal>
          <div className="flex items-center gap-4">
            <TextReveal>POET</TextReveal>
            <div className="h-[2px] flex-1 bg-foreground mt-4 hidden md:block" />
          </div>
        </h1>
      </div>

      <div className="mt-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <p className="max-w-md text-base sm:text-lg md:text-xl leading-relaxed">
          {siteConfig.description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <MagneticButton 
            className="group"
            onClick={() => lenis?.scrollTo("#work", { offset: -80 })}
          >
            View Projects
            <ArrowDownRight className="ml-2 h-4 w-4 transition-transform group-hover:rotate-45" />
          </MagneticButton>

          <a 
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-4 text-xs font-mono uppercase tracking-widest border border-border rounded-full hover:bg-foreground hover:text-background transition-all duration-300"
          >
            <Github className="w-4 h-4" />
            Star on GitHub
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 md:bottom-12 left-6 right-6 flex justify-between text-xs font-mono uppercase tracking-widest text-muted/70 md:left-12 md:right-12">
        <span>Based in {siteConfig.location}</span>
        <span className="hidden sm:inline">Scroll to Explore</span>
        <span className="sm:hidden">↓</span>
      </div>
    </section>
  );
}
