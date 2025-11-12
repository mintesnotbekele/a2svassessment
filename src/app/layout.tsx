import { Source_Sans_3 } from 'next/font/google';
import "./globals.css";
import { Providers } from "./providers";
import { ReactNode } from 'react';

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});


interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${sourceSans.variable} `}>
        <Providers> {children}</Providers>

      </body>
    </html>
  );
}
