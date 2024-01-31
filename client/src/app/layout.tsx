import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer/page";
import Header from "@/components/header/page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const metadata: Metadata = {
  title: "نکس جی اس | وبلاگ",
  description: "اولین صفحه سایت وبلاگی است",
  keywords: "وبلاگی , نکس جی اس",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="rtl">
      <body>
        <Header />
        <div className="mx-auto max-w-7xl">{children}</div>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
