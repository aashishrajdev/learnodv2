import Link from "next/link";

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
              learned in our built-in code editor.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Key Features
            </h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                Integrated YouTube Video Player for seamless learning
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                Built-in Code Editor with Syntax Highlighting
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                Real-time Code Execution and Testing
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                Dark/Light Mode for comfortable learning
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                Responsive Design for all devices
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                Support for multiple programming languages
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
            Supported Languages
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { name: "HTML", desc: "Web Structure" },
              { name: "JavaScript", desc: "Interactive Web" },
              { name: "Python", desc: "Data & Backend" },
              { name: "JSON", desc: "Data Format" },
            ].map(lang => (
              <div key={lang.name} className="p-4">
                <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                  {lang.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {lang.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Join thousands of learners who are mastering programming with
            Learnod
          </p>
          <Link
            href="/app-page"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Learning Now
          </Link>
        </div>
      </div>
    </div>
  );
}
