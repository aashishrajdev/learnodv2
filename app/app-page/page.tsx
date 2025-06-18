"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import VideoPlayer from "../../components/VideoPlayer";
import { GoogleGenAI } from "@google/genai";
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
  const [videoUrl, setVideoUrl] = useState(
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  );
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(exampleCode.javascript);
  const [output, setOutput] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notes, setNotes] = useState("");
  const [transcript, setTranscript] = useState("");
  const [loadingTranscript, setLoadingTranscript] = useState(false);

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

  // Gemini AI helper for notes analysis and learning assistance
  const handleGeminiTranscript = async () => {
    setLoadingTranscript(true);
    setTranscript("");
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      setTranscript(
        "Gemini API key not found. Please set it in your .env.local file.",
      );
      setLoadingTranscript(false);
      return;
    }

    const ai = new GoogleGenAI({ apiKey });

    // Use notes content if available, otherwise provide learning assistance
    let prompt;
    if (notes.trim()) {
      prompt = `Please analyze and enhance these learning notes:\n\n${notes}\n\nProvide:
1. A summary of key points
2. Additional insights or explanations
3. Suggestions for further learning`;
    } else {
      prompt = `Based on this video URL: ${videoUrl}
      
Please provide:
1. General learning tips for video-based education
2. How to take effective notes while watching educational content
3. Study techniques for programming/technical videos
      
Note: I cannot access external websites to view the actual video content.`;
    }

    let lastError = null;
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: prompt,
          config: {
            systemInstruction:
              "You are an expert learning assistant. Help users with note-taking, study tips, and educational guidance. Be clear that you cannot access external websites.",
            maxOutputTokens: 500,
            temperature: 0.3,
          },
        });
        setTranscript(response.text || "No response returned.");
        setLoadingTranscript(false);
        return;
      } catch (err: any) {
        lastError = err;
        // If 503, retry once
        if (err?.message?.includes("503") && attempt < 2) {
          await new Promise((res) => setTimeout(res, 1200));
          continue;
        }
        break;
      }
    }
    if (lastError?.message?.includes("503")) {
      setTranscript(
        "Gemini service is temporarily unavailable (503). Please try again in a few moments.",
      );
    } else {
      setTranscript(
        "Error fetching response: " + (lastError?.message || lastError),
      );
    }
    setLoadingTranscript(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6">
        <div className="mx-auto mb-6 flex flex-col lg:flex-row gap-6 max-w-[1920px] w-full">
          {/* Video Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex-1 min-w-0 w-full lg:w-[960px] max-w-[960px] min-h-[500px] flex flex-col">
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
            {/* Video area with fixed aspect ratio and flex-none to prevent shrinking */}
            <div className="w-full aspect-video flex-none mb-2">
              <VideoPlayer url={videoUrl} />
            </div>
            {/* Notes & Transcript Section - scrollable if content is large */}
            <div className="mt-6 flex-1 overflow-auto">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Notes & Learning Assistant
              </h3>
              <textarea
                className="w-full min-h-[120px] p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white mb-2 resize-y"
                placeholder="Write your notes here... Gemini AI can help analyze and enhance your notes!"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-60"
                onClick={handleGeminiTranscript}
                type="button"
                disabled={loadingTranscript}
              >
                {loadingTranscript
                  ? "Generating..."
                  : notes.trim()
                    ? "Analyze Notes with Gemini"
                    : "Get Learning Tips from Gemini"}
              </button>
              {transcript && (
                <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-900 dark:text-white whitespace-pre-wrap">
                  <strong>AI Assistant:</strong>
                  <div>{transcript}</div>
                </div>
              )}
            </div>
          </div>

          {/* Code Editor Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex-1 min-w-0 w-full lg:w-[960px] max-w-[960px] min-h-[500px] flex flex-col">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Code Editor
            </h2>
            {/* Fixed height for code editor area to match video, output always below */}
            <div className="w-full aspect-video flex-none mb-2">
              <CodeEditor
                code={code}
                setCode={setCode}
                onOutputChange={handleOutputChange}
                isDarkMode={isDarkMode} // Follows app theme
              />
            </div>
            {/* Output Section - always below, scrollable if large, never pushes editor up */}
            {/* Remove duplicate output rendering, since CodeEditor already renders output for non-web languages */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPage;
