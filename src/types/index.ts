export interface Review {
  id: string;
  author: string;
  rank: "Tier 1" | "Tier 2" | "Elite" | "Ascended";
  text: string;
  metric: string;
  days: number;
}

export type GPUTier = 0 | 1 | 2 | 3;

export interface DeviceCapability {
  isMobile: boolean;
  gpuTier: GPUTier;
}
