import {
  FaShieldAlt,
  FaEye,
  FaDatabase,
  FaCookie,
  FaUserShield,
  FaGavel,
} from "react-icons/fa";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <FaShieldAlt
                className="text-blue-600 dark:text-blue-400"
                size={32}
              />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Last updated: June 25, 2025
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="p-8 space-y-8">
            {/* Introduction */}
            <section>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                At Learnod, we take your privacy seriously. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your
                information when you visit our website and use our services.
                Please read this privacy policy carefully.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <div className="flex items-center space-x-3 mb-4">
                <FaDatabase
                  className="text-green-600 dark:text-green-400"
                  size={20}
                />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Information We Collect
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Information You Provide
                  </h3>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-1 ml-4">
                    <li>
                      • Contact information (email address, name) when you
                      contact us
                    </li>
                    <li>• Code snippets you write in our editor</li>
                    <li>• YouTube URLs you input for learning</li>
                    <li>• Questions you ask our AI assistant</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Automatically Collected Information
                  </h3>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-1 ml-4">
                    <li>• Usage data and analytics</li>
                    <li>• IP address and browser information</li>
                    <li>• Device information and screen resolution</li>
                    <li>• Pages visited and time spent on our platform</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section>
              <div className="flex items-center space-x-3 mb-4">
                <FaEye className="text-blue-600 dark:text-blue-400" size={20} />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  How We Use Your Information
                </h2>
              </div>

              <ul className="text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                <li>• To provide and maintain our learning platform</li>
                <li>
                  • To improve our AI assistant and code execution features
                </li>
                <li>• To respond to your questions and provide support</li>
                <li>• To analyze usage patterns and improve user experience</li>
                <li>• To send important updates about our service</li>
                <li>• To prevent fraud and ensure platform security</li>
              </ul>
            </section>

            {/* YouTube Integration */}
            <section className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                YouTube Integration & Privacy
              </h2>
              <div className="text-gray-600 dark:text-gray-300 space-y-2">
                <p>
                  <strong>Ad-Free Experience:</strong> We embed YouTube videos
                  without ads or tracking cookies from YouTube's advertising
                  network.
                </p>
                <p>
                  <strong>No Personal Data to YouTube:</strong> We don't share
                  your personal information with YouTube. Video URLs you input
                  are processed locally in your browser.
                </p>
                <p>
                  <strong>YouTube's Terms:</strong> By using YouTube videos
                  through our platform, you agree to YouTube's Terms of Service
                  and Privacy Policy.
                </p>
              </div>
            </section>

            {/* AI Assistant Privacy */}
            <section className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                AI Assistant & Code Privacy
              </h2>
              <div className="text-gray-600 dark:text-gray-300 space-y-2">
                <p>
                  <strong>Code Processing:</strong> Your code is processed by
                  Google's Gemini AI to provide contextual help. Code snippets
                  are sent securely and are not stored permanently.
                </p>
                <p>
                  <strong>Learning Context:</strong> Our AI assistant uses your
                  current code and video context to provide relevant
                  explanations. This data is processed in real-time.
                </p>
                <p>
                  <strong>No Code Storage:</strong> We don't permanently store
                  your code on our servers. Code exists only in your browser
                  session.
                </p>
              </div>
            </section>

            {/* Data Security */}
            <section>
              <div className="flex items-center space-x-3 mb-4">
                <FaUserShield
                  className="text-green-600 dark:text-green-400"
                  size={20}
                />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Data Security
                </h2>
              </div>

              <div className="text-gray-600 dark:text-gray-300 space-y-2">
                <p>
                  We implement appropriate security measures to protect your
                  information:
                </p>
                <ul className="space-y-1 ml-4">
                  <li>• HTTPS encryption for all data transmission</li>
                  <li>• Secure API connections with Gemini AI</li>
                  <li>• Regular security audits and updates</li>
                  <li>• Limited access to personal data by our team</li>
                </ul>
              </div>
            </section>

            {/* Cookies */}
            <section>
              <div className="flex items-center space-x-3 mb-4">
                <FaCookie
                  className="text-yellow-600 dark:text-yellow-400"
                  size={20}
                />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Cookies and Local Storage
                </h2>
              </div>

              <div className="text-gray-600 dark:text-gray-300 space-y-2">
                <p>We use minimal cookies and local storage for:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Remembering your theme preference (dark/light mode)</li>
                  <li>• Maintaining your session state</li>
                  <li>• Basic analytics to improve our platform</li>
                </ul>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  You can control cookies through your browser settings.
                </p>
              </div>
            </section>

            {/* Your Rights */}
            <section>
              <div className="flex items-center space-x-3 mb-4">
                <FaGavel
                  className="text-purple-600 dark:text-purple-400"
                  size={20}
                />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Your Privacy Rights
                </h2>
              </div>

              <div className="text-gray-600 dark:text-gray-300 space-y-2">
                <p>You have the right to:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Access the personal information we have about you</li>
                  <li>• Correct inaccurate or incomplete information</li>
                  <li>• Delete your personal information</li>
                  <li>• Opt-out of certain communications</li>
                  <li>• Data portability for information you've provided</li>
                </ul>
                <p className="text-sm">
                  To exercise these rights, please contact us at
                  rajaashish.dev@gmail.com
                </p>
              </div>
            </section>

            {/* Changes to Policy */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Changes to This Policy
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last updated" date.
              </p>
            </section>

            {/* Contact */}
            <section className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Contact Us
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                If you have any questions about this Privacy Policy, please
                contact us:
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Email: rajaashish.dev@gmail.com</li>
                <li>
                  • Contact form:{" "}
                  <a
                    href="/contact"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    /contact
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
