"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [shouldDisable, setShouldDisable] = useState(false);

  useEffect(() => {
    // Disable smooth scroll on touch devices or when reduced motion is preferred
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setShouldDisable(isTouchDevice || prefersReducedMotion);
  }, []);

  // On touch devices or reduced motion, render children without Lenis wrapper
  if (shouldDisable) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
