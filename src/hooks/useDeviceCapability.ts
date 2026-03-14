"use client";

import { useState, useEffect } from "react";
import type { DeviceCapability, GPUTier } from "@/types";

export function useDeviceCapability(): DeviceCapability {
  const [capability, setCapability] = useState<DeviceCapability>({
    isMobile: false,
    gpuTier: 2,
  });

  useEffect(() => {
    const isMobile =
      window.innerWidth < 768 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    import("detect-gpu").then(({ getGPUTier }) => {
      getGPUTier().then((result) => {
        setCapability({
          isMobile,
          gpuTier: Math.min(result.tier, 3) as GPUTier,
        });
      });
    });
  }, []);

  return capability;
}
