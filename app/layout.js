import { Providers } from "@/redux/provider";
import "./globals.css";
import Navbar from "@/components/Navbar";

import { Chela_One } from "next/font/google";
import { Inter } from "next/font/google";

const chela = Chela_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-chela",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Wallet",
  description: "Record your expenses",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${chela.variable} ${inter.variable} font-inter`}>
          <Navbar />
          {children}
        </body>
      </Providers>
    </html>
  );
}
