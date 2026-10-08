import type { Metadata } from "next";

import localFont from "next/font/local";

import "./globals.css";

export const metadata: Metadata = {
  title: "Online Shopping App",
  description: "Online shopping app",
};

const vazirFont = localFont({
  src: "../public/font/Vazirmatn[wght].woff2",
});

const robot = localFont({
  src: "../public/font/roboto-math-standard-normal.woff2",
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`antialiased m-2`}>
      <body className={`${robot.className}`}>{children}</body>
    </html>
  );
}
