import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        'xs': '300px',
        'sm': '400px',
        'md': '500px',
        'lg': '700px',
        'xl': '1023px',
        '2xl': '1600px',
      },
      fontFamily :{ 
        glory: ["roboto","sans-serif"], 
        pop: ["roboto-mono","sans"], 
      },
    },
  },
  plugins: [],
};
export default config;
