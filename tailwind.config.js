/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/flowbite/**/*.js"
    // './node_modules/flowbite/**/*.js',

  ],
  darkMode: false, 
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
      "custom-gradient":"linear-gradient(356deg, rgb(0 0 0 / 50%) 0%, transparent 70%)",
      'custom-instagram': 'linear-gradient(45deg, rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%)',
    },
    backgroundImageoverlay: {
      "custom-gradient-light":"linear-gradient(356deg, rgb(0 0 0 / 0%) 0%, transparent 70%)",
    },
    


    backgroundSize: {
      full: "100%",
    },
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        Raleway: ["Raleway", "sans-serif"],
        interfont:["Inter",],
        thesassion: ['theseasonsfonts'],
     
      },
      boxShadow: {
        'custom-light': '0px 0px 15px #00000020',
        'custom-dark': '0 4px 8px rgba(0, 0, 0, 0.5)',
      },
      screens: {
        'between-xl-custom': {'min': '1470px', 'max': '1470px'},
        'between-xl-and-16xl': { 'min': '1600px', 'max': '1680px' },
        'between-max1440-and-1440min': { 'min': '1440px', 'max': '1470px' },
        'between-max1280-and-1280min': { 'min': '1280px', 'max': '1366px' },
      },

    },

    // screens: {
    //   'mcbookpro': '1440px', 
    // },



  },
  plugins: [
    require('flowbite/plugin'),
    function ({ addUtilities }) {
      addUtilities({
        '.before-content': {
          position: 'relative',
        },
        '.before-content::before': {
          content: '""', 
          position: 'absolute',
          right: '-1rem', 
          height:'70%',
          width:'1px',
          backgroundColor:'#fff',
          top:'4px',
        },
        '.before-dot:last-child::before': {
          content: 'none',
        },
      }, ['responsive', 'hover']);
    },
  ],
}
