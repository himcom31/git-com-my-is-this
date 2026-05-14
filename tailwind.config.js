/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg:       "#0a0a0f",
        bg2:      "#111118",
        bg3:      "#16161f",
        accent:   "#6C63FF",
        accent2:  "#00D4AA",
        accent3:  "#FF6B6B",
        text1:    "#f0f0f8",
        text2:    "#9898b0",
        text3:    "#5a5a72",
      },
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        body:    ["'DM Sans'", "sans-serif"],
      },
      backgroundImage: {
        grad1: "linear-gradient(135deg, #6C63FF, #00D4AA)",
        grad2: "linear-gradient(135deg, #6C63FF 0%, #FF6B6B 100%)",
      },
      animation: {
        pulse2: "pulse2 8s ease-in-out infinite",
        float:  "float 6s ease-in-out infinite",
        blink:  "blink 2s ease-in-out infinite",
        load:   "load 1.8s ease forwards",
      },
      keyframes: {
        pulse2: {
          "0%,100%": { transform: "scale(1)", opacity: "0.6" },
          "50%":     { transform: "scale(1.1)", opacity: "1" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%":     { transform: "translateY(-12px)" },
        },
        blink: {
          "0%,100%": { opacity: "1" },
          "50%":     { opacity: "0.3" },
        },
        load: {
          from: { width: "0%" },
          to:   { width: "100%" },
        },
      },
    },
  },
  plugins: [],
};
