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
          return this.executeJavaScript(code);
        case "typescript":
          return this.executeJavaScript(code); // Browser only
        case "python":
          return await this.executePython(code);
        case "java":
          return await this.executeJava(code);
        case "cpp":
        case "c":
          return await this.executeCPlusPlus(code);
        case "php":
          return await this.executePHP(code);
        case "go":
          return await this.executeGo(code);
        case "rust":
          return await this.executeRust(code);
        default:
          return `See the live preview for ${language}`;
      }
    } catch (error) {
      return `Error: ${error instanceof Error ? error.message : String(error)}`;
    }
  }
  private executeJavaScript(code: string): string {
    const output: string[] = [];
    const logs: string[] = [];
    const start = performance.now();

    const customConsole = {
      log: (...args: any[]) => {
        logs.push(
          `console.log(${args
            .map((arg) =>
              typeof arg === "object"
                ? JSON.stringify(arg, null, 2)
                : JSON.stringify(arg),
            )
            .join(", ")})`,
        );
        output.push(
          args
            .map((arg) =>
              typeof arg === "object"
                ? JSON.stringify(arg, null, 2)
                : String(arg),
            )
            .join(" "),
        );
      },
      error: (...args: any[]) => {
        logs.push(
          `console.error(${args.map((arg) => JSON.stringify(arg)).join(", ")})`,
        );
        output.push("ERROR: " + args.map((arg) => String(arg)).join(" "));
      },
      warn: (...args: any[]) => {
        logs.push(
          `console.warn(${args.map((arg) => JSON.stringify(arg)).join(", ")})`,
        );
        output.push("WARNING: " + args.map((arg) => String(arg)).join(" "));
      },
      info: (...args: any[]) => {
        logs.push(
          `console.info(${args.map((arg) => JSON.stringify(arg)).join(", ")})`,
        );
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
          "Note: TypeScript type annotations are stripped during execution.",
        );
      }

      // Advanced TypeScript syntax detection
      const tsFeatures = this.detectTypeScriptFeatures(code);
      if (tsFeatures.length > 0) {
        output.push(`TypeScript features detected: ${tsFeatures.join(", ")}`);
        output.push(
          "Some features may not work in browser JavaScript execution.",
        );
      }

      let func;
      try {
        func = new Function("console", code);
      } catch (err) {
        return this.formatJavaScriptError(err, code);
      }

      try {
        func(customConsole);
      } catch (err) {
        return this.formatJavaScriptError(err, code);
      }

      const end = performance.now();
      const duration = (end - start).toFixed(2);

      let result = "";
      if (logs.length > 0) {
        result += logs.join("\n") + "\n";
      }
      result +=
        output.length > 0
          ? output.join("\n")
          : "Code executed successfully (no output)";
      result += `\n\n---\nExecution stats:\nTime: ${duration} ms`;
      return result;
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
        /Missing initializer in const declaration (.+)/,
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
    return await this.executeWithJudge0(code, 71); // Language ID 71 for Python 3.8.1
  }

  // Handle interactive code that requires input
  // Judge0 API execution method
  private async executeWithJudge0(
    code: string,
    languageId: number,
    stdin?: string,
    expectedOutput?: string,
  ): Promise<string> {
    try {
      // Use only RapidAPI Judge0
      const apiUrl =
        process.env.NEXT_PUBLIC_JUDGE0_API_URL ||
        "https://judge0-ce.p.rapidapi.com";
      const apiKey = process.env.NEXT_PUBLIC_JUDGE0_API_KEY;
      const apiHost =
        process.env.NEXT_PUBLIC_JUDGE0_API_HOST || "judge0-ce.p.rapidapi.com";

      if (!apiKey) {
        return `❌ Configuration Error: Judge0 API key not configured

To fix this:
1. Sign up at https://rapidapi.com/judge0-official/api/judge0-ce
2. Get your API key
3. Add NEXT_PUBLIC_JUDGE0_API_KEY=your_api_key to your .env.local file

Your code:
${code}`;
      }

      // Execute using RapidAPI only
      return await this.tryJudge0Execution(code, languageId, {
        apiUrl,
        apiKey: apiKey || null,
        apiHost,
        isRapidAPI: true,
        stdin,
        expectedOutput,
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes("fetch")) {
        return `❌ Network Error: Unable to connect to Judge0 RapidAPI

Error: ${error.message}

Please check:
1. Your internet connection
2. API key is valid
3. Try again in a few minutes

Your code:
${code}`;
      }
      return `❌ Execution Error: ${error instanceof Error ? error.message : String(error)}`;
    }
  }

  private async tryJudge0Execution(
    code: string,
    languageId: number,
    config: {
      apiUrl: string;
      apiKey: string | null;
      apiHost: string | null;
      isRapidAPI: boolean;
      stdin?: string;
      expectedOutput?: string;
    },
  ): Promise<string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (config.isRapidAPI && config.apiKey && config.apiHost) {
      headers["X-RapidAPI-Key"] = config.apiKey;
      headers["X-RapidAPI-Host"] = config.apiHost;
    }

    // Always use base64 encoding for Judge0
    function toBase64(str: string) {
      if (typeof window !== "undefined" && window.btoa) {
        return window.btoa(unescape(encodeURIComponent(str)));
      } else {
        return Buffer.from(str, "utf-8").toString("base64");
      }
    }

    // Prepare submission payload according to Judge0 API specs
    const submissionData: any = {
      source_code: toBase64(code),
      language_id: languageId,
      stdin: config.stdin ? toBase64(config.stdin) : "",
    };

    // Special handling for Java public class name
    if (languageId === 62) {
      const match = code.match(/public\s+class\s+([A-Za-z_][A-Za-z0-9_]*)/);
      if (match && match[1]) {
        submissionData.file_name = `${match[1]}.java`;
      }
    }

    // Judge0 API execution
    try {
      // Submit code for execution with base64_encoded=true for all requests
      const submitResponse = await fetch(
        `${config.apiUrl}/submissions?base64_encoded=true&wait=true`,
        {
          method: "POST",
          headers,
          body: JSON.stringify(submissionData),
        },
      );

      let result = await submitResponse.json();

      // If only a token is returned, poll for the result
      if (result && result.token && !result.status) {
        let pollCount = 0;
        const maxPolls = 10;
        const pollDelay = 1000; // 1 second
        while (pollCount < maxPolls) {
          await new Promise((res) => setTimeout(res, pollDelay));
          const pollRes = await fetch(
            `${config.apiUrl}/submissions/${result.token}?base64_encoded=true`,
            { headers },
          );
          const pollJson = await pollRes.json();
          if (pollJson.status && typeof pollJson.status.id === "number") {
            result = pollJson;
            break;
          }
          pollCount++;
        }
      }

      // Check for valid Judge0 response
      if (!result || !result.status || typeof result.status.id !== "number") {
        return `❌ Judge0 API Error: Malformed response.\nRaw response: ${JSON.stringify(result, null, 2)}`;
      }

      // Check for compilation or runtime errors
      if (result.status.id !== 3) {
        return this.handleJudge0Error(result, code);
      }

      // Decode and return the output
      return this.decodeJudge0Output(result);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Execution Error: ${error.message}`);
      } else {
        throw new Error(`Execution Error: ${String(error)}`);
      }
    }
  }

  private handleJudge0Error(result: any, code: string): string {
    const errorMessage = result.stderr || result.compile_output || "";

    // Enhanced error messages for Judge0 errors
    if (result.status.id === 5) {
      return `❌ Compilation Error: ${errorMessage}

🔧 Common fixes:
• Check for syntax errors
• Ensure all variables are defined
• Check for missing imports or includes

📝 Your code:
${code}`;
    } else if (result.status.id === 6) {
      return `❌ Runtime Error: ${errorMessage}

🔧 Common reasons:
• Invalid memory access
• Division by zero
• Infinite recursion

📝 Your code:
${code}`;
    } else {
      return `❌ Error: ${errorMessage}

📝 Your code:
${code}`;
    }
  }

  private decodeJudge0Output(result: any): string {
    // Decode base64 output from Judge0 (browser and Node)
    const decodeBase64 = (str: string) => {
      if (!str) return "";
      if (typeof window !== "undefined" && window.atob) {
        try {
          return decodeURIComponent(escape(window.atob(str)));
        } catch {
          return window.atob(str);
        }
      } else if (typeof Buffer !== "undefined") {
        return Buffer.from(str, "base64").toString("utf-8");
      } else {
        return str;
      }
    };

    const output: string[] = [];

    if (result.stdout) {
      output.push("Output:\n" + decodeBase64(result.stdout));
    }

    if (result.stderr) {
      output.push("Errors:\n" + decodeBase64(result.stderr));
    }

    if (result.execution_time) {
      output.push(`\nExecution Time: ${result.execution_time} seconds`);
    }

    if (result.memory) {
      output.push(`Memory Usage: ${result.memory} KB`);
    }

    return output.join("\n");
  }

  // Add stubs for missing language methods if not present
  private async executeJava(code: string): Promise<string> {
    return await this.executeWithJudge0(code, 62);
  }
  private async executeCPlusPlus(code: string): Promise<string> {
    return await this.executeWithJudge0(code, 54);
  }
  private async executeTypeScript(code: string): Promise<string> {
    return await this.executeWithJudge0(code, 74);
  }
  private async executePHP(code: string): Promise<string> {
    return await this.executeWithJudge0(code, 68);
  }
  private async executeGo(code: string): Promise<string> {
    return await this.executeWithJudge0(code, 60);
  }
  private async executeRust(code: string): Promise<string> {
    return await this.executeWithJudge0(code, 73);
  }
}
