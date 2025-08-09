import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#A805F2",
        "secondary": "#999",
        "tetiary": "#333",
        "dark": "#151518",
        'radial-gradient': 'radial-gradient(rgba(85, 43, 38, 0.40) 0%, rgba(68, 32, 32, 0.40) 27.69%, rgba(51, 26, 35, 0.40) 54.27%, rgba(17, 14, 19, 0.40) 100%, #211F22)',
      },
      boxShadow: {
        "input-active" : "0px 0px 12px 0px #633CFF40"
      },
      animation: {
        "spin-slow": "wiggle 0.7s linear finite",
        rotate: "rotate 5s linear infinite",

      },
      keyframes: {
        wiggle: {
          "0%": {
            transform: "rotate(-35deg)",
          },
          "100%": {
            transform: "rotate(5deg)",
          },
        },
        rotate: {
          "0%": { transform: "rotate(0deg) scale(10)" },
          "100%": { transform: "rotate(-360deg) scale(10)" },
        },
      }
    },
  },
  plugins: [],
};

export default config;
