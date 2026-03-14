"use client";

import { motion } from "framer-motion";
import GlassmorphismCard from "./GlassmorphismCard";
import RankTag from "./RankTag";
import type { Review } from "@/types";

interface ReviewCardProps {
  review: Review;
  index: number;
}

export default function ReviewCard({ review, index }: ReviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <GlassmorphismCard className="h-full">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan/10 font-mono text-xs text-cyan">
              {review.author.charAt(0)}
            </div>
            <span className="font-mono text-xs text-foreground/60">
              @{review.author}
            </span>
          </div>
          <RankTag rank={review.rank} />
        </div>

        <p className="mb-3 text-sm leading-relaxed text-foreground/80">
          &ldquo;{review.text}&rdquo;
        </p>

        <div className="flex items-center justify-between border-t border-glass-border pt-3">
          <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-dim">
            Day {review.days}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-cyan">
            {review.metric}
          </span>
        </div>
      </GlassmorphismCard>
    </motion.div>
  );
}
