// Import Pyodide type for Python execution
declare global {
  interface Window {
    loadPyodide: any;
  }
}

export class CodeExecutionService {
  private static instance: CodeExecutionService;
  private pyodide: any = null;
  private pyodideLoading: Promise<any> | null = null;

  public static getInstance(): CodeExecutionService {
    if (!CodeExecutionService.instance) {
      CodeExecutionService.instance = new CodeExecutionService();
    }
    return CodeExecutionService.instance;
  }
  private async loadPyodide(): Promise<any> {
    if (this.pyodide) {
      return this.pyodide;
    }

    if (this.pyodideLoading) {
      return this.pyodideLoading;
    }

    // Only load Pyodide in browser environment
    if (typeof window === "undefined") {
      throw new Error("Pyodide can only be loaded in browser environment");
    }

    this.pyodideLoading = new Promise(async (resolve, reject) => {
      try {
        // Load Pyodide from CDN
        if (!window.loadPyodide) {
          const script = document.createElement("script");
          script.src =
            "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js";
          script.onload = async () => {
            try {
              this.pyodide = await window.loadPyodide({
                indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
              });

              // Install common packages
              await this.pyodide.loadPackage(["numpy", "pandas"]);

              resolve(this.pyodide);
            } catch (error) {
              reject(error);
            }
          };
          script.onerror = reject;
          document.head.appendChild(script);
        } else {
          this.pyodide = await window.loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
          });

          // Install common packages
          await this.pyodide.loadPackage(["numpy", "pandas"]);

          resolve(this.pyodide);
        }
      } catch (error) {
        reject(error);
      }
    });

    return this.pyodideLoading;
  }

  public async executeCode(code: string, language: string): Promise<string> {
    try {
      switch (language) {
        case "javascript":
        case "typescript":
          return this.executeJavaScript(code);
        case "python":
          return await this.executePython(code);
        case "html":
          return this.executeHTML(code);
        case "css":
          return this.executeCSS(code);
        case "json":
          return this.executeJSON(code);
        case "xml":
          return this.executeXML(code);
        case "yaml":
          return this.executeYAML(code);
        case "markdown":
          return this.executeMarkdown(code);
        case "java":
          return this.executeJava(code);
        case "cpp":
        case "c":
          return this.executeCPlusPlus(code);
        case "csharp":
          return this.executeCSharp(code);
        case "php":
          return this.executePHP(code);
        case "ruby":
          return this.executeRuby(code);
        case "go":
          return this.executeGo(code);
        case "rust":
          return this.executeRust(code);
        case "swift":
          return this.executeSwift(code);
        case "kotlin":
          return this.executeKotlin(code);
        case "scala":
          return this.executeScala(code);
        case "sql":
          return this.executeSQL(code);
        case "shell":
          return this.executeShell(code);
        case "powershell":
          return this.executePowerShell(code);
        default:
          return `Code execution for ${language} is not supported yet.`;
      }
    } catch (error) {
      return `Error: ${error instanceof Error ? error.message : String(error)}`;
    }
  }
  private executeJavaScript(code: string): string {
    const output: string[] = [];

    const customConsole = {
      log: (...args: any[]) => {
        output.push(
          args
            .map((arg) =>
              typeof arg === "object"
                ? JSON.stringify(arg, null, 2)
                : String(arg)
            )
            .join(" ")
        );
      },
      error: (...args: any[]) => {
        output.push("ERROR: " + args.map((arg) => String(arg)).join(" "));
      },
      warn: (...args: any[]) => {
        output.push("WARNING: " + args.map((arg) => String(arg)).join(" "));
      },
      info: (...args: any[]) => {
        output.push("INFO: " + args.map((arg) => String(arg)).join(" "));
      },
    };

    try {
      // Enhanced syntax validation
      const syntaxChecks = this.validateJavaScriptSyntax(code);
      if (syntaxChecks.hasErrors) {
        return syntaxChecks.errorMessage;
      }

      // Check for TypeScript-specific syntax that won't work in browser
      if (code.includes(":") && /:\s*\w+\s*=/.test(code)) {
        output.push(
          "🔷 Note: TypeScript type annotations are stripped during execution."
        );
      }

      // Advanced TypeScript syntax detection
      const tsFeatures = this.detectTypeScriptFeatures(code);
      if (tsFeatures.length > 0) {
        output.push(
          `🔷 TypeScript features detected: ${tsFeatures.join(", ")}`
        );
        output.push(
          "🔷 Some features may not work in browser JavaScript execution."
        );
      }

      const func = new Function("console", code);
      func(customConsole);

      return output.length > 0
        ? output.join("\n")
        : "✅ Code executed successfully (no output)";
    } catch (error) {
      return this.formatJavaScriptError(error, code);
    }
  }

  private validateJavaScriptSyntax(code: string): {
    hasErrors: boolean;
    errorMessage: string;
  } {
    // Check for const declaration without initializer
    if (code.includes("const ") && /const\s+\w+\s*;/.test(code)) {
      const match = code.match(/const\s+(\w+)\s*;/);
      const varName = match ? match[1] : "variable";
      return {
        hasErrors: true,
        errorMessage: `❌ JavaScript/TypeScript Error: Missing initializer in const declaration for '${varName}'

🔧 Quick fixes:
• Add a value: const ${varName} = 'your_value';
• Use let instead: let ${varName};
• Use var instead: var ${varName};

📝 Your code:
${code}

💡 Tip: const variables must be initialized when declared.`,
      };
    }

    // Check for missing closing brackets/braces
    const openBraces = (code.match(/\{/g) || []).length;
    const closeBraces = (code.match(/\}/g) || []).length;
    const openParens = (code.match(/\(/g) || []).length;
    const closeParens = (code.match(/\)/g) || []).length;
    const openBrackets = (code.match(/\[/g) || []).length;
    const closeBrackets = (code.match(/\]/g) || []).length;

    if (openBraces !== closeBraces) {
      return {
        hasErrors: true,
        errorMessage: `❌ Syntax Error: Mismatched curly braces { }

🔍 Found: ${openBraces} opening { and ${closeBraces} closing }
🔧 Check your function definitions, if statements, and object literals.

📝 Your code:
${code}`,
      };
    }

    if (openParens !== closeParens) {
      return {
        hasErrors: true,
        errorMessage: `❌ Syntax Error: Mismatched parentheses ( )

🔍 Found: ${openParens} opening ( and ${closeParens} closing )
🔧 Check your function calls and expressions.

📝 Your code:
${code}`,
      };
    }

    if (openBrackets !== closeBrackets) {
      return {
        hasErrors: true,
        errorMessage: `❌ Syntax Error: Mismatched square brackets [ ]

🔍 Found: ${openBrackets} opening [ and ${closeBrackets} closing ]
🔧 Check your array definitions and property access.

📝 Your code:
${code}`,
      };
    }

    return { hasErrors: false, errorMessage: "" };
  }

  private detectTypeScriptFeatures(code: string): string[] {
    const features: string[] = [];

    // Type annotations
    if (
      /:\s*(string|number|boolean|object|any|void|null|undefined)\b/.test(code)
    ) {
      features.push("type annotations");
    }

    // Interfaces
    if (code.includes("interface ")) {
      features.push("interfaces");
    }

    // Enums
    if (code.includes("enum ")) {
      features.push("enums");
    }

    // Generic types
    if (/<[A-Z]\w*>/.test(code)) {
      features.push("generics");
    }

    // Access modifiers
    if (/(public|private|protected)\s+/.test(code)) {
      features.push("access modifiers");
    }

    // Optional parameters
    if (/\w+\?\s*:/.test(code)) {
      features.push("optional parameters");
    }

    return features;
  }

  private formatJavaScriptError(error: any, code: string): string {
    const errorMessage = error instanceof Error ? error.message : String(error);

    // Enhanced error handling for common JavaScript/TypeScript issues
    if (errorMessage.includes("Missing initializer")) {
      const match = errorMessage.match(
        /Missing initializer in const declaration (.+)/
      );
      const context = match ? match[1] : "";
      return `❌ JavaScript/TypeScript Error: Missing initializer in const declaration ${context}

🔧 Common fixes:
• Add a value: const myVar = 'value';
• Use let instead: let myVar;
• Use var instead: var myVar;

📝 Your code:
${code}`;
    } else if (errorMessage.includes("Unexpected token")) {
      return `❌ JavaScript/TypeScript Error: ${errorMessage}

🔍 This might be due to:
• TypeScript syntax that's not supported in browser execution
• Missing semicolons or brackets
• Invalid JavaScript syntax
• Template literal syntax errors

🔧 Try these fixes:
• Check for missing quotes or brackets
• Remove TypeScript-specific syntax for browser execution
• Verify all strings are properly closed

📝 Your code:
${code}`;
    } else if (errorMessage.includes("is not defined")) {
      const match = errorMessage.match(/(\w+) is not defined/);
      const variable = match ? match[1] : "variable";
      return `❌ ReferenceError: ${variable} is not defined

🔍 Possible causes:
• Variable declared after it's used
• Typo in variable name
• Missing import statement
• Variable declared in different scope

🔧 Quick fixes:
• Check spelling: ${variable}
• Declare before use: let ${variable} = ...;
• Check variable scope

📝 Your code:
${code}`;
    } else if (
      errorMessage.includes("Cannot read property") ||
      errorMessage.includes("Cannot read properties")
    ) {
      return `❌ TypeError: ${errorMessage}

🔍 This usually means you're trying to access a property of null/undefined

🔧 Common fixes:
• Check if object exists: if (obj && obj.property)
• Use optional chaining: obj?.property
• Initialize objects properly
• Add null/undefined checks

📝 Your code:
${code}`;
    } else {
      return `❌ JavaScript/TypeScript Error: ${errorMessage}

📝 Your code:
${code}

💡 Need help? Check the browser console for more details.`;
    }
  }

  private async executePython(code: string): Promise<string> {
    try {
      const pyodide = await this.loadPyodide();

      // Capture Python output
      pyodide.runPython(`
import sys
from io import StringIO
import contextlib

@contextlib.contextmanager
def capture_output():
    old_stdout = sys.stdout
    old_stderr = sys.stderr
    stdout = StringIO()
    stderr = StringIO()
    try:
        sys.stdout = stdout
        sys.stderr = stderr
        yield stdout, stderr
    finally:
        sys.stdout = old_stdout
        sys.stderr = old_stderr
      `);

      // Execute the user code and capture output
      const result = pyodide.runPython(`
with capture_output() as (stdout, stderr):
    try:
        exec("""${code.replace(/"/g, '\\"')}""")
        output = stdout.getvalue()
        error = stderr.getvalue()
        if error:
            result = f"Error: {error}"
        elif output:
            result = output
        else:
            result = "Code executed successfully (no output)"
    except Exception as e:
        result = f"Python Error: {str(e)}"
        
result
      `);

      return result || "Code executed successfully (no output)";
    } catch (error) {
      if (error instanceof Error && error.message.includes("Failed to fetch")) {
        return `Python execution failed: Unable to load Pyodide. Please check your internet connection.

Your Python code:
${code}

Note: Python execution requires downloading the Pyodide runtime (~30MB) on first use.`;
      }
      return `Python execution error: ${
        error instanceof Error ? error.message : String(error)
      }`;
    }
  }
  private executeHTML(code: string): string {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(code, "text/html");
      const errors = doc.querySelectorAll("parsererror");

      if (errors.length > 0) {
        return `❌ HTML parsing errors found:
${errors[0].textContent}

Please check your HTML syntax.`;
      }

      // Basic HTML analysis
      const elements = doc.getElementsByTagName("*");
      const tags = Array.from(elements).map((el) => el.tagName.toLowerCase());
      const uniqueTags = [...new Set(tags)];

      // Check for semantic elements
      const semanticTags = [
        "header",
        "nav",
        "main",
        "section",
        "article",
        "aside",
        "footer",
      ];
      const hasSemanticHTML = semanticTags.some((tag) => tags.includes(tag));

      // Check for accessibility features
      const hasAltText = code.includes("alt=");
      const hasAriaLabels = code.includes("aria-");
      const hasFormLabels = code.includes("<label");

      // Create a live preview if possible
      const isCompleteHTML =
        code.includes("<!DOCTYPE html>") && code.includes("<html>");

      let previewHTML = "";
      if (isCompleteHTML) {
        // Create a safe preview
        previewHTML = `

🖼️ Live Preview Available:
You can copy this HTML to a .html file and open it in a browser to see the result.

📋 Copy this code to preview:
${code}`;
      } else {
        // For HTML fragments, wrap them for preview
        previewHTML = `

🖼️ Fragment Preview (wrap in complete HTML):
<!DOCTYPE html>
<html>
<head>
    <title>Preview</title>
    <style>body { font-family: Arial, sans-serif; margin: 20px; }</style>
</head>
<body>
${code}
</body>
</html>`;
      }

      return `✅ HTML is valid!

📊 Document Analysis:
- Total elements: ${elements.length}
- Unique tags: ${uniqueTags.join(", ")}
- Document title: ${doc.title || "No title set"}
- ${hasSemanticHTML ? "✅" : "❌"} Semantic HTML5 elements
- ${hasAltText ? "✅" : "❌"} Image alt attributes
- ${hasAriaLabels ? "✅" : "❌"} ARIA accessibility labels
- ${hasFormLabels ? "✅" : "❌"} Form labels

💡 Accessibility Score: ${
        [hasAltText, hasAriaLabels, hasFormLabels].filter(Boolean).length
      }/3${previewHTML}`;
    } catch (error) {
      return `❌ HTML validation error: ${
        error instanceof Error ? error.message : String(error)
      }`;
    }
  }

  private executeCSS(code: string): string {
    try {
      // Basic CSS validation by creating a style element
      const style = document.createElement("style");
      style.textContent = code;
      document.head.appendChild(style);

      // Check if CSS rules were parsed
      const rules = style.sheet?.cssRules || [];
      document.head.removeChild(style);

      // Analyze CSS
      const selectors: string[] = [];
      const properties: string[] = [];
      let mediaQueries = 0;
      let keyframes = 0;

      Array.from(rules).forEach((rule) => {
        if (rule instanceof CSSStyleRule) {
          selectors.push(rule.selectorText);
          Array.from(rule.style).forEach((prop) => {
            if (!properties.includes(prop)) {
              properties.push(prop);
            }
          });
        } else if (rule instanceof CSSMediaRule) {
          mediaQueries++;
        } else if (rule instanceof CSSKeyframesRule) {
          keyframes++;
        }
      });

      // Check for modern CSS features
      const hasFlexbox =
        code.includes("display: flex") || code.includes("display:flex");
      const hasGrid =
        code.includes("display: grid") || code.includes("display:grid");
      const hasCustomProps = code.includes("--") && code.includes("var(");
      const hasAnimations =
        code.includes("@keyframes") || code.includes("animation:");

      // Create a demo preview
      const demoHTML = `

🎨 CSS Preview Demo:
To see your styles in action, create an HTML file with:

<!DOCTYPE html>
<html>
<head>
    <style>
${code}
    </style>
</head>
<body>
    <div class="demo-content">
        <h1>Demo Heading</h1>
        <p>Sample paragraph text to show your styling.</p>
        <button>Sample Button</button>
        <div class="box">Sample Box</div>
    </div>
</body>
</html>`;

      return `✅ CSS is valid!

📊 CSS Analysis:
- Rules parsed: ${rules.length}
- Selectors: ${selectors.length} (${selectors.slice(0, 5).join(", ")}${
        selectors.length > 5 ? "..." : ""
      })
- Properties used: ${properties.length} (${properties.slice(0, 8).join(", ")}${
        properties.length > 8 ? "..." : ""
      })
- Media queries: ${mediaQueries}
- Animations/Keyframes: ${keyframes}

🚀 Modern CSS Features:
- ${hasFlexbox ? "✅" : "❌"} Flexbox layout
- ${hasGrid ? "✅" : "❌"} CSS Grid layout  
- ${hasCustomProps ? "✅" : "❌"} CSS Custom Properties
- ${hasAnimations ? "✅" : "❌"} CSS Animations

💡 CSS Quality Score: ${
        [hasFlexbox, hasGrid, hasCustomProps, hasAnimations].filter(Boolean)
          .length
      }/4${demoHTML}`;
    } catch (error) {
      return `❌ CSS validation error: ${
        error instanceof Error ? error.message : String(error)
      }`;
    }
  }

  private executeJSON(code: string): string {
    try {
      const parsed = JSON.parse(code);

      const analyze = (obj: any, depth = 0): string => {
        if (depth > 3) return "[Too deep to analyze]";

        if (Array.isArray(obj)) {
          return `Array(${obj.length})`;
        } else if (obj && typeof obj === "object") {
          const keys = Object.keys(obj);
          return `Object{${keys.slice(0, 5).join(", ")}${
            keys.length > 5 ? "..." : ""
          }}`;
        } else {
          return `${typeof obj}: ${obj}`;
        }
      };

      return `JSON is valid! ✅

Parsed object:
${JSON.stringify(parsed, null, 2)}

Analysis:
- Type: ${Array.isArray(parsed) ? "Array" : typeof parsed}
- ${
        Array.isArray(parsed)
          ? `Length: ${parsed.length}`
          : `Keys: ${Object.keys(parsed).length}`
      }
- Structure: ${analyze(parsed)}`;
    } catch (error) {
      return `JSON parsing error: ${
        error instanceof Error ? error.message : String(error)
      }

Tip: Check for:
- Missing quotes around strings
- Trailing commas
- Unescaped quotes in strings`;
    }
  }

  private executeXML(code: string): string {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(code, "text/xml");
      const errors = doc.querySelectorAll("parsererror");

      if (errors.length > 0) {
        return `XML parsing errors found:
${errors[0].textContent}`;
      }

      const elements = doc.getElementsByTagName("*");
      const rootElement = doc.documentElement;

      return `XML is valid! ✅

Document Analysis:
- Root element: ${rootElement?.tagName || "None"}
- Total elements: ${elements.length}
- Namespaces: ${rootElement?.namespaceURI ? "Present" : "None"}

XML structure is well-formed and ready to use!`;
    } catch (error) {
      return `XML validation error: ${
        error instanceof Error ? error.message : String(error)
      }`;
    }
  }

  private executeYAML(code: string): string {
    try {
      // Basic YAML validation (simplified)
      const lines = code.split("\n");
      let indentationValid = true;
      let currentIndent = 0;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim() === "") continue;

        const indent = line.length - line.trimStart().length;
        if (indent % 2 !== 0) {
          indentationValid = false;
          break;
        }
      }

      if (!indentationValid) {
        return "YAML validation warning: Inconsistent indentation detected (should be 2 spaces)";
      }

      return `YAML appears valid! ✅

Document Analysis:
- Lines: ${lines.filter((l) => l.trim()).length}
- Structure: ${
        code.includes(":") ? "Key-value pairs detected" : "List format detected"
      }

Note: This is a basic validation. For full YAML parsing, consider using a backend service.`;
    } catch (error) {
      return `YAML validation error: ${
        error instanceof Error ? error.message : String(error)
      }`;
    }
  }

  private executeMarkdown(code: string): string {
    const lines = code.split("\n");
    const analysis = {
      headers: lines.filter((l) => l.trim().startsWith("#")).length,
      links: (code.match(/\[.*?\]\(.*?\)/g) || []).length,
      images: (code.match(/!\[.*?\]\(.*?\)/g) || []).length,
      codeBlocks: (code.match(/```/g) || []).length / 2,
      emphasis: (code.match(/\*.*?\*|_.*?_/g) || []).length,
      lists: lines.filter((l) => l.trim().match(/^[-*+]\s/)).length,
    };

    return `Markdown analyzed! ✅

Content Analysis:
- Headers: ${analysis.headers}
- Links: ${analysis.links}
- Images: ${analysis.images}
- Code blocks: ${Math.floor(analysis.codeBlocks)}
- Emphasized text: ${analysis.emphasis}
- List items: ${analysis.lists}
- Total lines: ${lines.length}

Your Markdown is ready for rendering!`;
  }
  // Compiled language implementations (information only)
  private executeJava(code: string): string {
    // Analyze the Java code structure
    const hasClass = code.includes("public class");
    const hasMain = code.includes("public static void main");
    const hasOutput =
      code.includes("System.out.println") || code.includes("System.out.print");
    const hasImports = code.includes("import ");
    const hasPackage = code.includes("package ");

    // Extract class name if present
    const classMatch = code.match(/public\s+class\s+(\w+)/);
    const className = classMatch ? classMatch[1] : "Unknown";

    return `☕ Java Analysis Complete

📁 Your Java Code:
${code}

🔍 Code Analysis:
- ${hasClass ? "✅" : "❌"} Class definition ${hasClass ? `(${className})` : ""}
- ${hasMain ? "✅" : "❌"} Main method ${
      hasMain ? "(Entry point found)" : "(No entry point)"
    }
- ${hasOutput ? "✅" : "❌"} Output statements ${
      hasOutput ? "(Console output ready)" : ""
    }
- ${hasImports ? "✅" : "❌"} Import statements ${
      hasImports ? "(External libraries used)" : ""
    }
- ${hasPackage ? "✅" : "❌"} Package declaration ${
      hasPackage ? "(Organized structure)" : ""
    }

🚀 To Execute Java Code:
1. 📦 Java Development Kit (JDK 8+)
2. 🔧 Compilation: javac ${className}.java
3. ▶️ Execution: java ${className}
4. 🌐 Online alternatives: 
   • repl.it/languages/java
   • onlinegdb.com/online_java_compiler
   • tutorialspoint.com/compile_java_online.php

💡 Quick Setup Guide:
• Download OpenJDK or Oracle JDK
• Set JAVA_HOME environment variable
• Add Java bin directory to PATH
• Compile with: javac YourFile.java
• Run with: java YourClass

${
  hasClass && hasMain
    ? "✅ Your code structure looks ready for compilation!"
    : "⚠️ Make sure you have a public class with a main method."
}`;
  }
  private executeCPlusPlus(code: string): string {
    // Analyze the C++ code structure
    const hasIncludes = code.includes("#include");
    const hasMain = code.includes("int main") || code.includes("void main");
    const hasOutput =
      code.includes("std::cout") ||
      code.includes("cout") ||
      code.includes("printf");
    const hasNamespace =
      code.includes("using namespace") || code.includes("std::");
    const hasClasses = code.includes("class ") || code.includes("struct ");
    const hasFunctions = code.match(/\w+\s+\w+\s*\([^)]*\)\s*\{/) !== null;

    // Extract includes
    const includeMatches = code.match(/#include\s*[<"]\w+\.?\w*[>"]/g) || [];
    const includes = includeMatches.map((inc) =>
      inc.replace(/#include\s*[<"]/, "").replace(/[>"].*/, "")
    );

    return `⚡ C++ Analysis Complete

📁 Your C++ Code:
${code}

🔍 Code Analysis:
- ${hasIncludes ? "✅" : "❌"} Include statements ${
      hasIncludes ? `(${includes.join(", ")})` : ""
    }
- ${hasMain ? "✅" : "❌"} Main function ${
      hasMain ? "(Entry point found)" : "(No entry point)"
    }
- ${hasOutput ? "✅" : "❌"} Output statements ${
      hasOutput ? "(Console output ready)" : ""
    }
- ${hasNamespace ? "✅" : "❌"} Standard namespace ${
      hasNamespace ? "(std namespace used)" : ""
    }
- ${hasClasses ? "✅" : "❌"} Classes/Structs ${
      hasClasses ? "(OOP detected)" : ""
    }
- ${hasFunctions ? "✅" : "❌"} Custom functions ${
      hasFunctions ? "(Functions defined)" : ""
    }

🛠️ Compilation Options:
1. 🔧 GCC: g++ -o program program.cpp
2. 🔧 Clang: clang++ -o program program.cpp  
3. 🔧 MSVC: cl program.cpp
4. 🌐 Online compilers:
   • repl.it/languages/cpp
   • onlinegdb.com/online_c++_compiler
   • coliru.stacked-crooked.com

🚀 Quick Setup Guide:
• Windows: Install MinGW-w64 or Visual Studio
• Linux: sudo apt install g++ (Ubuntu/Debian)
• macOS: xcode-select --install
• Compile: g++ -std=c++17 -o myprogram myfile.cpp
• Run: ./myprogram (Linux/Mac) or myprogram.exe (Windows)

💡 Compilation flags you might need:
• -std=c++17 (for modern C++ features)
• -Wall (enable all warnings)
• -O2 (optimization)
• -g (debug information)

${
  hasMain && hasOutput
    ? "✅ Your code structure looks ready for compilation!"
    : "⚠️ Make sure you have a main function and output statements."
}`;
  }

  private executeCSharp(code: string): string {
    return `C# compilation and execution requires a backend service.

Your C# code:
${code}

To run C# code, you would need:
1. .NET compiler and runtime
2. A backend service that can compile and execute C#
3. Or use an online C# compiler service

Features detected in your code:
- ${code.includes("using") ? "✅ Using statements" : "❌ No using statements"}
- ${code.includes("class") ? "✅ Class definition" : "❌ No class definition"}
- ${code.includes("static void Main") ? "✅ Main method" : "❌ No main method"}
- ${
      code.includes("Console.WriteLine")
        ? "✅ Output statements"
        : "❌ No output statements"
    }`;
  }

  private executePHP(code: string): string {
    return `PHP execution requires a backend service with PHP interpreter.

Your PHP code:
${code}

To run PHP code, you would need:
1. PHP interpreter
2. A backend service that can execute PHP
3. Or use an online PHP runner service

Features detected in your code:
- ${code.includes("<?php") ? "✅ PHP opening tag" : "❌ No PHP opening tag"}
- ${
      code.includes("echo") || code.includes("print")
        ? "✅ Output statements"
        : "❌ No output statements"
    }
- ${
      code.includes("function")
        ? "✅ Function definitions"
        : "❌ No function definitions"
    }`;
  }

  private executeRuby(code: string): string {
    return `Ruby execution requires a backend service with Ruby interpreter.

Your Ruby code:
${code}

To run Ruby code, you would need:
1. Ruby interpreter
2. A backend service that can execute Ruby
3. Or use an online Ruby runner service

Features detected in your code:
- ${
      code.includes("puts") || code.includes("print")
        ? "✅ Output statements"
        : "❌ No output statements"
    }
- ${
      code.includes("def ")
        ? "✅ Method definitions"
        : "❌ No method definitions"
    }
- ${
      code.includes("class ")
        ? "✅ Class definitions"
        : "❌ No class definitions"
    }`;
  }

  private executeGo(code: string): string {
    return `Go compilation and execution requires a backend service.

Your Go code:
${code}

To run Go code, you would need:
1. Go compiler and runtime
2. A backend service that can compile and execute Go
3. Or use an online Go playground

Features detected in your code:
- ${code.includes("package main") ? "✅ Main package" : "❌ No main package"}
- ${
      code.includes("import")
        ? "✅ Import statements"
        : "❌ No import statements"
    }
- ${code.includes("func main") ? "✅ Main function" : "❌ No main function"}
- ${
      code.includes("fmt.Print")
        ? "✅ Output statements"
        : "❌ No output statements"
    }`;
  }

  private executeRust(code: string): string {
    return `Rust compilation and execution requires a backend service.

Your Rust code:
${code}

To run Rust code, you would need:
1. Rust compiler (rustc) and cargo
2. A backend service that can compile and execute Rust
3. Or use an online Rust playground

Features detected in your code:
- ${code.includes("fn main") ? "✅ Main function" : "❌ No main function"}
- ${code.includes("println!") ? "✅ Print macro" : "❌ No print macro"}
- ${code.includes("use ") ? "✅ Use statements" : "❌ No use statements"}`;
  }

  private executeSwift(code: string): string {
    return `Swift compilation and execution requires a backend service.

Your Swift code:
${code}

To run Swift code, you would need:
1. Swift compiler and runtime
2. A backend service that can compile and execute Swift
3. Or use an online Swift playground

Features detected in your code:
- ${
      code.includes("import")
        ? "✅ Import statements"
        : "❌ No import statements"
    }
- ${code.includes("print(") ? "✅ Print statements" : "❌ No print statements"}
- ${
      code.includes("func ")
        ? "✅ Function definitions"
        : "❌ No function definitions"
    }`;
  }

  private executeKotlin(code: string): string {
    return `Kotlin compilation and execution requires a backend service.

Your Kotlin code:
${code}

To run Kotlin code, you would need:
1. Kotlin compiler and JVM
2. A backend service that can compile and execute Kotlin
3. Or use an online Kotlin playground

Features detected in your code:
- ${code.includes("fun main") ? "✅ Main function" : "❌ No main function"}
- ${
      code.includes("println(")
        ? "✅ Print statements"
        : "❌ No print statements"
    }
- ${
      code.includes("import ")
        ? "✅ Import statements"
        : "❌ No import statements"
    }`;
  }

  private executeScala(code: string): string {
    return `Scala compilation and execution requires a backend service.

Your Scala code:
${code}

To run Scala code, you would need:
1. Scala compiler and JVM
2. A backend service that can compile and execute Scala
3. Or use an online Scala playground

Features detected in your code:
- ${
      code.includes("object") && code.includes("extends App")
        ? "✅ App object"
        : "❌ No App object"
    }
- ${code.includes("def main") ? "✅ Main method" : "❌ No main method"}
- ${
      code.includes("println(")
        ? "✅ Print statements"
        : "❌ No print statements"
    }`;
  }

  private executeSQL(code: string): string {
    return `SQL execution requires a database connection and backend service.

Your SQL code:
${code}

To run SQL code, you would need:
1. Database server (MySQL, PostgreSQL, SQLite, etc.)
2. A backend service that can execute SQL queries
3. Or use an online SQL runner with sample data

Query type detected:
- ${
      code.toUpperCase().includes("SELECT")
        ? "✅ SELECT query"
        : "❌ No SELECT query"
    }
- ${
      code.toUpperCase().includes("INSERT")
        ? "✅ INSERT query"
        : "❌ No INSERT query"
    }
- ${
      code.toUpperCase().includes("UPDATE")
        ? "✅ UPDATE query"
        : "❌ No UPDATE query"
    }
- ${
      code.toUpperCase().includes("DELETE")
        ? "✅ DELETE query"
        : "❌ No DELETE query"
    }
- ${
      code.toUpperCase().includes("CREATE")
        ? "✅ CREATE statement"
        : "❌ No CREATE statement"
    }`;
  }

  private executeShell(code: string): string {
    return `Shell script execution requires a backend service with shell access.

Your Shell script:
${code}

To run shell scripts, you would need:
1. Shell environment (bash, zsh, etc.)
2. A backend service that can execute shell commands safely
3. Proper security measures for command execution

Commands detected:
- ${code.includes("echo") ? "✅ Echo commands" : "❌ No echo commands"}
- ${code.includes("ls") ? "✅ List commands" : "❌ No list commands"}
- ${
      code.includes("cd")
        ? "✅ Directory navigation"
        : "❌ No directory navigation"
    }
- ${code.includes("|") ? "✅ Pipes" : "❌ No pipes"}`;
  }

  private executePowerShell(code: string): string {
    return `PowerShell execution requires a backend service with PowerShell access.

Your PowerShell script:
${code}

To run PowerShell scripts, you would need:
1. PowerShell environment
2. A backend service that can execute PowerShell safely
3. Proper security measures for script execution

Features detected:
- ${
      code.includes("Write-Host") || code.includes("Write-Output")
        ? "✅ Output commands"
        : "❌ No output commands"
    }
- ${code.includes("Get-") ? "✅ Get cmdlets" : "❌ No Get cmdlets"}
- ${code.includes("Set-") ? "✅ Set cmdlets" : "❌ No Set cmdlets"}
- ${code.includes("|") ? "✅ Pipeline" : "❌ No pipeline"}`;
  }
}
