"use client";

import { experience } from "@/data/portfolio";
import { TextReveal } from "./effects/TextReveal";
import { MagneticButton } from "./ui/MagneticButton";
import { FileText, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function Experience() {
  return (
    <section id="journey" className="py-16 md:py-32 px-6 md:px-12 border-b border-border">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        {/* Left Side: Heading & CTA */}
        <div className="lg:col-span-4 space-y-12">
          <div>
            <h2 className="text-sm font-mono uppercase tracking-widest text-muted mb-4">
              04 / Journey
            </h2>
            <h3 className="text-4xl sm:text-5xl md:text-7xl font-xanh leading-none">
              PROFESSIONAL <br /> HISTORY
            </h3>
          </div>

          <p className="text-base sm:text-lg text-muted leading-relaxed max-w-sm">
            A timeline of my contributions to the industry, from founding startups 
            to architecting systems for global enterprises. Each role has been a 
            chapter in mastering the craft of digital engineering.
          </p>

          <div className="pt-4">
            <MagneticButton className="text-xs py-3 px-6">
              <FileText className="mr-2 h-3 w-3" />
              Download Resume
            </MagneticButton>
          </div>
        </div>

        {/* Right Side: Experience Timeline */}
        <div className="lg:col-span-8 space-y-16 md:space-y-20">
          {experience.map((exp, index) => (
            <Link 
              key={index} 
              href={`/journey/${exp.slug}`}
              className="group block relative"
            >
              {/* Timeline Marker */}
              <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-border group-hover:bg-foreground/40 transition-all duration-500 hidden lg:block" />
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <h4 className="text-3xl sm:text-4xl md:text-5xl font-xanh group-hover:italic transition-all duration-500">
                      {exp.company}
                    </h4>
                    <ArrowUpRight className="h-6 w-6 text-muted opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
                  </div>
                  <p className="text-sm font-mono uppercase tracking-widest text-muted/40 group-hover:text-foreground transition-colors">
                    {exp.role}
                  </p>
                </div>
                <span className="text-sm font-mono text-muted/40 tabular-nums group-hover:text-foreground transition-colors">
                  {exp.period}
                </span>
              </div>

              <p className="text-lg sm:text-xl text-muted/80 leading-relaxed max-w-3xl group-hover:text-foreground transition-colors duration-500">
                {exp.description}
              </p>

              {/* Decorative line for mobile/tablet */}
              <div className="h-[1px] w-full bg-border mt-12 lg:hidden group-hover:bg-foreground/20 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

