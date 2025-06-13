import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { code, language } = await req.json(); // Map language to Judge0 language_id
  const languageMap: Record<string, number> = {
    java: 62, // Java (OpenJDK 17)
    cpp: 54, // C++ (GCC 9.2.0)
    typescript: 74, // TypeScript (3.7.4)
    c: 50, // C (GCC 9.2.0)
    php: 68, // PHP (7.4.1)
    go: 60, // Go (1.13.5)
    rust: 73, // Rust (1.40.0)
  };
  const language_id = languageMap[language];
  if (!language_id)
    return NextResponse.json(
      { error: "Unsupported language" },
      { status: 400 }
    );
  let sourceCode = code;

  // For Java, replace public class name with "Main" to match default filename
  if (language === "java") {
    // Replace any public class declaration with "Main"
    sourceCode = code.replace(/public\s+class\s+\w+/g, "public class Main");
  }

  const body = { source_code: sourceCode, language_id };

  // Send code to Judge0
  const response = await fetch(
    "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": process.env.JUDGE0_API_KEY || "", // Set your RapidAPI key in .env
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      body: JSON.stringify(body),
    }
  );
  const result = await response.json();
  return NextResponse.json(result);
}
