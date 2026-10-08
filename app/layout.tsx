import type { Metadata } from "next";

import localFont from "next/font/local";

import { ThemeProvider } from "next-themes";

import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Online Shopping App",
  description: "Online shopping app",
};

const vazirFont = localFont({
  src: "../public/font/Vazirmatn[wght].woff2",
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      dir="ltr"
      className={cn("antialiased", "m-2", "font-sans", geist.variable)}
    >
      <body className={`${vazirFont.className} overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
