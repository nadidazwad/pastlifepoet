"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  className?: string;
  once?: boolean;
}

export function TextReveal({ children, className, once = true }: TextRevealProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const split = new SplitType(textRef.current, { types: "chars,words" });

    gsap.from(split.chars, {
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 85%",
        toggleActions: once ? "play none none none" : "play none none reverse",
      },
      y: 100,
      opacity: 0,
      rotateX: -90,
      stagger: 0.02,
      duration: 1,
      ease: "power4.out",
    });

    return () => {
      split.revert();
    };
  }, [children, once]);

  return (
    <div ref={textRef} className={cn("overflow-hidden", className)}>
      {children}
    </div>
  );
}
