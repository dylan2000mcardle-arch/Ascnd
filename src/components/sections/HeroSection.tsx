"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      {/* Text overlay */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.4em] text-cyan/70">
            Optimized Recovery Protocol
          </p>
          <h1 className="mb-6 font-mono text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl lg:text-8xl">
            <span className="text-glow-cyan">ASCND</span>
          </h1>
          <p className="mx-auto max-w-xl font-sans text-base leading-relaxed text-foreground/60 md:text-lg">
            Clinical-grade recovery systems engineered for structural
            optimization. REM enhancement. Maxillofacial bio-hacking.
          </p>
        </motion.div>

        <motion.div
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.button
            className="rounded-xl border border-cyan/30 bg-cyan/10 px-8 py-3.5 font-mono text-sm uppercase tracking-[0.2em] text-cyan backdrop-blur-sm"
            whileHover={{
              scale: 1.03,
              borderColor: "rgba(0, 243, 255, 0.6)",
              boxShadow: "0 0 30px rgba(0, 243, 255, 0.2)",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.06 }}
          >
            Begin Protocol
          </motion.button>

          <motion.button
            className="rounded-xl border border-white/10 px-8 py-3.5 font-mono text-sm uppercase tracking-[0.2em] text-foreground/50 backdrop-blur-sm"
            whileHover={{
              scale: 1.03,
              borderColor: "rgba(255, 255, 255, 0.2)",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.06 }}
          >
            View Research
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/30">
              Scroll
            </span>
            <div className="h-8 w-[1px] bg-gradient-to-b from-cyan/40 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
