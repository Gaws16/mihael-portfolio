import { Resend } from "resend";

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData) {
  const recipientEmail = process.env.CONTACT_EMAIL;

  if (!recipientEmail) {
    throw new Error("CONTACT_EMAIL environment variable is not set");
  }

  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY environment variable is not set");
  }

  // Initialize Resend lazily (only when actually sending an email)
  const resend = new Resend(process.env.RESEND_API_KEY);

  // Use Resend's default development domain (no custom domain verification needed)
  const fromEmail = "onboarding@resend.dev";

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: fromEmail,
      to: recipientEmail,
      replyTo: data.email,
      subject: `New Contact Form Message from ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3B82C6; border-bottom: 2px solid #3B82C6; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0;">
            <p><strong>From:</strong> ${data.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Message:</h3>
            <p style="white-space: pre-wrap; color: #555;">${data.message}</p>
          </div>
          
          <p style="color: #888; font-size: 12px; margin-top: 30px;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `,
      text: `
New Contact Form Submission

From: ${data.name}
Email: ${data.email}

Message:
${data.message}

---
This message was sent from your portfolio contact form.
      `,
    });

    if (error) {
      console.error("Resend API error:", error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    return emailData;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
