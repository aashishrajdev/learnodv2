import React from "react";
import Link from "next/link";
import "./globals.css";
import ThemeToggle from "../components/ThemeToggle";
import NewsletterSignup from "../components/NewsletterSignup";
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaEnvelope,
  FaHeart,
  FaCode,
  FaRocket,
  FaGraduationCap,
  FaQuestionCircle,
} from "react-icons/fa";

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <Link
                    href="/"
                    className="text-2xl font-bold text-green-600 dark:text-green-400 transition-all duration-300 hover:scale-105 hover:text-green-700 dark:hover:text-green-300"
                  >
                    Learnod
                  </Link>
                </div>
                <div className="flex items-center space-x-6">
                  <Link
                    href="/"
                    className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:scale-105"
                  >
                    Home
                  </Link>
                  <Link
                    href="/app-page"
                    className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:scale-105"
                  >
                    Learn
                  </Link>
                  <Link
                    href="/about"
                    className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:scale-105"
                  >
                    About
                  </Link>
                  <Link
                    href="/docs"
                    className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:scale-105"
                  >
                    Docs
                  </Link>
                  <ThemeToggle />
                </div>
              </div>
            </nav>
          </header>
          <div className="pt-16">
            <main>{children}</main>
          </div>

          {/* Comprehensive Footer */}
          <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Main Footer Content */}
              <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Company Info */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Link
                      href="/"
                      className="text-2xl font-bold text-green-400 hover:text-green-300 transition-colors"
                    >
                      Learnod
                    </Link>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Revolutionizing programming education with ad-free YouTube
                    integration, real-time code execution, and AI-powered doubt
                    clearing.
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href="https://github.com/aashishrajdev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
                      aria-label="GitHub"
                    >
                      <FaGithub size={20} />
                    </a>
                    <a
                      href="https://x.com/rajaashish_dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors transform hover:scale-110"
                      aria-label="Twitter"
                    >
                      <FaTwitter size={20} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/aashishraj2022/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-600 transition-colors transform hover:scale-110"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin size={20} />
                    </a>
                    <a
                      href="https://www.youtube.com/@raj.aashish"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-red-500 transition-colors transform hover:scale-110"
                      aria-label="YouTube"
                    >
                      <FaYoutube size={20} />
                    </a>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">
                    Quick Links
                  </h3>
                  <nav className="flex flex-col space-y-2">
                    <Link
                      href="/"
                      className="text-gray-300 hover:text-green-400 transition-colors flex items-center space-x-2 group"
                    >
                      <FaRocket
                        className="group-hover:scale-110 transition-transform"
                        size={14}
                      />
                      <span>Home</span>
                    </Link>
                    <Link
                      href="/app-page"
                      className="text-gray-300 hover:text-green-400 transition-colors flex items-center space-x-2 group"
                    >
                      <FaCode
                        className="group-hover:scale-110 transition-transform"
                        size={14}
                      />
                      <span>Start Learning</span>
                    </Link>
                    <Link
                      href="/about"
                      className="text-gray-300 hover:text-green-400 transition-colors flex items-center space-x-2 group"
                    >
                      <FaGraduationCap
                        className="group-hover:scale-110 transition-transform"
                        size={14}
                      />
                      <span>About Us</span>
                    </Link>
                    <Link
                      href="/docs"
                      className="text-gray-300 hover:text-green-400 transition-colors flex items-center space-x-2 group"
                    >
                      <FaQuestionCircle
                        className="group-hover:scale-110 transition-transform"
                        size={14}
                      />
                      <span>Documentation</span>
                    </Link>
                  </nav>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Features</h3>
                  <nav className="flex flex-col space-y-2">
                    <Link
                      href="/app-page"
                      className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                    >
                      YouTube Integration
                    </Link>
                    <Link
                      href="/app-page"
                      className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                    >
                      Code Editor
                    </Link>
                    <Link
                      href="/app-page"
                      className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                    >
                      Ask Doubt AI
                    </Link>
                    <Link
                      href="/app-page"
                      className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                    >
                      Real-time Execution
                    </Link>
                    <Link
                      href="/app-page"
                      className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                    >
                      10+ Languages
                    </Link>
                  </nav>
                </div>

                {/* Contact & Legal */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Support</h3>
                  <nav className="flex flex-col space-y-2">
                    <Link
                      href="/contact"
                      className="text-gray-300 hover:text-green-400 transition-colors text-sm flex items-center space-x-2"
                    >
                      <FaEnvelope size={12} />
                      <span>Contact Us</span>
                    </Link>
                    <Link
                      href="/docs"
                      className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                    >
                      Help Center
                    </Link>
                    <Link
                      href="/privacy"
                      className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                    >
                      Privacy Policy
                    </Link>
                    <Link
                      href="/terms"
                      className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                    >
                      Terms of Service
                    </Link>
                  </nav>

                  {/* Newsletter Signup */}
                  <NewsletterSignup />
                </div>
              </div>

              {/* Bottom Footer */}
              <div className="border-t border-gray-800 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <div className="flex items-center space-x-1 text-gray-400 text-sm">
                    <span>&copy; 2025 Learnod. Made with</span>
                    <FaHeart className="text-red-500 animate-pulse" size={12} />
                    <span>By</span>
                    <a href="https://github.com/aashishrajdev">Aashish</a>
                  </div>

                  <div className="flex items-center space-x-6 text-sm text-gray-400">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>All systems operational</span>
                    </div>
                    <span>Version 2.0</span>
                  </div>
                </div>
              </div>
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
  icons: {
    icon: "/assets/learnodlogo.png",
    shortcut: "/assets/learnodlogo.png",
    apple: "/assets/learnodlogo.png",
  },
};
