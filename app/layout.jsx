import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  manifest: "/manifest.json",
  title: "Password Generater",
  description: "Page for generate randomly passwords with many numbers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="indigo" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
