"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export function MagneticButton({
  children,
  strength = 40,
  className,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const content = contentRef.current;
    if (!button || !content) return;

    // Disable magnetic effect on touch devices
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = button.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      gsap.to(button, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(content, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to([button, content], {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return (
    <button
      ref={buttonRef}
      className={cn(
        "group relative flex items-center justify-center px-8 py-4 border border-foreground rounded-full overflow-hidden transition-colors hover:bg-foreground hover:text-background",
        className
      )}
      {...props}
    >
      <span ref={contentRef} className="relative z-10 block">
        {children}
      </span>
      <div className="absolute inset-0 z-0 bg-foreground scale-y-0 origin-bottom transition-transform duration-500 ease-out group-hover:scale-y-100" />
    </button>
  );
}
