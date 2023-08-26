import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bermuda: "#0400C2",
        banana: '#FFB800'
      },
      animation: {
        'bounce-slow': 'bounce 1.5s ease-out infinite',
        'bounce-slower': 'bounce 2s ease-out infinite',
      }
    },
  },
  plugins: [],
} satisfies Config;
