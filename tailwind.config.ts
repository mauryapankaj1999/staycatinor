import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/flowbite/**/*.js"
    // './node_modules/flowbite/**/*.js',
  ],
  theme: {
    colors: {
      primarydark: "#202A37",
      primarygray: "#767676",
      white: "#fff",
      primarycolor: "#cf3a22",
      navibule: "#202a37",
    },
    fontSize: {
      text16: "16px",
      text18: "18px",
      headingfont: "40px",
    },

    backgroundImage: {
      // "custom_img": "url('../src/assets/homepage/dot_img.png')",
      "custom-gradient": "linear-gradient(356deg, rgb(0 0 0 / 85%) 0%, transparent 70%)",
    },

    backgroundSize: {
      full: "100%",
    },


    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        Raleway: ["Raleway", "sans-serif"],
      },


    },
  },
  plugins: [require("flowbite/plugin")],
};
export default config;
