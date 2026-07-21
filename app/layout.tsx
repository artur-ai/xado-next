import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "XADO Кропивницький | Магазин автохімії та олив",
  description:
      "Магазин XADO у Кропивницькому. Оригінальні моторні оливи, трансмісійні мастила, присадки та автохімія за найкращими цінами.",
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <html lang="uk">
      <body className="flex min-h-screen flex-col bg-white text-black">
      <Header/>
      <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 md:px-6">{children}</main>
      <Footer/>
      </body>
      </html>
  );
}