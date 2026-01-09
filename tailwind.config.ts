import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "gov-navy": "#0f172a",
        "gov-crimson": "#7f1d1d",
        "gov-blue": "#1e3a8a",
        "gov-sky": "#0ea5e9",
      },
      boxShadow: {
        soft: "0 10px 25px -15px rgba(15, 23, 42, 0.25)",
      },
    },
  },
  plugins: [],
} satisfies Config;
