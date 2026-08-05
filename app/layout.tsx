import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { SiteLayout } from "@/components/site-layout";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Anything.co - One Request. Countless Possibilities.",
  description:
    "Book verified professionals for home, vehicle, tech, events, delivery and expert services. Transparent pricing, live tracking and secure payments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteLayout>{children}</SiteLayout>
        <Toaster />
      </body>
    </html>
  );
}