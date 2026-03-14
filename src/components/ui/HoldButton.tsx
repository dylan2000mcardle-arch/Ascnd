"use client";

import { motion } from "framer-motion";
import { useHoldInteraction } from "@/hooks/useHoldInteraction";

interface HoldButtonProps {
  label: string;
  onActivate: () => void;
  className?: string;
}

export default function HoldButton({
  label,
  onActivate,
  className = "",
}: HoldButtonProps) {
  const { progress, isHolding, handlers } = useHoldInteraction({ onActivate });

  return (
    <motion.button
      className={`relative overflow-hidden rounded-xl border border-cyan/20 bg-cyan/5 px-8 py-4 font-mono text-sm uppercase tracking-[0.2em] text-cyan transition-colors select-none ${className}`}
      whileHover={{ borderColor: "rgba(0, 243, 255, 0.4)" }}
      {...handlers}
      aria-label={`Hold to ${label.toLowerCase()}`}
    >
      {/* Radial progress fill */}
      <motion.div
        className="absolute inset-0 bg-cyan/10"
        style={{ scaleX: progress, transformOrigin: "left" }}
      />

      {/* Glow ring on hold */}
      {isHolding && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          initial={{ boxShadow: "0 0 0px rgba(0, 243, 255, 0)" }}
          animate={{
            boxShadow: `0 0 ${30 * progress}px rgba(0, 243, 255, ${0.3 * progress})`,
          }}
        />
      )}

      <span className="relative z-10">{label}</span>

      {/* Progress indicator */}
      <svg
        className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5"
        viewBox="0 0 24 24"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke="rgba(0, 243, 255, 0.2)"
          strokeWidth="2"
        />
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke="rgba(0, 243, 255, 0.8)"
          strokeWidth="2"
          strokeDasharray={`${progress * 62.83} 62.83`}
          strokeLinecap="round"
          transform="rotate(-90 12 12)"
        />
      </svg>
    </motion.button>
  );
}
