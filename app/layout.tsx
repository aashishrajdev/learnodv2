import React from "react";
import Link from "next/link";
import "./globals.css";
import ThemeToggle from "../components/ThemeToggle";

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <header className="bg-white dark:bg-gray-800 shadow-md">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <Link
                    href="/"
                    className="text-2xl font-bold text-blue-600 dark:text-blue-400"
                  >
                    Learnod
                  </Link>
                </div>
                <div className="flex items-center space-x-6">
                  <Link
                    href="/"
                    className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Home
                  </Link>
                  <Link
                    href="/app-page"
                    className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Learn
                  </Link>
                  <Link
                    href="/about"
                    className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    About
                  </Link>
                  <ThemeToggle />
                </div>
              </div>
            </nav>
          </header>
          <main>{children}</main>
          <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <p className="text-center text-gray-500 dark:text-gray-400">
                &copy; 2024 Learnod - Interactive Learning Platform
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

export const metadata = {
  title: "Learnod - Interactive Learning Platform",
  description:
    "Learn programming with interactive video tutorials and hands-on coding practice",
};
