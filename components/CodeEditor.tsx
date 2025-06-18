"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { CodeExecutionService } from "../services/CodeExecutionService";
import { languages } from "../constants/languages";
import { saveCodeToFile, getSuggestedFilename } from "../utils/fileUtils";
import { saveFilesAsZip } from "../utils/zipUtils";
import "../styles/editor.css";
import TechIcon from "./TechIcon";

// Import Prettier for code formatting
import * as prettier from "prettier";
import prettierPluginBabel from "prettier/plugins/babel";
import prettierPluginEstree from "prettier/plugins/estree";
import prettierPluginTypescript from "prettier/plugins/typescript";
import prettierPluginHtml from "prettier/plugins/html";
import prettierPluginCss from "prettier/plugins/postcss";

// Dynamically import Monaco Editor to prevent SSR issues
const MonacoEditor = dynamic(() => import("react-monaco-editor"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[500px] bg-gray-100 dark:bg-[#2d2d2d] rounded-lg border">
      <div className="text-gray-500 dark:text-gray-400">
        Loading Monaco Editor...
      </div>
    </div>
  ),
});

// Configure Monaco Editor for better syntax highlighting
const configureMonaco = () => {
  if (typeof window !== "undefined" && (window as any).monaco) {
    // Set up additional language features
    const monaco = (window as any).monaco;
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      allowNonTsExtensions: true,
    });

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      allowNonTsExtensions: true,
    });
  }
};

interface CodeEditorProps {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  onOutputChange?: (output: string) => void;
  onPreviewChange?: (previewContent: string) => void;
  onLanguageChange?: (language: string) => void;
  isDarkMode: boolean;
}

export const exampleCode = {
  python: `# Python Example
print("Hello, World!")

# Variables and basic operations
name = "Python"
version = 3.9
print(f"Welcome to {name} {version}!")

# Math operations
import math
result = 5 + 3
print(f"5 + 3 = {result}")
print(f"Square root of 16 = {math.sqrt(16)}")

# Lists and loops
fruits = ["apple", "banana", "orange"]
print("Fruits:", fruits)

for i, fruit in enumerate(fruits):
    print(f"{i+1}. {fruit}")

# Functions
def greet(person_name):
    return f"Hello, {person_name}!"

print(greet("User"))

# Dictionary
person = {
    "name": "Alice",
    "age": 25,
    "city": "New York"
}
print("Person:", person)`,

  java: `// Java Example
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Variables
        String name = "Java";
        int number = 42;
        System.out.println("Welcome to " + name + "!");
        System.out.println("Lucky number: " + number);
        
        // Array
        int[] numbers = {1, 2, 3, 4, 5};
        System.out.println("Array length: " + numbers.length);
        
        for (int i = 0; i < numbers.length; i++) {
            System.out.println("Number " + (i+1) + ": " + numbers[i]);
        }
        
        // Method call
        int sum = addNumbers(10, 20);
        System.out.println("10 + 20 = " + sum);
    }
    
    public static int addNumbers(int a, int b) {
        return a + b;
    }
}`,

  c: `#include <stdio.h>
#include <string.h>

int add(int a, int b);  // Function declaration (optional if defined above main)

int add(int a, int b) {
    return a + b;
}

int main() {
    printf("Hello, World!\\n");
    
    // Variables
    int number = 42;
    char name[] = "C Programming";
    
    printf("Number: %d\\n", number);
    printf("Language: %s\\n", name);
    
    // Array
    int numbers[] = {1, 2, 3, 4, 5};
    int size = sizeof(numbers) / sizeof(numbers[0]);
    
    printf("Array elements:\\n");
    for (int i = 0; i < size; i++) {
        printf("numbers[%d] = %d\\n", i, numbers[i]);
    }
    
    // Function call
    int sum = add(10, 20);
    printf("10 + 20 = %d\\n", sum);
    
    return 0;
}`,

  cpp: `// C++ Example
#include <iostream>
#include <vector>
#include <string>

using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    
    // Variables
    string name = "C++";
    int number = 42;
    
    cout << "Welcome to " << name << "!" << endl;
    cout << "Number: " << number << endl;
    
    // Vector
    vector<int> numbers = {1, 2, 3, 4, 5};
    cout << "Vector elements:" << endl;
    
    for (size_t i = 0; i < numbers.size(); i++) {
        cout << "numbers[" << i << "] = " << numbers[i] << endl;
    }
    
    // Range-based for loop (C++11)
    cout << "Using range-based for loop:" << endl;
    for (const auto& num : numbers) {
        cout << num << " ";
    }
    cout << endl;
    
    return 0;
}`,

  typescript: `// TypeScript-like Example (browser-compatible JavaScript)
// No type annotations or interfaces

// Variables
const message = "Hello, World!";
const numbers = [1, 2, 3, 4, 5];

console.log(message);
console.log("Numbers:", numbers);

// Object
const person = {
    name: "Alice",
    age: 30,
    city: "New York"
};

console.log("Person:", person);

// Function
function add(a, b) {
    return a + b;
}

const result = add(5, 3);
console.log("5 + 3 =", result);

// Class
class Greeter {
    constructor(message) {
        this.greeting = message;
    }
    greet(name) {
        return \`\${this.greeting}, \${name}!\`;
    }
}

const greeter = new Greeter("Hello");
console.log(greeter.greet("TypeScript"));`,

  php: `<?php
// PHP Example
echo "Hello, World!\\n";

// Variables
$name = "PHP";
$version = 8.0;
echo "Welcome to $name $version!\\n";

// Array
$fruits = array("apple", "banana", "orange");
echo "Fruits: " . implode(", ", $fruits) . "\\n";

// Associative array
$person = array(
    "name" => "Alice",
    "age" => 25,
    "city" => "New York"
);

echo "Person: " . json_encode($person) . "\\n";

// Function
function add($a, $b) {
    return $a + $b;
}

$result = add(5, 3);
echo "5 + 3 = $result\\n";

// Loop
for ($i = 1; $i <= 5; $i++) {
    echo "Count: $i\\n";
}

// String manipulation
$text = "Hello World";
echo "Original: $text\\n";
echo "Uppercase: " . strtoupper($text) . "\\n";
echo "Length: " . strlen($text) . "\\n";
?>`,

  go: `// Go Example
package main

import (
    "fmt"
    "math"
)

func main() {
    fmt.Println("Hello, World!")
    
    // Variables
    name := "Go"
    version := 1.19
    fmt.Printf("Welcome to %s %.2f!\\n", name, version)
    
    // Slice
    numbers := []int{1, 2, 3, 4, 5}
    fmt.Println("Numbers:", numbers)
    
    // Loop
    for i, num := range numbers {
        fmt.Printf("numbers[%d] = %d\\n", i, num)
    }
    
    // Function call
    result := add(10, 20)
    fmt.Printf("10 + 20 = %d\\n", result)
    
    // Math
    sqrt := math.Sqrt(16)
    fmt.Printf("Square root of 16 = %.2f\\n", sqrt)
    
    // Struct
    type Person struct {
        Name string
        Age  int
    }
    
    person := Person{Name: "Alice", Age: 30}
    fmt.Printf("Person: %+v\\n", person)
}

func add(a, b int) int {
    return a + b
}`,

  rust: `// Rust Example
fn main() {
    println!("Hello, World!");
    
    // Variables
    let name = "Rust";
    let version = 1.70;
    println!("Welcome to {} {}!", name, version);
    
    // Vector
    let numbers = vec![1, 2, 3, 4, 5];
    println!("Numbers: {:?}", numbers);
    
    // Loop with enumerate
    for (i, num) in numbers.iter().enumerate() {
        println!("numbers[{}] = {}", i, num);
    }
    
    // Function call
    let result = add(10, 20);
    println!("10 + 20 = {}", result);
    
    // Struct
    struct Person {
        name: String,
        age: u32,
    }
    
    let person = Person {
        name: String::from("Alice"),
        age: 30,
    };
    
    println!("Person: {} is {} years old", person.name, person.age);
    
    // Pattern matching
    let number = 42;
    match number {
        1..=50 => println!("Number is between 1 and 50"),
        _ => println!("Number is greater than 50"),
    }
}

fn add(a: i32, b: i32) -> i32 {
    a + b
}`,

  javascript: `// JavaScript Example
console.log('Hello, World!');

// Variables
let number = 42;
let name = 'JavaScript';
console.log('Number:', number);
console.log('Language:', name);

// Array
const numbers = [1, 2, 3, 4, 5];
console.log('Array elements:');
numbers.forEach((num, i) => console.log(\`numbers[\${i}] = \${num}\`));

// Function
function add(a, b) {
  return a + b;
}
console.log('10 + 20 =', add(10, 20));`,

  web: `<!-- Web Example: HTML, CSS, JS -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Live Web Preview</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f9f9f9; margin: 0; padding: 2rem; }
    h1 { color: #0070f3; }
    .btn { background: #0070f3; color: #fff; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; }
  </style>
</head>
<body>
  <h1>Hello, Web!</h1>
  <button class="btn" onclick="alert('Button clicked!')">Click Me</button>
  <script>
    // You can write JavaScript here
    console.log('Web preview loaded!');
  </script>
</body>
</html>`,
};

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  setCode,
  onOutputChange,
  onPreviewChange,
  onLanguageChange,
  isDarkMode,
}) => {
  const [language, setLanguage] = useState<string>("javascript");
  const [isExecuting, setIsExecuting] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [showLineNumbers, setShowLineNumbers] = useState(true);

  // Live preview state for web
  const [isWebFullscreen, setIsWebFullscreen] = useState(false);
  const previewRef = React.useRef<HTMLIFrameElement>(null);

  // Output state for non-web languages
  const [output, setOutput] = useState<string>("");

  // Additional states for multi-file editing in web language
  const [htmlCode, setHtmlCode] = useState<string>("");
  const [cssCode, setCssCode] = useState<string>("");
  const [jsCode, setJsCode] = useState<string>("");

  // Web language: separate HTML, CSS, JS editors
  const [webHtml, setWebHtml] = useState<string>(
    `<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Live Web Preview</title>\n</head>\n<body>\n  <h1>Hello, Web!</h1>\n  <button class=\"btn\" onclick=\"alert('Button clicked!')\">Click Me</button>\n</body>\n</html>`,
  );
  const [webCss, setWebCss] = useState<string>(
    `body { font-family: Arial, sans-serif; background: #f9f9f9; margin: 0; padding: 2rem; }\nh1 { color: #0070f3; }\n.btn { background: #0070f3; color: #fff; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; }`,
  );
  const [webJs, setWebJs] = useState<string>(
    `// You can write JavaScript here\nconsole.log('Web preview loaded!');`,
  );

  // For web editor: which file is open ("html" | "css" | "js")
  const [webActiveFile, setWebActiveFile] = useState<"html" | "css" | "js">(
    "html",
  );

  // Combine for preview
  const webPreview = `<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Live Web Preview</title>\n  <style>\n${webCss}\n  </style>\n</head>\n<body>\n${webHtml.match(/<body[\s\S]*?>([\s\S]*)<\/body>/i)?.[1] || ""}\n  <script>\n${webJs}\n  <\/script>\n</body>\n</html>`;

  // Map our language IDs to Monaco Editor language IDs
  const getMonacoLanguage = (lang: string): string => {
    const languageMap: Record<string, string> = {
      python: "python",
      typescript: "typescript",
      java: "java",
      cpp: "cpp",
      c: "c",
      php: "php",
      go: "go",
      rust: "rust",
    };
    return languageMap[lang] || "python";
  };

  // Load example code when language changes
  useEffect(() => {
    if (exampleCode[language as keyof typeof exampleCode]) {
      setCode(exampleCode[language as keyof typeof exampleCode]);
    }
  }, [language, setCode]);

  // Configure Monaco Editor when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      configureMonaco();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Notify parent component of language change
  useEffect(() => {
    onLanguageChange?.(language);
  }, [language, onLanguageChange]);

  const handleRunCode = async () => {
    if (!code.trim()) {
      setOutput("Please enter some code to execute.");
      onOutputChange?.("Please enter some code to execute.");
      return;
    }

    setIsExecuting(true);
    try {
      const executionService = CodeExecutionService.getInstance();
      const result = await executionService.executeCode(code, language);
      setOutput(result);
      onOutputChange?.(result);
    } catch (error) {
      const errMsg = `Error: ${error instanceof Error ? error.message : String(error)}`;
      setOutput(errMsg);
      onOutputChange?.(errMsg);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleFormatCode = async () => {
    try {
      let formattedCode = code;

      const prettierConfig = {
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: "es5" as const,
        printWidth: 80,
      };

      const formatters: Record<string, () => Promise<string>> = {
        typescript: async () =>
          await prettier.format(code, {
            ...prettierConfig,
            parser: "typescript",
            plugins: [
              prettierPluginBabel,
              prettierPluginEstree,
              prettierPluginTypescript,
            ],
          }),
      };

      if (formatters[language]) {
        formattedCode = await formatters[language]();
        setCode(formattedCode);
      }
    } catch (error) {
      console.error("Format error:", error);
    }
  };

  // Save dialog state
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [saveFileName, setSaveFileName] = useState("");
  const [saveTarget, setSaveTarget] = useState<string>(""); // for web: html, css, js, zip

  // Save handler for all languages
  const handleSaveCode = () => {
    if (language === "web") {
      setSaveDialogOpen(true);
      setSaveTarget("");
      setSaveFileName("");
    } else {
      setSaveDialogOpen(true);
      setSaveFileName(getSuggestedFilename(language));
      setSaveTarget("single");
    }
  };

  // Actually save the file(s)
  const handleSaveConfirm = async () => {
    if (language === "web") {
      if (saveTarget === "html") {
        let name = saveFileName || "index.html";
        if (!name.endsWith(".html")) name += ".html";
        saveCodeToFile(webHtml, name);
      } else if (saveTarget === "css") {
        let name = saveFileName || "style.css";
        if (!name.endsWith(".css")) name += ".css";
        saveCodeToFile(webCss, name);
      } else if (saveTarget === "js") {
        let name = saveFileName || "script.js";
        if (!name.endsWith(".js")) name += ".js";
        saveCodeToFile(webJs, name);
      } else if (saveTarget === "zip") {
        const base = saveFileName || "web-code";
        await saveFilesAsZip([
          { name: base + ".html", content: webHtml },
          { name: base + ".css", content: webCss },
          { name: base + ".js", content: webJs },
        ]);
      }
    } else {
      let name = saveFileName || getSuggestedFilename(language);
      const ext = getSuggestedFilename(language).split(".").pop();
      if (ext && !name.endsWith("." + ext)) name += "." + ext;
      saveCodeToFile(code, name);
    }
    setSaveDialogOpen(false);
  };

  const handleFullscreen = () => {
    if (previewRef.current) {
      if (previewRef.current.requestFullscreen) {
        previewRef.current.requestFullscreen();
      } else if ((previewRef.current as any).webkitRequestFullscreen) {
        (previewRef.current as any).webkitRequestFullscreen();
      } else if ((previewRef.current as any).msRequestFullscreen) {
        (previewRef.current as any).msRequestFullscreen();
      }
    }
  };

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-t-lg">
        {/* Language Selection */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Language:
          </label>{" "}
          {/* Show selected language icon */}
          <TechIcon lang={language} size={20} className="mr-1" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            title="Select programming language"
            aria-label="Select programming language"
          >
            {languages.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFontSize(Math.max(10, fontSize - 1))}
            className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
            title="Decrease font size"
          >
            A-
          </button>
          <span className="text-sm text-gray-700 dark:text-gray-300 px-2">
            {fontSize}px
          </span>
          <button
            onClick={() => setFontSize(Math.min(24, fontSize + 1))}
            className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
            title="Increase font size"
          >
            A+
          </button>

          <button
            onClick={() => setShowLineNumbers(!showLineNumbers)}
            className={`px-3 py-1 text-xs rounded transition-colors ${
              showLineNumbers
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500"
            }`}
            title="Toggle line numbers"
          >
            #{showLineNumbers ? "✓" : ""}
          </button>

          {language === "typescript" && (
            <button
              onClick={handleFormatCode}
              className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
              title="Format code"
            >
              Format
            </button>
          )}

          <button
            onClick={handleSaveCode}
            className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            title="Save code to file"
          >
            Save
          </button>

          <button
            onClick={handleRunCode}
            disabled={isExecuting}
            className={`px-4 py-1 text-sm rounded transition-colors ${
              isExecuting
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {isExecuting ? "Running..." : "Run"}
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="relative">
        {language === "web" ? (
          <>
            {/* File select buttons for web editor */}
            <div className="flex gap-2 mb-2">
              <button
                className={`px-3 py-1 rounded-t-md border-b-2 font-semibold transition-colors
                  ${
                    webActiveFile === "html"
                      ? "border-blue-500 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                      : "border-transparent bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                  }
                `}
                onClick={() => setWebActiveFile("html")}
              >
                HTML
              </button>
              <button
                className={`px-3 py-1 rounded-t-md border-b-2 font-semibold transition-colors
                  ${
                    webActiveFile === "css"
                      ? "border-blue-500 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                      : "border-transparent bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                  }
                `}
                onClick={() => setWebActiveFile("css")}
              >
                CSS
              </button>
              <button
                className={`px-3 py-1 rounded-t-md border-b-2 font-semibold transition-colors
                  ${
                    webActiveFile === "js"
                      ? "border-blue-500 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                      : "border-transparent bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                  }
                `}
                onClick={() => setWebActiveFile("js")}
              >
                JS
              </button>
            </div>
            {/* Show only the selected file's editor */}
            {webActiveFile === "html" && (
              <div>
                <div className="font-semibold mb-1">HTML</div>
                <MonacoEditor
                  width="100%"
                  height="450px"
                  language="html"
                  theme={isDarkMode ? "vs-dark" : "vs-light"}
                  value={webHtml}
                  onChange={setWebHtml}
                  options={{
                    fontSize,
                    minimap: { enabled: false },
                    wordWrap: "on",
                  }}
                />
              </div>
            )}
            {webActiveFile === "css" && (
              <div>
                <div className="font-semibold mb-1">CSS</div>
                <MonacoEditor
                  width="100%"
                  height="450px"
                  language="css"
                  theme={isDarkMode ? "vs-dark" : "vs-light"}
                  value={webCss}
                  onChange={setWebCss}
                  options={{
                    fontSize,
                    minimap: { enabled: false },
                    wordWrap: "on",
                  }}
                />
              </div>
            )}
            {webActiveFile === "js" && (
              <div>
                <div className="font-semibold mb-1">JavaScript</div>
                <MonacoEditor
                  width="100%"
                  height="450px"
                  language="javascript"
                  theme={isDarkMode ? "vs-dark" : "vs-light"}
                  value={webJs}
                  onChange={setWebJs}
                  options={{
                    fontSize,
                    minimap: { enabled: false },
                    wordWrap: "on",
                  }}
                />
              </div>
            )}
          </>
        ) : (
          <MonacoEditor
            width="100%"
            height="450px"
            language={getMonacoLanguage(language)}
            theme={isDarkMode ? "vs-dark" : "vs-light"}
            value={code}
            onChange={setCode}
            options={{
              fontSize: fontSize,
              lineNumbers: showLineNumbers ? "on" : "off",
              wordWrap: "on",
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              insertSpaces: true,
              renderWhitespace: "boundary",
              folding: true,
              lineDecorationsWidth: 10,
              lineNumbersMinChars: 3,
              glyphMargin: false,
              contextmenu: true,
              mouseWheelZoom: true,
              smoothScrolling: true,
              cursorBlinking: "smooth",
              cursorSmoothCaretAnimation: "on",
              selectOnLineNumbers: true,
              roundedSelection: false,
              readOnly: false,
              cursorStyle: "line",
              fontFamily:
                "'JetBrains Mono', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
            }}
          />
        )}
      </div>

      {/* Output or Live Preview */}
      {language === "web" ? (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              Live Preview
            </span>
            <button
              onClick={handleFullscreen}
              className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Fullscreen
            </button>
          </div>
          <iframe
            ref={previewRef}
            srcDoc={webPreview}
            title="Web Live Preview"
            className="w-full h-[400px] border rounded-lg bg-white dark:bg-gray-900"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      ) : (
        output && (
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-inner p-4 mt-2 max-h-60 overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 ">
              Output
            </h3>
            <pre className="p-2 rounded-md text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap overflow-x-auto">
              {output}
            </pre>
          </div>
        )
      )}

      {/* Save dialog/modal */}
      {saveDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-xs">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Save Code
            </h3>
            {language === "web" ? (
              <>
                <div className="mb-2">
                  <label className="block text-sm mb-1">
                    What do you want to save?
                  </label>
                  <select
                    className="w-full p-2 rounded border dark:bg-gray-700 dark:text-gray-100"
                    value={saveTarget}
                    onChange={(e) => setSaveTarget(e.target.value)}
                  >
                    <option value="">Select file(s)</option>
                    <option value="html">HTML only</option>
                    <option value="css">CSS only</option>
                    <option value="js">JS only</option>
                    <option value="zip">All as ZIP</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="block text-sm mb-1">
                    File name (no extension for ZIP):
                  </label>
                  <input
                    className="w-full p-2 rounded border dark:bg-gray-700 dark:text-gray-100"
                    value={saveFileName}
                    onChange={(e) => setSaveFileName(e.target.value)}
                    placeholder={
                      saveTarget === "zip"
                        ? "web-code"
                        : saveTarget === "html"
                          ? "index.html"
                          : saveTarget === "css"
                            ? "style.css"
                            : saveTarget === "js"
                              ? "script.js"
                              : ""
                    }
                  />
                </div>
              </>
            ) : (
              <div className="mb-2">
                <label className="block text-sm mb-1">File name:</label>
                <input
                  className="w-full p-2 rounded border dark:bg-gray-700 dark:text-gray-100"
                  value={saveFileName}
                  onChange={(e) => setSaveFileName(e.target.value)}
                  placeholder={getSuggestedFilename(language)}
                />
              </div>
            )}
            <div className="flex gap-2 mt-4">
              <button
                className="flex-1 px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
                onClick={handleSaveConfirm}
                disabled={language === "web" && !saveTarget}
              >
                Save
              </button>
              <button
                className="flex-1 px-3 py-1 rounded bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-500"
                onClick={() => setSaveDialogOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
