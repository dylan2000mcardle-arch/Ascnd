"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { scrollState } from "@/hooks/useScrollProgress";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", (e: { progress: number; velocity: number; scroll: number }) => {
      scrollState.progress = e.progress;
      scrollState.velocity = e.velocity;
      scrollState.y = e.scroll;
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}
