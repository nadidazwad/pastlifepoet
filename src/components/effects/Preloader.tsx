"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { siteConfig } from "@/config/site";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1.2,
          ease: "power4.inOut",
          onComplete: onComplete,
        });
      },
    });

    // Counter animation
    const counterObj = { value: 0 };
    tl.to(counterObj, {
      value: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        setCount(Math.floor(counterObj.value));
      },
    });

    // Text reveal
    tl.fromTo(
      textRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=1.5"
    );

    // Liquid-like exit prep
    tl.to(textRef.current, {
      opacity: 0,
      y: -50,
      duration: 0.5,
      ease: "power3.in",
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white"
      style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
    >
      <div className="overflow-hidden">
        <h1
          ref={textRef}
          className="text-4xl md:text-6xl font-xanh tracking-tighter"
        >
          {siteConfig.name}
        </h1>
      </div>
      <div
        ref={counterRef}
        className="mt-4 font-mono text-sm tabular-nums opacity-50"
      >
        {count}%
      </div>
      
      {/* Liquid SVG Filter for potential use in other components */}
      <svg className="hidden">
        <filter id="liquid">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01"
            numOctaves="3"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
        </filter>
      </svg>
    </div>
  );
}
