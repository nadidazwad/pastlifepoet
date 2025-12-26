"use client";

import { skills } from "@/data/portfolio";
import { TextReveal } from "./effects/TextReveal";

export function Skills() {
  return (
    <section id="expertise" className="py-16 md:py-32 px-6 md:px-12 bg-muted/5 border-y border-border">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        {/* Left Side: Context & Heading */}
        <div className="lg:col-span-4 space-y-8">
          <div>
            <h2 className="text-sm font-mono uppercase tracking-widest text-muted mb-4">
              03 / Expertise
            </h2>
            <h3 className="text-4xl sm:text-5xl md:text-7xl font-xanh leading-none">
              TECHNICAL <br /> STACK
            </h3>
          </div>
          
          <p className="text-base sm:text-lg text-muted leading-relaxed max-w-sm">
            A curated selection of technologies and methodologies I've mastered to build 
            resilient, scalable, and visually stunning digital products. 
            My approach combines architectural rigor with creative fluidity.
          </p>

          <div className="hidden lg:block pt-12">
            <div className="h-[1px] w-24 bg-border mb-4" />
            <span className="text-xs font-mono uppercase tracking-widest text-muted/60">
              Updated Q4 2025
            </span>
          </div>
        </div>

        {/* Right Side: Interactive Skill List */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="group flex items-center justify-between py-6 md:py-8 border-b border-border hover:border-foreground transition-colors cursor-default"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-xs font-mono text-muted/40 group-hover:text-foreground transition-opacity">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-2xl sm:text-3xl md:text-4xl font-xanh group-hover:translate-x-2 transition-transform duration-500 ease-out">
                    {skill}
                  </span>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                  <div className="h-1 w-1 rounded-full bg-foreground" />
                  <span className="text-[10px] font-mono uppercase tracking-tighter">
                    Mastery
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 flex flex-wrap gap-4 text-muted/40 text-[10px] font-mono uppercase tracking-widest">
            <span>CI/CD</span>
            <span>•</span>
            <span>Unit Testing</span>
            <span>•</span>
            <span>System Architecture</span>
            <span>•</span>
            <span>Cloud Native</span>
            <span>•</span>
            <span>Accessibility</span>
          </div>
        </div>
      </div>
    </section>
  );
}
