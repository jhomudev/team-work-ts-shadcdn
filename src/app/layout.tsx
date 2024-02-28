import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import ThemeAppProvider from "@/providers/ThemeAppProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Team wok",
  description: "Plataforma de empleo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-bg-light dark:bg-bg-dark min-h-[100dvh]`}>
        <ThemeAppProvider>
          <div className="container px-7">
            <NavBar />
            {children}
          </div>
        </ThemeAppProvider>
      </body>
    </html>
  );
}
