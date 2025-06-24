"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FaRocket,
  FaPlay,
  FaCode,
  FaRobot,
  FaBolt,
  FaQuestionCircle,
  FaBook,
  FaVideo,
  FaKeyboard,
  FaLightbulb,
  FaArrowRight,
  FaCopy,
  FaCheck,
  FaYoutube,
  FaTerminal,
  FaGraduationCap,
  FaHeart,
  FaShieldAlt,
  FaUsers,
  FaCog,
  FaExternalLinkAlt,
  FaDownload,
  FaSearch,
  FaBug,
  FaLifeRing,
} from "react-icons/fa";

export default function Docs() {
  const [copiedCode, setCopiedCode] = useState<string>("");

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  const codeExamples = {
    javascript: `// Hello World in JavaScript
console.log("Hello, Learnod!");

// Function example
function calculateSum(a, b) {
  return a + b;
}

const result = calculateSum(5, 3);
console.log("Sum:", result);`,

    python: `# Hello World in Python
print("Hello, Learnod!")

# Function example
def calculate_sum(a, b):
    return a + b

result = calculate_sum(5, 3)
print(f"Sum: {result}")`,

    cpp: `#include <iostream>
using namespace std;

// Hello World in C++
int main() {
    cout << "Hello, Learnod!" << endl;
    
    // Function example
    int a = 5, b = 3;
    int sum = a + b;
    cout << "Sum: " << sum << endl;
    
    return 0;
}`,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {" "}
      {/* Hero Section */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Learnod Documentation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Master programming with our comprehensive guide. Learn how to use
            Learnod's powerful features for distraction-free coding education
            with YouTube integration and AI assistance.
          </p>{" "}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/app-page"
              className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <FaRocket />
              <span>Start Learning</span>
            </Link>
            <Link
              href="#quick-start"
              className="inline-flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <FaBook />
              <span>Quick Start Guide</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Table of Contents */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-12 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
            <FaBook className="text-green-600" />
            <span>Table of Contents</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="#quick-start"
              className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
            >
              <FaRocket size={16} />
              <span>Quick Start</span>
            </a>
            <a
              href="#interface-overview"
              className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
            >
              <FaCog size={16} />
              <span>Interface Overview</span>
            </a>
            <a
              href="#video-integration"
              className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
            >
              <FaVideo size={16} />
              <span>Video Integration</span>
            </a>
            <a
              href="#code-editor"
              className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
            >
              <FaCode size={16} />
              <span>Code Editor</span>
            </a>
            <a
              href="#ai-assistant"
              className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
            >
              <FaRobot size={16} />
              <span>AI Assistant</span>
            </a>
            <a
              href="#keyboard-shortcuts"
              className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
            >
              <FaKeyboard size={16} />
              <span>Keyboard Shortcuts</span>
            </a>
            <a
              href="#supported-languages"
              className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
            >
              <FaTerminal size={16} />
              <span>Supported Languages</span>
            </a>
            <a
              href="#best-practices"
              className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
            >
              <FaLightbulb size={16} />
              <span>Best Practices</span>
            </a>
            <a
              href="#troubleshooting"
              className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
            >
              <FaBug size={16} />
              <span>Troubleshooting</span>
            </a>
          </div>
        </div>

        {/* Quick Start Section */}
        <section id="quick-start" className="mb-16">
          <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-8 text-white mb-8">
            <h2 className="text-3xl font-bold mb-4 flex items-center space-x-3">
              <FaRocket />
              <span>Quick Start Guide</span>
            </h2>
            <p className="text-green-100 mb-6 text-lg">
              Get up and running with Learnod in under 5 minutes. No
              installation or setup required!
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </span>
                  <div>
                    <h4 className="font-semibold mb-1">
                      Navigate to Learn Page
                    </h4>
                    <p className="text-green-100 text-sm">
                      Click on "Learn" in the navigation or visit /app-page
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </span>
                  <div>
                    <h4 className="font-semibold mb-1">Add YouTube Video</h4>
                    <p className="text-green-100 text-sm">
                      Paste any YouTube tutorial URL in the video input field
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </span>
                  <div>
                    <h4 className="font-semibold mb-1">Start Coding</h4>
                    <p className="text-green-100 text-sm">
                      Write code in the editor alongside the video tutorial
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </span>
                  <div>
                    <h4 className="font-semibold mb-1">Ask AI for Help</h4>
                    <p className="text-green-100 text-sm">
                      Use the AI assistant to get explanations and resolve
                      doubts
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <h4 className="font-semibold mb-3 flex items-center space-x-2">
                  <FaYoutube />
                  <span>Recommended Video Types</span>
                </h4>
                <ul className="space-y-2 text-sm text-green-100">
                  <li>• Programming tutorials and courses</li>
                  <li>• Code-along projects</li>
                  <li>• Algorithm explanations</li>
                  <li>• Framework and library guides</li>
                  <li>• Live coding sessions</li>
                  <li>• Technical interviews prep</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Documentation Sections */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Getting Started */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <FaPlay
                className="text-green-600 dark:text-green-400"
                size={24}
              />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Getting Started
              </h3>
            </div>
            <div className="space-y-3">
              <a
                href="#video-integration"
                className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                📺 YouTube Video Integration
              </a>
              <a
                href="#interface"
                className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                🖥️ Understanding the Interface
              </a>
              <a
                href="#first-project"
                className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                🚀 Your First Project
              </a>
              <a
                href="#tips"
                className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                💡 Learning Tips
              </a>
            </div>
          </div>

          {/* Code Editor */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <FaCode className="text-blue-600 dark:text-blue-400" size={24} />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Code Editor
              </h3>
            </div>
            <div className="space-y-3">
              <a
                href="#languages"
                className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                🌐 Supported Languages
              </a>
              <a
                href="#features"
                className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                ⚡ Editor Features
              </a>
              <a
                href="#shortcuts"
                className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                ⌨️ Keyboard Shortcuts
              </a>
              <a
                href="#execution"
                className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                🏃 Code Execution
              </a>
            </div>
          </div>

          {/* AI Assistant */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <FaRobot
                className="text-purple-600 dark:text-purple-400"
                size={24}
              />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                AI Assistant
              </h3>
            </div>
            <div className="space-y-3">
              <a
                href="#ask-doubt"
                className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                ❓ How to Ask Doubts
              </a>
              <a
                href="#context"
                className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                🧠 Context Awareness
              </a>
              <a
                href="#best-practices"
                className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                ✨ Best Practices
              </a>
              <a
                href="#examples"
                className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                📝 Question Examples
              </a>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="mt-12 space-y-12">
          {/* Video Integration */}
          <section
            id="video-integration"
            className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-3">
              <FaVideo className="text-red-500" />
              <span>YouTube Video Integration</span>
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Learnod seamlessly integrates with YouTube to provide an
                ad-free, distraction-free learning experience.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Supported URL formats:
                </h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• https://www.youtube.com/watch?v=VIDEO_ID</li>
                  <li>• https://youtu.be/VIDEO_ID</li>
                  <li>• YouTube playlist URLs (will play first video)</li>
                </ul>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Features:
              </h4>
              <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Ad-free video playback</li>
                <li>• Standard video controls (play, pause, seek)</li>
                <li>• Speed adjustment</li>
                <li>• Fullscreen mode</li>
                <li>• Subtitle support</li>
              </ul>
            </div>
          </section>

          {/* Ask Doubt AI */}
          <section
            id="ask-doubt"
            className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-3">
              <FaQuestionCircle className="text-blue-500" />
              <span>Ask Doubt - AI Assistant</span>
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our AI assistant can see both your code and video content,
                providing contextual help that connects what you're watching to
                what you're coding.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                    Good Questions:
                  </h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• "What's happening in the video right now?"</li>
                    <li>• "How does this relate to my code?"</li>
                    <li>• "Why isn't my function working?"</li>
                    <li>• "Can you explain this concept?"</li>
                  </ul>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 dark:text-green-300 mb-2">
                    AI Can See:
                  </h4>
                  <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                    <li>• Your current code</li>
                    <li>• Selected programming language</li>
                    <li>• YouTube video URL</li>
                    <li>• Code execution results</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Supported Languages */}
          <section
            id="languages"
            className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-3">
              <FaKeyboard className="text-green-500" />
              <span>Supported Programming Languages</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "JavaScript", desc: "Web Development" },
                { name: "Python", desc: "Data Science & AI" },
                { name: "Java", desc: "Enterprise Applications" },
                { name: "C++", desc: "System Programming" },
                { name: "TypeScript", desc: "Type-Safe JavaScript" },
                { name: "Go", desc: "Cloud & Backend" },
                { name: "Rust", desc: "Memory Safety" },
                { name: "PHP", desc: "Web Backend" },
                { name: "C", desc: "Low-level Programming" },
                { name: "HTML/CSS", desc: "Web Design" },
              ].map((lang) => (
                <div
                  key={lang.name}
                  className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {lang.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {lang.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Need More Help */}
        <div className="mt-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
          <p className="text-purple-100 mb-6">
            Can't find what you're looking for? Our community and support team
            are here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Support
            </Link>
            <a
              href="#"
              className="bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-800 transition-colors"
            >
              Join Discord Community
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
