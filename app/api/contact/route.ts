import { NextRequest, NextResponse } from "next/server";

// TODO: Implement SMTP email sending here
// This is a placeholder API route
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // TODO: Add SMTP email sending logic here
    // Example:
    // await sendEmail({
    //   to: process.env.CONTACT_EMAIL,
    //   subject: `Contact form submission from ${name}`,
    //   body: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    // });

    // For now, just log the data (remove in production)
    console.log("Contact form submission:", { name, email, message });

    return NextResponse.json(
      { message: "Message received successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

