import NavBar from "@/components/NavBar";
import TopLoader from "@/components/TopLoader";
import { Toaster } from '@/components/ui/toaster';
import AppContextProvider from "@/providers/AppContextProvider";
import AuthProvider from "@/providers/AuthProvider";
import ThemeAppProvider from "@/providers/ThemeAppProvider";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Team work",
  description: "Plataforma de empleo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.className} bg-background`}>
        <AuthProvider>
          <ThemeAppProvider>
            <AppContextProvider>
              <div className="w-full h-[100dvh]">
                <TopLoader />
                <NavBar />
                {children}
              </div>
              <Toaster />
            </AppContextProvider>
          </ThemeAppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
