import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Online Shopping App",
  description: "Online shopping app",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`antialiased m-2`}>
      <body className="">{children}</body>
    </html>
  );
}
