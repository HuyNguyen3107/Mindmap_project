import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Provider/Providers";
import "primeicons/primeicons.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { ToastBox } from "@/components/Toast/toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mindmap Flow",
  description: "Mindmap Flow - Công cụ xây dựng sơ đồ tư duy mạnh mẽ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <main>{children}</main>
          <ToastBox />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
