import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: {
          dark: "#08090D",
          darker: "#050505",
          glass: "rgba(255, 255, 255, 0.03)",
          glassHover: "rgba(255, 255, 255, 0.06)",
          glassBorder: "rgba(255, 255, 255, 0.08)",
          glassBorderHover: "rgba(255, 255, 255, 0.18)",
        },
        rgb: {
          cyan: "#00F2FE",
          purple: "#8A2BE2",
          magenta: "#EC4899",
          crimson: "#FF2A54",
          blue: "#3B82F6",
          emerald: "#10B981",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Inter"',
          "system-ui",
          "sans-serif",
        ],
        mono: [
          '"SF Mono"',
          '"JetBrains Mono"',
          "ui-monospace",
          "monospace",
        ],
      },
      boxShadow: {
        "glass-sm": "0 2px 10px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
        "glass-md": "0 8px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        "glass-lg": "0 20px 50px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
        "glow-cyan": "0 0 30px rgba(0, 242, 254, 0.25)",
        "glow-purple": "0 0 30px rgba(138, 43, 226, 0.25)",
        "glow-crimson": "0 0 30px rgba(255, 42, 84, 0.25)",
        "glow-emerald": "0 0 30px rgba(16, 185, 129, 0.25)",
      },
      animation: {
        "ambient-drift": "drift 22s ease-in-out infinite alternate",
        "pulse-subtle": "pulseSubtle 4s ease-in-out infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
      },
      keyframes: {
        drift: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "50%": { transform: "translate(40px, -25px) scale(1.08)" },
          "100%": { transform: "translate(-30px, 35px) scale(0.95)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "0.85" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
