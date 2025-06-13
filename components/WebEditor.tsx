"use client";

import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import Monaco Editor to prevent SSR issues
const MonacoEditor = dynamic(() => import("react-monaco-editor"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[200px] bg-gray-100 dark:bg-gray-800 rounded-lg border">
      <div className="text-gray-500 dark:text-gray-400">Loading Editor...</div>
    </div>
  ),
});

interface WebEditorProps {
  isDarkMode: boolean;
  onOutputChange?: (output: string) => void;
}

const WebEditor: React.FC<WebEditorProps> = ({
  isDarkMode,
  onOutputChange,
}) => {
  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web Preview</title>
</head>
<body>
    <h1>Hello World!</h1>
    <p>This is a live preview of your HTML, CSS, and JavaScript.</p>
    <button id="clickBtn">Click me!</button>
</body>
</html>`);

  const [cssCode, setCssCode] = useState(`body {
    font-family: Arial, sans-serif;
    margin: 20px;
    background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
}

h1 {
    color: #333;
    text-align: center;
}

button {
    background: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
}

button:hover {
    background: #0056b3;
}`);

  const [jsCode, setJsCode] =
    useState(`document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('clickBtn');
    let clickCount = 0;
    
    button.addEventListener('click', function() {
        clickCount++;
        button.textContent = \`Clicked \${clickCount} times!\`;
        
        if (clickCount === 5) {
            document.body.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4)';
            button.textContent = 'Amazing! 🎉';
        }
    });
    
    console.log('JavaScript loaded successfully!');
});`);

  const [activeTab, setActiveTab] = useState<"html" | "css" | "js">("html");
  const [fontSize, setFontSize] = useState(14);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const fullscreenRef = useRef<HTMLDivElement>(null);

  const updatePreview = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const fullCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web Preview</title>
    <style>${cssCode}</style>
</head>
<body>
    ${htmlCode.replace(/<\/?(!DOCTYPE|html|head|body)[^>]*>/gi, "")}
    <script>${jsCode}</script>
</body>
</html>`;

      // Use srcdoc for better compatibility
      iframe.srcdoc = fullCode;

      if (onOutputChange) {
        const lines = [
          `HTML: ${htmlCode.split("\n").length} lines`,
          `CSS: ${cssCode.split("\n").length} lines`,
          `JavaScript: ${jsCode.split("\n").length} lines`,
          `Total: ${(htmlCode + cssCode + jsCode).length} characters`,
          `✅ Live preview updated successfully!`,
        ];
        onOutputChange(lines.join("\n"));
      }
    }
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
    if (fullscreenRef.current) {
      if (fullscreenRef.current.requestFullscreen) {
        fullscreenRef.current.requestFullscreen();
      }
    }
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const timer = setTimeout(updatePreview, 500);
    return () => clearTimeout(timer);
  }, [htmlCode, cssCode, jsCode]);

  // Initial load effect
  useEffect(() => {
    // Call updatePreview after component mounts and iframe is ready
    const timer = setTimeout(() => {
      updatePreview();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const getCurrentCode = () => {
    switch (activeTab) {
      case "html":
        return htmlCode;
      case "css":
        return cssCode;
      case "js":
        return jsCode;
      default:
        return "";
    }
  };

  const setCurrentCode = (code: string) => {
    switch (activeTab) {
      case "html":
        setHtmlCode(code);
        break;
      case "css":
        setCssCode(code);
        break;
      case "js":
        setJsCode(code);
        break;
    }
  };

  const getLanguage = () => {
    switch (activeTab) {
      case "html":
        return "html";
      case "css":
        return "css";
      case "js":
        return "javascript";
      default:
        return "html";
    }
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(Number(e.target.value));
  };

  // Fullscreen modal component
  const FullscreenModal = () => (
    <div
      ref={fullscreenRef}
      className="fixed inset-0 bg-black z-50 flex flex-col"
      style={{ display: isFullscreen ? "flex" : "none" }}
    >
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Live Preview - Fullscreen</h2>
        <button
          onClick={closeFullscreen}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
        >
          ✕ Close
        </button>
      </div>
      <iframe
        className="flex-1 bg-white"
        title="Fullscreen Web Preview"
        sandbox="allow-scripts allow-same-origin"
        srcDoc={`
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Web Preview</title>
              <style>${cssCode}</style>
          </head>
          <body>
              ${htmlCode.replace(/<\/?(!DOCTYPE|html|head|body)[^>]*>/gi, "")}
              <script>${jsCode}</script>
          </body>
          </html>
        `}
      />
    </div>
  );

  return (
    <div className={`web-editor ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      {/* Editor Controls */}
      <div className="p-4">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
          {/* Tab Navigation */}
          <div className="flex border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
            {["html", "css", "js"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as "html" | "css" | "js")}
                className={`px-4 py-2 font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? isDarkMode
                      ? "bg-blue-600 text-white"
                      : "bg-blue-500 text-white"
                    : isDarkMode
                      ? "text-gray-300 hover:text-white hover:bg-gray-800"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Editor Settings */}
          <div className="flex items-center space-x-4">
            <label
              className={`text-sm font-medium ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Font Size:
              <input
                type="range"
                min="10"
                max="24"
                value={fontSize}
                onChange={handleFontSizeChange}
                className="ml-2"
              />
              <span className="ml-2">{fontSize}px</span>
            </label>

            <label
              className={`text-sm font-medium ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <input
                type="checkbox"
                checked={showLineNumbers}
                onChange={() => setShowLineNumbers(!showLineNumbers)}
                className="mr-2"
              />
              Line Numbers
            </label>
          </div>
        </div>
      </div>

      {/* Code Editor */}
      <div className="px-4">
        <div className="border rounded-lg overflow-hidden">
          <div
            className={`p-2 text-sm font-medium ${
              isDarkMode
                ? "bg-gray-800 text-gray-300"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {activeTab.toUpperCase()} Editor
          </div>
          <MonacoEditor
            height="300px"
            language={getLanguage()}
            theme={isDarkMode ? "vs-dark" : "vs-light"}
            value={getCurrentCode()}
            onChange={code => setCurrentCode(code || "")}
            options={{
              selectOnLineNumbers: true,
              minimap: { enabled: false },
              fontSize: fontSize,
              lineNumbers: showLineNumbers ? "on" : "off",
              roundedSelection: false,
              scrollBeyondLastLine: false,
              readOnly: false,
              cursorStyle: "line",
              automaticLayout: true,
              wordWrap: "on",
              bracketPairColorization: { enabled: true },
              folding: true,
              suggest: {
                showWords: true,
                showKeywords: true,
                showSnippets: true,
              },
              quickSuggestions: true,
              formatOnType: true,
              formatOnPaste: true,
            }}
          />
        </div>
      </div>

      {/* Live Preview Output */}
      <div className="p-4">
        <div className="border rounded-lg overflow-hidden">
          <div
            className={`p-2 text-sm font-medium flex justify-between items-center ${
              isDarkMode
                ? "bg-gray-800 text-gray-300"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            <span>Live Preview Output</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={updatePreview}
                className={`px-3 py-1 text-xs rounded ${
                  isDarkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                🔄 Refresh
              </button>
              <button
                onClick={openFullscreen}
                className={`px-3 py-1 text-xs rounded ${
                  isDarkMode
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                🔍 Fullscreen
              </button>
            </div>
          </div>
          <div className="w-full h-[250px] border-t-2 border-gray-300 bg-white">
            <iframe
              ref={iframeRef}
              className="w-full h-full border-0"
              title="Web Preview"
              sandbox="allow-scripts allow-same-origin"
              srcDoc={`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web Preview</title>
    <style>
      body { 
        font-family: Arial, sans-serif; 
        margin: 20px; 
        background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
      }
      h1 { color: #333; text-align: center; }
      button { 
        background: #007bff; color: white; padding: 10px 20px; 
        border: none; border-radius: 5px; cursor: pointer; margin-top: 10px;
      }
      button:hover { background: #0056b3; }
    </style>
</head>
<body>
    <h1>Hello World!</h1>
    <p>This is a live preview of your HTML, CSS, and JavaScript.</p>
    <button id="clickBtn">Click me!</button>
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        const button = document.getElementById('clickBtn');
        let clickCount = 0;
        
        button.addEventListener('click', function() {
          clickCount++;
          button.textContent = \`Clicked \${clickCount} times!\`;
          
          if (clickCount === 5) {
            document.body.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4)';
            button.textContent = 'Amazing! 🎉';
          }
        });
        
        console.log('JavaScript loaded successfully!');
      });
    </script>
</body>
</html>`}
            />
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      <FullscreenModal />
    </div>
  );
};

export default WebEditor;
