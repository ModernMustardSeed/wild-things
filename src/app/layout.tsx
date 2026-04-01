import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WILD Things — Sarah Scarano | I Turn Ideas Into Products",
  description: "Fullstack engineer and AI architect who takes your idea from concept to deployed product in weeks. 20+ products shipped solo. Tell me your idea.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="film-grain scanlines min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
