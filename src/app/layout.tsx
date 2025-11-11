import { Source_Sans_3 } from 'next/font/google';
import "./globals.css";
import { Providers } from "./providers";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

// const openSans = Open_Sans({
//   variable: "--font-open-sans",
//   subsets: ["latin"],
//   weight: ["300", "400", "600", "700"],
// });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${sourceSans.variable} `}>
        <Providers> {children}</Providers>

      </body>
    </html>
  );
}
