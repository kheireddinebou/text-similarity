import MobileMenu from "@/components/MobileMenu";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/Toast";
import cn from "@/lib/utils";
import "@/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn("text-slate-900 antialiased", inter.className)}
    >
      <body className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Providers>
          {/* @ts-expect-error Server Component */}
          <Navbar />

          {children}
          <Toaster position="top-center" />

          <MobileMenu />
        </Providers>
      </body>
    </html>
  );
}
