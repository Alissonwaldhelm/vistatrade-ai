import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "VistaTrade AI - Enxerga o mercado antes que ele aconteça",
  description: "Plataforma de trading com IA avançada para análise de mercado e previsão de movimentos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="font-inter antialiased bg-[#0A0A0A] text-white">
        {children}
      </body>
    </html>
  );
}
