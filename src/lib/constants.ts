export const COLORS = {
  background: "#010101",
  foreground: "#e0e0e0",
  cyan: "#00f3ff",
  cyanDim: "#00a8b3",
  chrome: "#c0c0c0",
  chromeDark: "#707070",
} as const;

export const COLORS_THREE = {
  cyan: 0x00f3ff,
  cyanDim: 0x00a8b3,
  chrome: 0xc0c0c0,
  chromeDark: 0x707070,
  background: 0x010101,
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

export const ANIMATION = {
  springStiff: { type: "spring" as const, stiffness: 400, damping: 25 },
  springSmooth: { type: "spring" as const, stiffness: 100, damping: 20 },
  hapticDelay: 0.06,
  hapticScale: 1.03,
  blackoutDuration: 2.5,
  holdDuration: 2,
} as const;

export const GPU_TIERS = {
  FALLBACK: 0,
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
} as const;
