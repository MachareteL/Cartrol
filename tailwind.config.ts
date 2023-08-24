import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bermuda: "#0400C2",
      },
    },
  },
  plugins: [],
} satisfies Config;
