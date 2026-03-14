"use client";

import { motion } from "framer-motion";
import { ANIMATION } from "@/lib/constants";

interface GlassmorphismCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassmorphismCard({
  children,
  className = "",
  hover = true,
}: GlassmorphismCardProps) {
  return (
    <motion.div
      className={`glass rounded-2xl p-6 ${className}`}
      whileHover={
        hover
          ? {
              scale: ANIMATION.hapticScale,
              borderColor: "rgba(0, 243, 255, 0.15)",
            }
          : undefined
      }
      transition={{
        ...ANIMATION.springStiff,
        delay: ANIMATION.hapticDelay,
      }}
    >
      {children}
    </motion.div>
  );
}
