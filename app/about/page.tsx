import Link from "next/link";
import {
  FaPlay,
  FaRobot,
  FaCode,
  FaBolt,
  FaGlobe,
  FaBullseye,
  FaYoutube,
  FaBrain,
  FaEye,
  FaShieldAlt,
  FaUserCheck,
  FaComments,
  FaSearch,
  FaBookmark,
  FaDownload,
  FaClock,
  FaUsers,
  FaLightbulb,
  FaChartLine,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            About Learnod
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Revolutionizing the way you learn programming
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Learnod is an interactive learning platform that combines video
              tutorials with hands-on coding practice. Our mission is to provide
              a seamless learning experience for aspiring developers by bridging
              the gap between theory and practice.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              We believe that the best way to learn programming is by doing.
              That&apos;s why we&apos;ve created an environment where you can
              watch instructional videos and immediately apply what you&apos;ve
              learned in our built-in code editor.{" "}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Key Features
            </h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-center">
                <FaYoutube className="text-green-500 mr-3 text-lg" />
                Integrated YouTube Video Player for seamless learning
              </li>
              <li className="flex items-center">
                <FaCode className="text-green-500 mr-3 text-lg" />
                Built-in Code Editor with Syntax Highlighting
              </li>
              <li className="flex items-center">
                <FaBolt className="text-green-500 mr-3 text-lg" />
                Real-time Code Execution and Testing
              </li>
              <li className="flex items-center">
                <FaEye className="text-green-500 mr-3 text-lg" />
                Dark/Light Mode for comfortable learning
              </li>
              <li className="flex items-center">
                <FaGlobe className="text-green-500 mr-3 text-lg" />
                Responsive Design for all devices
              </li>
              <li className="flex items-center">
                <FaBullseye className="text-green-500 mr-3 text-lg" />
                Support for multiple programming languages
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 mb-12">
          {" "}
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
            Supported Languages
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { name: "JavaScript", desc: "Web Development" },
              { name: "Python", desc: "Data & Backend" },
              { name: "Java", desc: "Enterprise Apps" },
              { name: "C++", desc: "System Programming" },
              { name: "TypeScript", desc: "Type-Safe JS" },
              { name: "Go", desc: "Cloud & Backend" },
              { name: "Rust", desc: "Memory Safety" },
              { name: "PHP", desc: "Web Backend" },
            ].map((lang) => (
              <div key={lang.name} className="p-4">
                <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                  {lang.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {lang.desc}
                </div>{" "}
              </div>
            ))}
          </div>
        </div>

        {/* Why Our Platform Stands Out Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Why Our Platform Stands Out
          </h2>
          {/* YouTube Features */}
          <div className="mb-12">
            {" "}
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center justify-center">
              <FaYoutube className="text-red-500 mr-3" />
              Ad-Free YouTube Experience
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-green-300 dark:hover:border-green-600 group">
                <FaShieldAlt className="text-green-500 text-2xl mb-3 transition-transform duration-300 group-hover:scale-110" />
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Zero Distractions
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  YouTube integration with embedded videos - no separate tabs or
                  ads interrupting your focus.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-green-300 dark:hover:border-green-600 group">
                <FaUserCheck className="text-green-500 text-2xl mb-3 transition-transform duration-300 group-hover:scale-110" />
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Seamless Integration
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Watch tutorials and code simultaneously without switching
                  between tabs.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-green-300 dark:hover:border-green-600 group">
                <FaClock className="text-green-500 text-2xl mb-3 transition-transform duration-300 group-hover:scale-110" />
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Video Controls
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Standard playback controls - pause, rewind, speed adjustment
                  while coding.
                </p>
              </div>
            </div>{" "}
          </div>
          {/* AI Assistant Features */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center justify-center">
              <FaRobot className="text-blue-500 mr-3" />
              Ask Doubt - Gemini AI with Full Context Access
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
              Our AI assistant can see both your code and video content,
              providing contextual help that connects what you're watching to
              what you're coding.
            </p>{" "}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 group">
                <FaBrain className="text-blue-500 text-2xl mb-3 transition-transform duration-300 group-hover:scale-110" />
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Code & Video Analysis
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  AI can see your current code and video timestamp. Ask how the
                  tutorial concepts apply to your specific code.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 group">
                <FaComments className="text-blue-500 text-2xl mb-3 transition-transform duration-300 group-hover:scale-110" />
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Contextual Explanations
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Ask "What's happening in the video right now?" or "How does
                  this relate to my code?" for contextual help.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 group">
                <FaLightbulb className="text-blue-500 text-2xl mb-3 transition-transform duration-300 group-hover:scale-110" />
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Real-time Learning Support
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  AI monitors your learning session and can connect video
                  lessons to your coding practice in real-time.
                </p>
              </div>
            </div>
          </div>
          {/* Comparison Table */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              Traditional Learning vs. Learnod
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Feature
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-600 dark:text-gray-400">
                      Traditional Platforms
                    </th>{" "}
                    <th className="text-center py-3 px-4 font-semibold text-green-600 dark:text-green-400">
                      Learnod
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  <tr>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">
                      Ads-Free Videos
                    </td>
                    <td className="py-3 px-4 text-center">
                      <FaTimes className="text-red-500 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <FaCheck className="text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">
                      Integrated Code Editor
                    </td>
                    <td className="py-3 px-4 text-center">
                      <FaTimes className="text-red-500 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <FaCheck className="text-green-500 mx-auto" />{" "}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">
                      Ask Doubt AI Assistant
                    </td>
                    <td className="py-3 px-4 text-center">
                      <FaTimes className="text-red-500 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <FaCheck className="text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">
                      Real-time Code Execution
                    </td>
                    <td className="py-3 px-4 text-center">
                      <FaTimes className="text-red-500 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <FaCheck className="text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">
                      Dark/Light Mode
                    </td>
                    <td className="py-3 px-4 text-center">
                      <FaTimes className="text-red-500 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <FaCheck className="text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">
                      Multi-language Support
                    </td>
                    <td className="py-3 px-4 text-center text-gray-400">
                      Basic
                    </td>
                    <td className="py-3 px-4 text-center">
                      <FaCheck className="text-green-500 mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="text-center">
          {" "}
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Start coding today with our integrated video learning platform
          </p>
          <Link
            href="/app-page"
            className="inline-block px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            Start Learning Now
          </Link>
        </div>
      </div>
    </div>
  );
}
