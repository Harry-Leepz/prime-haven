import { Inter } from "next/font/google";

import AuthProvider from "@/components/auth/AuthProvider";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./globals.css";

import { MessageProvider } from "@/context/MessageContext";

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
      <MessageProvider>
        <html lang='en' className={inter.className}>
          <body>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </MessageProvider>
    </AuthProvider>
  );
}
