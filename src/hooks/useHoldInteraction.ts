"use client";

import { useState, useRef, useCallback } from "react";
import { ANIMATION } from "@/lib/constants";

interface UseHoldInteractionOptions {
  duration?: number;
  onActivate: () => void;
}

export function useHoldInteraction({
  duration = ANIMATION.holdDuration,
  onActivate,
}: UseHoldInteractionOptions) {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const start = useCallback(() => {
    setIsHolding(true);
    startTimeRef.current = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - startTimeRef.current) / 1000;
      const p = Math.min(elapsed / duration, 1);
      setProgress(p);

      if (p >= 1) {
        onActivate();
        setIsHolding(false);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [duration, onActivate]);

  const stop = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setIsHolding(false);
    setProgress(0);
  }, []);

  return {
    progress,
    isHolding,
    handlers: {
      onPointerDown: start,
      onPointerUp: stop,
      onPointerLeave: stop,
    },
  };
}
