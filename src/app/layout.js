import { Inter } from "next/font/google";

import AuthProvider from "@/components/auth/AuthProvider";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Prime Haven",
  description: "Find the perfect rental property with Prime Haven.",
  keywords: "rental, property, management, real estate, lettings",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang='en' className={inter.className}>
        <body>
          <main>
            <Navbar />
            {children}
            <Footer />
          </main>
        </body>
      </html>
    </AuthProvider>
  );
}
