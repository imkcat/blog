"use client";

import { motion } from "framer-motion";

const CoupletChar = ({ char }: { char: string }) => (
  <div className="relative w-10 h-10 flex items-center justify-center my-1">
    {/* Diamond Background */}
    <div className="absolute inset-0 bg-red-600 rotate-45 rounded-sm shadow-sm border border-red-400" />
    {/* Character */}
    <span className="relative z-10 text-2xl font-serif font-bold text-yellow-100 select-none drop-shadow-md">
      {char}
    </span>
  </div>
);

const Couplet = ({
  text,
  side,
}: {
  text: string[];
  side: "left" | "right";
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
      className={`fixed top-24 ${
        side === "left" ? "left-6" : "right-6"
      } z-40 hidden 2xl:flex flex-col items-center`}
    >
      {/* Hanger */}
      <div className="w-1 h-8 bg-yellow-600 -mb-1 z-0" />

      {/* Main Scroll Body */}
      <div className="relative bg-red-700 px-2 py-4 rounded-full shadow-xl border-2 border-yellow-600 flex flex-col items-center z-10">
        {/* Decorative Top Pattern */}
        <div className="w-8 h-8 mb-2 rounded-full border-2 border-yellow-500/30 flex items-center justify-center">
          <div className="w-4 h-4 bg-yellow-500/20 rounded-full" />
        </div>

        {/* Characters */}
        <div className="flex flex-col space-y-1">
          {text.map((char, index) => (
            <CoupletChar key={index} char={char} />
          ))}
        </div>

        {/* Decorative Bottom Pattern */}
        <div className="w-8 h-8 mt-2 rounded-full border-2 border-yellow-500/30 flex items-center justify-center">
          <div className="w-4 h-4 bg-yellow-500/20 rounded-full" />
        </div>
      </div>

      {/* Tassel */}
      <div className="flex flex-col items-center -mt-2 z-0">
        <div className="w-1 h-4 bg-red-800" />
        <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm" />
        <div className="flex space-x-0.5 -mt-0.5">
          <div className="w-0.5 h-10 bg-red-600/80" />
          <div className="w-0.5 h-12 bg-red-600" />
          <div className="w-0.5 h-10 bg-red-600/80" />
        </div>
      </div>
    </motion.div>
  );
};

export default function Couplets() {
  return (
    <>
      <Couplet side="left" text={["新", "春", "快", "乐"]} />
      <Couplet side="right" text={["万", "事", "如", "意"]} />
    </>
  );
}
