"use client";

import React, { useState } from "react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface AIAssistantProps {
  className?: string;
  currentCode?: string;
  currentLanguage?: string;
  videoUrl?: string;
  videoTimestamp?: number;
}

const AIAssistant: React.FC<AIAssistantProps> = ({
  className = "",
  currentCode = "",
  currentLanguage = "javascript",
  videoUrl = "",
  videoTimestamp = 0,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "👋 Hi! I'm your AI programming mentor powered by Gemini with full access to your code and video content!\n\n🎥 **Video Access**: I can see what you're watching and help explain concepts\n💻 **Code Access**: I can analyze your code in real-time and suggest improvements\n\nI can help you with:\n• Code explanations and debugging\n• Video content clarification\n• Programming concepts from the tutorial\n• Error analysis and solutions\n• Connecting video lessons to your code\n\nWhat's your doubt today? Ask me anything about the video or your code!",
      isUser: false,
      timestamp: new Date(),
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const exampleQuestions = [
    "Explain what's happening in the video at this point",
    "What's wrong with my current code?",
    "How does this video concept apply to my code?",
    "Can you improve my code based on the video?",
    "What does this function do in my editor?",
    "Explain the video concept in simpler terms",
  ];

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true); // Simulate AI response with context awareness
    setTimeout(() => {
      const contextInfo = [];
      if (currentCode.trim()) {
        contextInfo.push(
          `📝 Current Code: ${currentLanguage.toUpperCase()} (${currentCode.length} characters)`,
        );
      }
      if (videoUrl) {
        contextInfo.push(`🎥 Video Context: YouTube video loaded`);
      }
      if (videoTimestamp > 0) {
        contextInfo.push(
          `⏱️ Video Timestamp: ${Math.floor(videoTimestamp / 60)}:${String(videoTimestamp % 60).padStart(2, "0")}`,
        );
      }

      const contextText =
        contextInfo.length > 0
          ? `\n\n**Context I can see:**\n${contextInfo.join("\n")}\n\n`
          : "\n\n";

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `🤖 I can see your code and video content! For your question: "${inputText}"${contextText}I would analyze:\n• Your current ${currentLanguage} code\n• The video content you're watching\n• How they connect together\n• Specific improvements or explanations\n\n*Note: This is a demo. In the full version, I would provide detailed analysis using Google's Gemini AI with full access to your code and video context.*`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 ${className}`}
    >
      {" "}
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-t-lg">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-lg">🤖</span>
          </div>{" "}
          <div className="flex-1">
            <h3 className="font-bold">Ask Doubt - Gemini AI</h3>
            <p className="text-sm text-cyan-100">
              Full access to your code & video content
            </p>
            <div className="flex items-center space-x-3 mt-1">
              <div className="flex items-center space-x-1">
                <div
                  className={`w-2 h-2 rounded-full ${currentCode ? "bg-green-400" : "bg-gray-400"}`}
                ></div>
                <span className="text-xs text-cyan-100">Code</span>
              </div>
              <div className="flex items-center space-x-1">
                <div
                  className={`w-2 h-2 rounded-full ${videoUrl ? "bg-green-400" : "bg-gray-400"}`}
                ></div>
                <span className="text-xs text-cyan-100">Video</span>
              </div>
            </div>
          </div>
          <div className="ml-auto">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.isUser
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none"
              }`}
            >
              <p className="whitespace-pre-wrap text-sm">{message.text}</p>
              <p
                className={`text-xs mt-1 ${message.isUser ? "text-blue-100" : "text-gray-500"}`}
              >
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}{" "}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg rounded-bl-none">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Context Actions */}
      <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-wrap gap-2">
          {currentCode && (
            <button
              onClick={() => setInputText("Explain my current code")}
              className="text-xs bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800 text-green-700 dark:text-green-300 px-3 py-1 rounded-full transition-colors flex items-center space-x-1"
            >
              <span>💻</span>
              <span>Explain My Code</span>
            </button>
          )}
          {videoUrl && (
            <button
              onClick={() =>
                setInputText("What's being explained in the video right now?")
              }
              className="text-xs bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full transition-colors flex items-center space-x-1"
            >
              <span>🎥</span>
              <span>Video Context</span>
            </button>
          )}
          {currentCode && videoUrl && (
            <button
              onClick={() =>
                setInputText("How does the video relate to my code?")
              }
              className="text-xs bg-purple-100 dark:bg-purple-900 hover:bg-purple-200 dark:hover:bg-purple-800 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full transition-colors flex items-center space-x-1"
            >
              <span>🔗</span>
              <span>Connect Both</span>
            </button>
          )}
        </div>
      </div>
      {/* Quick Questions */}
      <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 mb-2">Common doubts:</p>
        <div className="flex flex-wrap gap-2">
          {exampleQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => setInputText(question)}
              className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about your code, the video, or how they connect..."
            className="flex-1 resize-none border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center"
          >
            <span className="text-lg">➤</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
