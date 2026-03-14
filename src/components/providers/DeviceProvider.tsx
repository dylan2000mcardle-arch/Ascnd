"use client";

import { createContext, useContext } from "react";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";
import type { DeviceCapability } from "@/types";

const DeviceContext = createContext<DeviceCapability>({
  isMobile: false,
  gpuTier: 2,
});

export const useDevice = () => useContext(DeviceContext);

export default function DeviceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const capability = useDeviceCapability();

  return (
    <DeviceContext.Provider value={capability}>{children}</DeviceContext.Provider>
  );
}
