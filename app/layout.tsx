import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "500", "600", "700", "900"],
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "낚행 — 낚시와 여행을 잇는 기록",
  description: "낚시와 여행을 함께 공유하는 커뮤니티, 낚행",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={`${fraunces.variable} ${inter.variable} ${mono.variable} font-body relative`}
      >
        <Header />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
