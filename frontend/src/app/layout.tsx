import { ThemeProvider } from "@/components/ui/theme-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
import { ParticleBackground } from "@/components/ui/particle-background";
import ChatBot from "@/components/ChatBot";
import { ReduxProvider } from "@/redux/ReduxProvider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Office surveillance interface",
  description: "Office surveillance interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader showSpinner={false} />
          <ParticleBackground />

          {children}
          <ChatBot />
        </ThemeProvider>
        <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
