"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
}

export function Marquee({
  children,
  speed = 50,
  direction = "left",
  className,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    // Skip animation if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const width = content.offsetWidth;
    const duration = width / speed;

    gsap.to(content, {
      x: direction === "left" ? -width / 2 : width / 2,
      duration: duration,
      ease: "none",
      repeat: -1,
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden whitespace-nowrap border-y border-border py-4", className)}
    >
      <div ref={contentRef} className="inline-block will-change-transform">
        <span className="inline-block px-4">{children}</span>
        <span className="inline-block px-4">{children}</span>
        <span className="inline-block px-4">{children}</span>
        <span className="inline-block px-4">{children}</span>
      </div>
    </div>
  );
}
