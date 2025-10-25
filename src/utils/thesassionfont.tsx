import localFont from 'next/font/local';
// Define the font at the top-level scope
const thesassionfont = localFont({
    // src: '../fonts/Fontspring-DEMO-theseasons-bd.otf',
    src: '.fonts/Fontspring-DEMO-theseasons-bdit.otf',
  display: 'swap',
  variable: '--font-thesassion',
  });

  export default thesassionfont;
