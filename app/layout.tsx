import type { Metadata } from "next";
import { Bangers, Comic_Neue } from "next/font/google";
import "./globals.css";

const bangers = Bangers({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bangers",
});

const comicNeue = Comic_Neue({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-comic",
});

export const metadata: Metadata = {
  title: "Lumina Blog",
  description:
    "Curated thoughts on design, spatial computing, and artificial intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bangers.variable} ${comicNeue.variable}`}>
      <body className="antialiased font-comic">{children}</body>
    </html>
  );
}
