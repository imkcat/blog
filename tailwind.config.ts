import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "media",
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-comic)", "Comic Neue", "system-ui", "sans-serif"],
        manga: ["var(--font-bangers)", "Bangers", "cursive"],
        comic: ["var(--font-comic)", "Comic Neue", "cursive"],
      },
      borderWidth: {
        "3": "3px",
        "4": "4px",
      },
      boxShadow: {
        "manga": "4px 4px 0 currentColor",
        "manga-lg": "6px 6px 0 currentColor",
        "manga-xl": "8px 8px 0 currentColor",
      },
      animation: {
        "manga-shake": "manga-shake 0.3s ease-in-out",
        "manga-bounce": "manga-bounce 0.5s ease-in-out",
        "manga-pop": "manga-pop 0.2s ease-in-out",
      },
      keyframes: {
        "manga-shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-2px) rotate(-1deg)" },
          "75%": { transform: "translateX(2px) rotate(1deg)" },
        },
        "manga-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "manga-pop": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [typography],
};
export default config;
