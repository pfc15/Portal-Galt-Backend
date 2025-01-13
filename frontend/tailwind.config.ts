import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/page/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        main_color: '#2DC5B8',
      },
      fontFamily: {
        'museo': ['Museo W01 700', 'serif'],
      }
    },
  },
  plugins: [],
} satisfies Config;
