"use client";

import { motion } from "framer-motion";

const LanternSVG = () => (
  <svg
    viewBox="0 0 100 140"
    className="w-full h-full drop-shadow-lg"
    style={{ overflow: "visible" }}
  >
    {/* Top String */}
    <line x1="50" y1="0" x2="50" y2="20" stroke="#FCD34D" strokeWidth="2" />

    {/* Lantern Top Cap */}
    <path
      d="M35 20 L65 20 L70 25 L30 25 Z"
      fill="#F59E0B"
      stroke="#B45309"
      strokeWidth="1"
    />

    {/* Lantern Body - Rounder and cuter */}
    <ellipse cx="50" cy="55" rx="35" ry="30" fill="#DC2626" />

    {/* Vertical Ribs for 3D effect */}
    <path
      d="M50 25 Q 65 55 50 85"
      fill="none"
      stroke="#991B1B"
      strokeWidth="1"
      opacity="0.5"
    />
    <path
      d="M50 25 Q 35 55 50 85"
      fill="none"
      stroke="#991B1B"
      strokeWidth="1"
      opacity="0.5"
    />
    <path
      d="M30 35 Q 15 55 30 75"
      fill="none"
      stroke="#991B1B"
      strokeWidth="1"
      opacity="0.3"
    />
    <path
      d="M70 35 Q 85 55 70 75"
      fill="none"
      stroke="#991B1B"
      strokeWidth="1"
      opacity="0.3"
    />

    {/* Lantern Bottom Cap */}
    <path
      d="M35 85 L65 85 L60 90 L40 90 Z"
      fill="#F59E0B"
      stroke="#B45309"
      strokeWidth="1"
    />

    {/* Center Gold Box for Text */}
    <rect
      x="32"
      y="37"
      width="36"
      height="36"
      rx="4"
      fill="#B91C1C"
      stroke="#FCD34D"
      strokeWidth="1.5"
      transform="rotate(45 50 55)"
    />

    {/* Text 'Fu' (Prosperity) */}
    <text
      x="50"
      y="63"
      fontSize="24"
      fontWeight="bold"
      fill="#FCD34D"
      textAnchor="middle"
      fontFamily="serif"
      style={{ filter: "drop-shadow(1px 1px 0px rgba(0,0,0,0.3))" }}
    >
      福
    </text>

    {/* Tassel Knot */}
    <circle cx="50" cy="95" r="4" fill="#DC2626" />

    {/* Tassels */}
    <g className="origin-top animate-swing-gentle">
      <line x1="50" y1="90" x2="50" y2="105" stroke="#DC2626" strokeWidth="2" />
      <path
        d="M50 105 Q 45 120 40 135"
        stroke="#DC2626"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M50 105 Q 55 120 60 135"
        stroke="#DC2626"
        strokeWidth="2"
        fill="none"
      />
      <path d="M50 105 L 50 140" stroke="#DC2626" strokeWidth="2" fill="none" />
    </g>
  </svg>
);

const Lantern = ({
  left,
  right,
  delay,
  scale = 1,
}: {
  left?: string;
  right?: string;
  delay: number;
  scale?: number;
}) => (
  <motion.div
    initial={{ rotate: -3 }}
    animate={{ rotate: 3 }}
    transition={{
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
      delay: delay,
    }}
    className="absolute top-0 z-50 origin-top w-24 h-32 pointer-events-none"
    style={{ left, right, transform: `scale(${scale})` }}
  >
    <LanternSVG />
  </motion.div>
);

export default function Lanterns() {
  return (
    <div className="fixed inset-x-0 top-0 h-48 pointer-events-none z-50 overflow-hidden">
      {/* Left Side */}
      <Lantern left="2%" delay={0} scale={0.8} />
      <Lantern left="8%" delay={1.5} scale={0.6} />

      {/* Right Side */}
      <Lantern right="2%" delay={0.5} scale={0.8} />
      <Lantern right="8%" delay={2} scale={0.6} />
    </div>
  );
}
