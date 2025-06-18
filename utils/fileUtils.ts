// File utilities for code editor
export function saveCodeToFile(code: string, filename: string): void {
  try {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error saving file:", error);
  }
}

export function getSuggestedFilename(language: string): string {
  const extensions: Record<string, string> = {
    python: ".py",
    java: ".java",
    c: ".c",
    cpp: ".cpp",
    typescript: ".ts",
    php: ".php",
    go: ".go",
    rust: ".rs",
    javascript: ".js",
    web: ".html", // default for web, but handled specially in UI
  };

  const extension = extensions[language] || ".txt";
  const timestamp = new Date().toISOString().slice(0, 16).replace(/:/g, "-");
  return `code-${timestamp}${extension}`;
}
