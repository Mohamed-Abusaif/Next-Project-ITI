import type { Metadata } from "next";
import ClientSideSessionProvider from './SessionProvider';
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "NextBlog - Share Your Thoughts",
  description: "A modern blogging platform built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <ClientSideSessionProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <footer className="bg-gray-800 py-6 text-center text-sm text-gray-300">
            <div className="container mx-auto px-4">
              <p>© {new Date().getFullYear()} NextBlog. All rights reserved.</p>
            </div>
          </footer>
        </ClientSideSessionProvider>
      </body>
    </html>
  );
}
