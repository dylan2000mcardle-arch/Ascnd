interface RankTagProps {
  rank: "Tier 1" | "Tier 2" | "Elite" | "Ascended";
}

const rankStyles: Record<string, string> = {
  "Tier 1": "bg-chrome-dark/20 text-chrome border-chrome/20",
  "Tier 2": "bg-cyan/5 text-cyan-dim border-cyan-dim/20",
  Elite: "bg-cyan/10 text-cyan border-cyan/30",
  Ascended: "bg-cyan/15 text-cyan border-cyan/40 glow-cyan",
};

export default function RankTag({ rank }: RankTagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${rankStyles[rank] || rankStyles["Tier 1"]}`}
    >
      ASCND {rank}
    </span>
  );
}
