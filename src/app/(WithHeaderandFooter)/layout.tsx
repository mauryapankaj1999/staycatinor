
"use client"
import Header from "@/layout/Header/Header";
import Footer from "@/layout/Footer/Footer";
import { Suspense } from "react";
import { usePathname } from "next/navigation";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentRoute= usePathname()
  return (
    <Suspense fallback="Loading ....">
      <Header />
      {children}
      {
        currentRoute ===  '/payment' ? '' : <Footer />
      }
      
    
    
    </Suspense>
  );
}
