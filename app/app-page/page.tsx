"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import VideoPlayer from "../../components/VideoPlayer";
import AIAssistant from "../../components/AIAssistant";
import { exampleCode } from "../../components/CodeEditor";

// Dynamically import CodeEditor to avoid SSR issues
const CodeEditor = dynamic(() => import("../../components/CodeEditor"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[500px] bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div className="text-gray-500 dark:text-gray-400">
        Loading code editor...
      </div>
    </div>
  ),
});

const AppPage = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(exampleCode.javascript);
  const [output, setOutput] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedTheme);

    // Listen for theme changes in localStorage
    const handleStorageChange = () => {
      const currentTheme = localStorage.getItem("darkMode") === "true";
      setIsDarkMode(currentTheme);
    };

    window.addEventListener("storage", handleStorageChange);

    // Also listen for manual changes to the document class
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      if (isDark !== isDarkMode) {
        setIsDarkMode(isDark);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      observer.disconnect();
    };
  }, [isDarkMode]);

  const handleOutputChange = (newOutput: string) => {
    setOutput(newOutput);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6">
        <div className="mx-auto mb-6 max-w-[1920px] w-full">
          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Left Column - Video and AI Assistant */}
            <div className="space-y-6">
              {/* Video Section */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col">
                <div className="mb-4">
                  <label className="block text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Video URL
                  </label>
                  <input
                    type="text"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter YouTube URL"
                  />
                </div>
                <div className="w-full aspect-video flex-none mb-4">
                  <VideoPlayer url={videoUrl} />
                </div>
              </div>

              {/* AI Assistant Section - Now below video */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col">
                <AIAssistant
                  className="h-[600px]"
                  currentCode={code}
                  currentLanguage={language}
                  videoUrl={videoUrl}
                  videoTimestamp={0}
                />
              </div>
            </div>

            {/* Right Column - Code Editor */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Code Editor
              </h2>
              <div className="w-full flex-1 min-h-[800px]">
                <CodeEditor
                  code={code}
                  setCode={setCode}
                  onOutputChange={handleOutputChange}
                  isDarkMode={isDarkMode}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPage;
