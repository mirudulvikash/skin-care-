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
        medical: {
          slate: "#0F766E",
          teal: "#14B8A6",
          emerald: "#10B981",
          amber: "#F59E0B",
          crimson: "#EF4444",
          light: "#F8FAFC",
          white: "#FFFFFF",
          border: "#E2E8F0",
        }
      },
    },
  },
  plugins: [],
};
export default config;
