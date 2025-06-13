import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Welcome to Learnod</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Interactive Learning Platform that combines video tutorials with
              hands-on coding practice. Learn programming concepts while
              practicing them in real-time.
            </p>
            <div className="space-x-4">
              <Link
                href="/app-page"
                className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Start Learning
              </Link>
              <Link
                href="/about"
                className="inline-block px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Everything you need for effective learning
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-4xl mb-4">🎥</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Integrated Video Player
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Watch YouTube tutorials directly in the platform
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Built-in Code Editor
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Practice coding with syntax highlighting and real-time execution
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-4xl mb-4">🌓</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Dark/Light Mode
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Choose your preferred theme for comfortable learning
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Languages */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Supported Languages
            </h2>
          </div>
          <div className="flex justify-center space-x-8 flex-wrap">
            {["JavaScript", "Python", "Java", "C++", "TypeScript", "Web"].map(
              lang => (
                <div key={lang} className="text-center p-4">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-2 mx-auto">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">
                      {lang.slice(0, 2)}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{lang}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
