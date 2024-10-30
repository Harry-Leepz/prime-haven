import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Prime Haven",
  description: "Find the perfect rental property with Prime Haven.",
  keywords: "rental, property, management, real estate, lettings",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <main>
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
