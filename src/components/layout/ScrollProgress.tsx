"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left bg-cyan"
      style={{ scaleX, filter: "drop-shadow(0 0 6px rgba(0,243,255,0.6))" }}
    />
  );
}
