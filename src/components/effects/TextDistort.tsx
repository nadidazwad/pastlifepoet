"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface TextDistortProps {
  children: string;
  className?: string;
}

export function TextDistort({ children, className }: TextDistortProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Disable distortion on touch devices for performance
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    gsap.to(textRef.current, {
      scrollTrigger: {
        trigger: textRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
      skewX: (i, target) => {
        const velocity = ScrollTrigger.create({}).getVelocity();
        return gsap.utils.clamp(-20, 20, velocity / 100);
      },
      scaleY: () => {
        const velocity = ScrollTrigger.create({}).getVelocity();
        return 1 + Math.abs(velocity / 5000);
      },
      ease: "none",
    });
  }, []);

  return (
    <div
      ref={textRef}
      className={cn("inline-block transition-transform duration-75", className)}
    >
      {children}
    </div>
  );
}
