"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import TechIcon from "../components/TechIcon";
import {
  FaPlay,
  FaCode,
  FaRocket,
  FaMobile,
  FaGraduationCap,
  FaBolt,
  FaRobot,
  FaDesktop,
  FaSun,
  FaQuestionCircle,
} from "react-icons/fa";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(0);

  const languages = [
    "python",
    "javascript",
    "java",
    "cpp",
    "rust",
    "go",
    "php",
    "typescript",
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentLanguage((prev) => (prev + 1) % languages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        {/* welome to leanod */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Logo */}
            <div className="mb-8">
              <img
                src="/assets/learnodlogo.png"
                alt="Learnod"
                className="w-24 h-24 mx-auto mb-4"
              />
            </div>

            <h1 className="text-6xl font-bold mb-6">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                Learnod
              </span>
            </h1>

            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Master programming with our revolutionary learning platform. Watch
              <span className="text-green-600 dark:text-green-300 font-semibold">
                {" "}
                ad-free YouTube tutorials
              </span>{" "}
              with
              <span className="text-gray-600 dark:text-gray-300 font-semibold">
                {" "}
                seamless controls
              </span>
              , write code, and execute it instantly. <br />
              <span className=" text-blue-600 dark:text-blue-300 font-semibold">
                With{" "}
                <span className="text-3xl text-blue-600 dark:text-blue-300 font-semibold">
                  AI
                </span>{" "}
                feature
              </span>{" "}
              for contextual explanations.
              <br />
              <span className="text-green-600 dark:text-green-300 font-semibold">
                Zero distractions • AI sees your code & video • Instant
                execution • YouTube integration
              </span>
            </p>

            {/* Rotating language showcase */}
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <span className="text-lg">Now supporting:</span>
                <div className="relative w-16 h-16 bg-gray-200 dark:bg-white/20 rounded-full flex items-center justify-center transform transition-transform duration-500 hover:scale-110">
                  <TechIcon lang={languages[currentLanguage]} size={40} />
                </div>
                <span className="text-lg font-semibold capitalize">
                  {languages[currentLanguage] === "cpp"
                    ? "C++"
                    : languages[currentLanguage]}
                </span>
              </div>
            </div>

            <div className="space-x-4">
              <Link
                href="/app-page"
                className="inline-block px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Start Learning Now
              </Link>
              <Link
                href="/about"
                className="inline-block px-8 py-4 border-2 border-gray-600 dark:border-white text-gray-600 dark:text-white font-semibold rounded-lg hover:bg-gray-600 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Everything you need for effective programming education
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300">
                <FaPlay className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                YouTube Integration
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Watch programming tutorials with playback controls, subtitles,
                and speed adjustment - all embedded seamlessly
              </p>
            </div>

            <div className="group text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300">
                <FaCode className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Advanced Code Editor
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Monaco Editor with syntax highlighting, IntelliSense, and
                real-time execution
              </p>
            </div>

            <div className="group text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300">
                <FaBolt className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Instant Execution
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Run your code instantly with real-time output and error handling
              </p>
            </div>

            <div className="group text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300">
                <FaMobile className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Responsive Design
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Learn on any device - desktop, tablet, or mobile with responsive
                design
              </p>
            </div>

            <div className="group text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300">
                <FaGraduationCap className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Interactive Learning
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Hands-on practice with immediate feedback and guided learning
                paths
              </p>
            </div>

            <div className="group text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300">
                <FaDesktop className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Ad-Free Learning Environment
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Zero ads, zero distractions - just pure learning. Focus on code
                with clean YouTube embeds and uninterrupted tutorials
              </p>
            </div>

            <div className="group text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                <FaQuestionCircle className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Ask Doubt - Gemini AI
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Stuck on a concept? Gemini AI can see your code and video
                content. Ask any programming doubt and get contextual, detailed
                explanations instantly.
              </p>
            </div>

            <div className="group text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300">
                <FaRocket className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                High Performance
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Fast loading times and smooth performance for uninterrupted
                learning experience
              </p>
            </div>

            {/* Add the ninth tile */}
            <div className="group text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300">
                <FaSun className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Dark & Light Mode
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Toggle between dark and light themes for comfortable coding in
                any environment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Languages */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Supported Programming Languages
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Learn and practice with industry-standard languages
            </p>
          </div>

          {/* Languages Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
            {[
              { lang: "python", name: "Python", desc: "Data Science & AI" },
              {
                lang: "javascript",
                name: "JavaScript",
                desc: "Web Development",
              },
              { lang: "typescript", name: "TypeScript", desc: "Type-Safe JS" },
              { lang: "java", name: "Java", desc: "Enterprise Apps" },
              { lang: "cpp", name: "C++", desc: "System Programming" },
              { lang: "c", name: "C", desc: "Low-level Programming" },
              { lang: "rust", name: "Rust", desc: "Memory Safety" },
              { lang: "go", name: "Go", desc: "Cloud & Backend" },
              { lang: "php", name: "PHP", desc: "Web Backend" },
              { lang: "web", name: "HTML/CSS", desc: "Web Design" },
            ].map((item, index) => (
              <div
                key={item.lang}
                className={`group text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700 animate-fade-in-up delay-${index}`}
              >
                <div className="w-16 h-16 mx-auto mb-4 p-2 bg-green-50  rounded-xl transition-transform duration-300">
                  <TechIcon
                    lang={item.lang}
                    size={48}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Additional Tech Stack */}
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
              🛠️ Powered by Modern Technology
            </h3>
            <div className="flex justify-center items-center space-x-8 flex-wrap">
              <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-md">
                <img
                  src="/assets/nextjs.png"
                  alt="Next.js"
                  className="w-8 h-8"
                />
                <span className="font-semibold text-gray-900 dark:text-white">
                  Next.js
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-md">
                <img
                  src="/assets/monacoeditor.png"
                  alt="Monaco Editor"
                  className="w-8 h-8"
                />
                <span className="font-semibold text-gray-900 dark:text-white">
                  Monaco Editor
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-md">
                <img
                  src="/assets/tailwind.png"
                  alt="Tailwind CSS"
                  className="w-8 h-8"
                />
                <span className="font-semibold text-gray-900 dark:text-white">
                  Tailwind CSS
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-md">
                <img
                  src="/assets/Judge0.png"
                  alt="Judge0"
                  className="w-8 h-8"
                />
                <span className="font-semibold text-gray-900 dark:text-white">
                  Judge0 API
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">
            Experience the Future of Programming Education
          </h2>
          <p className="text-xl mb-8">
            Join thousands of learners using our{" "}
            <span className="text-green-300 font-semibold">
              ad-free YouTube platform
            </span>{" "}
            with
            <span className="text-green-300 font-semibold">
              {" "}
              AI that sees your code & video
            </span>{" "}
            to master coding faster than ever
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center space-x-2">
              <span className="text-green-400">✓</span>
              <span className="text-sm">Zero ads, zero distractions</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center space-x-2">
              <span className="text-green-400">✓</span>
              <span className="text-sm">AI with video & code access</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center space-x-2">
              <span className="text-green-400">✓</span>
              <span className="text-sm">10+ languages supported</span>
            </div>
          </div>

          <div className="space-x-4">
            <Link
              href="/app-page"
              className="inline-block px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Learning Free - No Ads Ever!
            </Link>
            <Link
              href="/about"
              className="inline-block px-8 py-4 border-2 border-gray-600 dark:border-white text-gray-600 dark:text-white font-semibold rounded-lg hover:bg-gray-600 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
            >
              Learn More About Ask Doubt AI
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
