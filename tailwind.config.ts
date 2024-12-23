import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        divided: "#E6ECF3",
        darkDivided: "#96A1AC",
        bgDividedLight: "#F8F9FA",
        darkBg: "#37435380",
        border: "#CFD6DE",
        white: "#FFFFFF",
        accent: "#558FE6",
        accent20: "#558FE633",
        success: "#34C38F",
        warning: "#F1B44C",
        danger: "#F46A6A",
        dark: "#343A40",
        bg: "#F0F4F9",
      },
      fontSize: {
        h1: ["1.8rem", { lineHeight: "2.2rem" }],
        h2: ["1.2rem", { lineHeight: "1.45rem" }],
        h3: ["1rem", { lineHeight: "1.2rem" }],
        h4: ["1rem", { lineHeight: "auto" }],
        baseMedium: ["0.65rem", { lineHeight: "1rem" }],
        baseRegular: ["0.65rem", { lineHeight: "1rem" }],
        caption: ["0.55rem", { lineHeight: "0.85rem" }],
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        semiBold: "600",
        bold: "700",
      },
    },
  },
  plugins: [],
};

export default config;
