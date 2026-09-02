import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MainLayout } from "./components/main-layout";
import { cx } from "class-variance-authority";

const inter = Inter({ subsets: ["latin"] });

const title = "THQNAM AnyCable Next.js",
  description =
    "Next.js messaging application of THQNAM using AnyCable as a real-time server and deployed on Vercel";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    locale: 'vi_VN',
    type: "website",
    alternateLocale: ["en_US"],
    siteName: "THQNAM AnyCable Next.js",
    emails: ["thieuhuynhquangnam1996@gmail.com"],
    countryName: "Vietnam",
    phoneNumbers: ["+84937821788"],
    url: "https://thqnam-nextjs-anycable.vercel.app",
    images: [
      {
        url: `https://thqnam-nextjs-anycable.vercel.app/my-picture-1.png`,
        alt: "THQNAM AnyCable Next.js",
        width: 1200,
        height: 630,
        type: "image/jpg",
        secureUrl: `https://thqnam-nextjs-anycable.vercel.app/my-picture-1.png`,
      }
    ]
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width" />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-16x16.png"
          sizes="16x16"
        />
      </head>
      <body className={cx(inter.className, "bg-red-50")}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
