import type { Metadata } from "next";
import { Quicksand} from "next/font/google";
import { Playfair_Display, Inter } from "next/font/google";
import RootProvider from "@/providers/providers";
import localFont from "next/font/local";
import "./globals.css";
import "./responsive.css";
import "swiper/css/bundle";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import 'flowbite';
const playfairDisplay = Playfair_Display({ subsets: ["latin"] });
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const theseasion = localFont({
  src: "./AntipastoProMedium.ttf",
  variable: "--theseasion",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-comfortaa",
});

export const metadata: Metadata = {
  title: "The StayCationer",
  description: "The StayCationer ",
};

export default function RootLayout({ children, session }: any) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css"
        />
      </head>
      <body className={`${theseasion.variable} ${inter.variable} ${quicksand.className}`} >
        <RootProvider session={session}>{children}</RootProvider>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>
      </body>
    </html>
  );
}
