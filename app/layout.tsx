import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import { ModeToggle } from "@/components/mode-toggle";
import { QueryProvider } from "@/components/directus";
import LogoImage from "./logo.png";
import Image from "next/image";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Knowledge Base",
  description: "Knowledge Base built with Next.js and Contentlayer",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${inter.className}`}
      >
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-6 2xl:grid-cols-3 gap-4 bg-gray-300 dark:bg-slate-900 py-8">
              <div></div>
              <div className="w-full sm:col-span-1 md:col-span-4 2xl:col-span-1">
                <header>
                  <div className="flex items-center justify-between">
                    <div className="dark:bg-gray-300 p-2 rounded">
                      <Image src={LogoImage} alt={""} width={100} />
                    </div>
                    <div
                      className="d-inline-flex"
                      style={{
                        display: "inline-flex",
                        gap: "1em",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <nav className="ml-auto text-sm font-medium space-x-6">
                        <Link href="/">Home</Link>
                        <Link href="/faq">FAQ</Link>
                        <Link href="/contact-us">Hubungi Kami</Link>
                      </nav>
                      <ModeToggle />
                    </div>
                  </div>
                </header>
              </div>
              <div></div>
            </div>
            <div className="flex flex-col min-h-screen">
              <div className="flex-grow">
                <main>{children}</main>
              </div>
              <footer className="bg-gray-300 dark:bg-slate-900 p-4 w-full">
                <div className="container mx-auto text-center">
                  <p className="mb-3">Copyright © 2024 Helpdesk</p>
                </div>
              </footer>
            </div>
          </ThemeProvider>
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  );
}
