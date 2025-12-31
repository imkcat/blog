"use client";

import { festiveConfig } from "@/config/festive";
import dynamic from "next/dynamic";

const Fireworks = dynamic(() => import("./Fireworks"), { ssr: false });

export default function FestiveEffects() {
  const { active } = festiveConfig;

  if (active === "none") return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {active === "new-year" && <Fireworks />}
    </div>
  );
}
