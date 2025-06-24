import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 },
      );
    }

    // In a real application, you would:
    // 1. Add the email to your newsletter service (e.g., Mailchimp, ConvertKit)
    // 2. Store it in your database
    // 3. Send a confirmation email

    // For now, we'll just simulate the process
    console.log(`Newsletter subscription for: ${email}`);

    return NextResponse.json(
      { message: "Successfully subscribed to newsletter!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
