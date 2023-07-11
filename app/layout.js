import { Providers } from "@/redux/provider";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Wallet",
  description: "Record your expenses",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
        <body>
          <Navbar />
          {children}
        </body>
      </Providers>
    </html>
  );
}
