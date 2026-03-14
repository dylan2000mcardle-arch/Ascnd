"use client";

import { useRef, useCallback } from "react";

// Shared scroll state — read from R3F useFrame without React re-renders
export const scrollState = {
  progress: 0,
  velocity: 0,
  y: 0,
};

export function useScrollProgress() {
  const ref = useRef<HTMLElement>(null);

  const getSectionProgress = useCallback(() => {
    if (!ref.current) return 0;
    const rect = ref.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionTop = rect.top;
    const sectionHeight = rect.height;

    // 0 when section top enters viewport bottom, 1 when section bottom leaves viewport top
    const progress = (windowHeight - sectionTop) / (windowHeight + sectionHeight);
    return Math.min(Math.max(progress, 0), 1);
  }, []);

  return { ref, getSectionProgress };
}
