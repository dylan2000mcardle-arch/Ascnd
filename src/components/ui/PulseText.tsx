"use client";

import { motion, AnimatePresence } from "framer-motion";

interface PulseTextProps {
  text: string;
  visible: boolean;
}

export default function PulseText({ text, visible }: PulseTextProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.p
            className="text-glow-cyan font-mono text-lg uppercase tracking-[0.3em] text-cyan md:text-2xl"
            animate={{
              textShadow: [
                "0 0 10px rgba(0,243,255,0.4), 0 0 30px rgba(0,243,255,0.2)",
                "0 0 20px rgba(0,243,255,0.8), 0 0 60px rgba(0,243,255,0.4)",
                "0 0 10px rgba(0,243,255,0.4), 0 0 30px rgba(0,243,255,0.2)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {text}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
