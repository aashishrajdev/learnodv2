import {
  FaGavel,
  FaUserCheck,
  FaExclamationTriangle,
  FaShieldAlt,
  FaBook,
} from "react-icons/fa";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
              <FaGavel
                className="text-purple-600 dark:text-purple-400"
                size={32}
              />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Terms of Service
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
                Welcome to Learnod. These Terms of Service ("Terms") govern your
                use of our website and services. By accessing or using Learnod,
                you agree to be bound by these Terms. If you disagree with any
                part of these terms, you may not access our service.
              </p>
            </section>

            {/* Acceptance */}
            <section>
              <div className="flex items-center space-x-3 mb-4">
                <FaUserCheck
                  className="text-green-600 dark:text-green-400"
                  size={20}
                />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Acceptance of Terms
                </h2>
              </div>

              <div className="text-gray-600 dark:text-gray-300 space-y-2">
                <p>By using Learnod, you confirm that:</p>
                <ul className="space-y-1 ml-4">
                  <li>• You are at least 13 years old</li>
                  <li>
                    • You have the legal capacity to enter into this agreement
                  </li>
                  <li>
                    • You will use our service in compliance with these Terms
                  </li>
                  <li>• You understand this is an educational platform</li>
                </ul>
              </div>
            </section>

            {/* Service Description */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Description of Service
              </h2>

              <div className="text-gray-600 dark:text-gray-300 space-y-2">
                <p>Learnod provides:</p>
                <ul className="space-y-1 ml-4">
                  <li>
                    • Ad-free YouTube video integration for programming
                    tutorials
                  </li>
                  <li>• Online code editor with real-time execution</li>
                  <li>• AI-powered programming assistance through Gemini AI</li>
                  <li>• Multi-language programming support</li>
                  <li>• Educational resources and documentation</li>
                </ul>
                <p className="text-sm font-medium">
                  Our service is provided "as is" for educational purposes.
                </p>
              </div>
            </section>

            {/* User Responsibilities */}
            <section className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <FaShieldAlt
                  className="text-blue-600 dark:text-blue-400"
                  size={20}
                />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  User Responsibilities
                </h2>
              </div>

              <div className="text-gray-600 dark:text-gray-300 space-y-2">
                <p>You agree to:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Use the platform for educational purposes only</li>
                  <li>
                    • Not attempt to hack, damage, or disrupt our services
                  </li>
                  <li>• Not upload malicious code or content</li>
                  <li>• Respect intellectual property rights</li>
                  <li>
                    • Not use the service to generate harmful or illegal content
                  </li>
                  <li>• Not attempt to reverse engineer our systems</li>
                </ul>
              </div>
            </section>

            {/* YouTube Integration Terms */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                YouTube Integration
              </h2>

              <div className="text-gray-600 dark:text-gray-300 space-y-2">
                <p>
                  <strong>Third-Party Service:</strong> YouTube video
                  integration is subject to YouTube's Terms of Service and
                  Community Guidelines.
                </p>
                <p>
                  <strong>Content Responsibility:</strong> You are responsible
                  for ensuring you have the right to use any YouTube content for
                  educational purposes.
                </p>
                <p>
                  <strong>No Content Hosting:</strong> We do not host, store, or
                  redistribute YouTube content. We only provide embedded
                  playback.
                </p>
              </div>
            </section>

            {/* AI Assistant Terms */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                AI Assistant Usage
              </h2>

              <div className="text-gray-600 dark:text-gray-300 space-y-2">
                <p>
                  <strong>Educational Purpose:</strong> Our AI assistant is
                  designed for educational support and programming help.
                </p>
                <p>
                  <strong>No Guarantee:</strong> While we strive for accuracy,
                  AI responses may contain errors. Always verify critical
                  information.
                </p>
                <p>
                  <strong>Usage Limits:</strong> We may implement reasonable
                  usage limits to ensure fair access for all users.
                </p>
                <p>
                  <strong>Content Guidelines:</strong> Do not ask the AI to
                  generate harmful, inappropriate, or illegal content.
                </p>
              </div>
            </section>

            {/* Prohibited Uses */}
            <section>
              <div className="flex items-center space-x-3 mb-4">
                <FaExclamationTriangle
                  className="text-red-600 dark:text-red-400"
                  size={20}
                />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Prohibited Uses
                </h2>
              </div>

              <div className="text-gray-600 dark:text-gray-300 space-y-2">
                <p>You may not use Learnod to:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Develop malicious software or exploits</li>
                  <li>• Attempt to gain unauthorized access to systems</li>
                  <li>• Violate any applicable laws or regulations</li>
                  <li>• Harass, abuse, or harm others</li>
                  <li>• Spam or send unwanted communications</li>
                  <li>• Infringe on intellectual property rights</li>
                  <li>• Commercial use without authorization</li>
                </ul>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <div className="flex items-center space-x-3 mb-4">
                <FaBook
                  className="text-purple-600 dark:text-purple-400"
                  size={20}
                />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Intellectual Property
                </h2>
              </div>

              <div className="text-gray-600 dark:text-gray-300 space-y-2">
                <p>
                  <strong>Our Content:</strong> Learnod's platform, design, and
                  original content are protected by copyright and other
                  intellectual property laws.
                </p>
                <p>
                  <strong>Your Code:</strong> You retain ownership of code you
                  write using our platform. We don't claim rights to your
                  original work.
                </p>
                <p>
                  <strong>Third-Party Content:</strong> YouTube videos and other
                  third-party content remain the property of their respective
                  owners.
                </p>
              </div>
            </section>

            {/* Service Availability */}
            <section className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Service Availability
              </h2>

              <div className="text-gray-600 dark:text-gray-300 space-y-2">
                <p>
                  <strong>Uptime:</strong> We strive to maintain high
                  availability but cannot guarantee 100% uptime.
                </p>
                <p>
                  <strong>Maintenance:</strong> We may perform scheduled
                  maintenance that temporarily interrupts service.
                </p>
                <p>
                  <strong>Feature Changes:</strong> We may modify, update, or
                  discontinue features with reasonable notice.
                </p>
              </div>
            </section>

            {/* Disclaimers */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Disclaimers
              </h2>

              <div className="text-gray-600 dark:text-gray-300 space-y-2">
                <p>
                  <strong>Educational Tool:</strong> Learnod is an educational
                  platform. We are not responsible for the accuracy of
                  third-party content.
                </p>
                <p>
                  <strong>No Warranty:</strong> Our service is provided "as is"
                  without warranties of any kind.
                </p>
                <p>
                  <strong>Third-Party Services:</strong> We integrate with
                  third-party services (YouTube, AI providers) and are not
                  responsible for their availability or performance.
                </p>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Limitation of Liability
              </h2>

              <p className="text-gray-600 dark:text-gray-300">
                To the maximum extent permitted by law, Learnod shall not be
                liable for any indirect, incidental, special, consequential, or
                punitive damages, including without limitation, loss of profits,
                data, use, goodwill, or other intangible losses, resulting from
                your use of our service.
              </p>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Termination
              </h2>

              <div className="text-gray-600 dark:text-gray-300 space-y-2">
                <p>
                  We may terminate or suspend your access immediately, without
                  prior notice, for any reason whatsoever, including without
                  limitation if you breach the Terms.
                </p>
                <p>
                  Upon termination, your right to use the service will cease
                  immediately.
                </p>
              </div>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Changes to Terms
              </h2>

              <p className="text-gray-600 dark:text-gray-300">
                We reserve the right to modify or replace these Terms at any
                time. If a revision is material, we will try to provide at least
                30 days notice prior to any new terms taking effect.
              </p>
            </section>

            {/* Contact */}
            <section className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Contact Information
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                If you have any questions about these Terms of Service, please
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
