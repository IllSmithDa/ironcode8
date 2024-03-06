import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Providers from "./Providers";
import CookieNotice from "@/components/CookieNotice/CookieNotice";

const appIcon =  '/ironcodeman_small.png';

export const metadata: Metadata = {
  title: 'IronCodeMan',
  description: 'A reference for Programmers',
  icons: {
    icon: appIcon,
    shortcut: appIcon,
    apple: appIcon,
    other: {
      rel: 'ironcodeman',
      url: appIcon 
    }
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode,
}>) {
  return (
    <html lang="en">
      <body
        className={`
          bg-[#AAA]
          dark:bg-[#111]
          relative
        `}
      >
        <Providers>
          <CookieNotice />
          <Navbar />
          {children}
        </Providers>
        </body>
    </html>
  );
}
