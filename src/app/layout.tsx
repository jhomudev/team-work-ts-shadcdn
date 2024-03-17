import NavBar from "@/components/NavBar";
import ThemeAppProvider from "@/providers/ThemeAppProvider";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Toaster } from '@/components/ui/toaster'
import NextTopLoader from 'nextjs-toploader';
import AuthProvider from "@/providers/AuthProvider";

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
            <div className="w-full min-h-[100dvh]">
              <NextTopLoader
                color="#0093D3"
                initialPosition={0.08}
                crawlSpeed={200}
                height={6}
                crawl={true}
                showSpinner={false}
                easing="ease"
                speed={200}
                shadow="0 0 10px #2299DD,0 0 5px #2299DD"
                zIndex={1600}
                showAtBottom={false}
              />
              <NavBar />
              {children}
            </div>
            <Toaster />
          </ThemeAppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
