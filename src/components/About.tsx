"use client";

import { TextReveal } from "./effects/TextReveal";
import { Marquee } from "./effects/Marquee";

export function About() {
  return (
    <section id="about" className="py-16 md:py-24 px-6 md:px-12 bg-foreground text-background">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-sm font-mono uppercase tracking-widest opacity-50 mb-8">
            01 / About
          </h2>
          <div className="text-3xl sm:text-4xl md:text-5xl font-xanh leading-tight">
            <TextReveal once={false}>
              I specialize in the intersection of design and engineering.
            </TextReveal>
          </div>
        </div>
        <div className="space-y-6 text-base sm:text-lg md:text-xl opacity-80 leading-relaxed">
          <p>
            With over 6 years of experience in the digital space, I've helped
            startups and global brands build products that are not only
            functional but also memorable.
          </p>
          <p>
            My approach is rooted in minimalism, performance, and a deep
            understanding of user psychology. I believe that every pixel should
            have a purpose.
          </p>
        </div>
      </div>

      <div className="mt-16 md:mt-24 -mx-6 md:-mx-12">
        <Marquee speed={100} className="border-background/20 text-3xl sm:text-4xl md:text-7xl font-xanh uppercase">
          Design Engineering • Creative Coding • Performance Optimization • WebGL • Next.js • GSAP • 
        </Marquee>
      </div>
    </section>
  );
}
