/**
 * Alternative SMTP email implementation using Nodemailer
 * 
 * To use this instead of Resend:
 * 1. Install nodemailer: npm install nodemailer @types/nodemailer
 * 2. Replace the import in app/api/contact/route.ts from "@/lib/email" to "@/lib/email-smtp"
 * 3. Set up your SMTP environment variables (see env.example)
 */

import nodemailer from "nodemailer";
import type { ContactFormData } from "./email";

export async function sendContactEmail(data: ContactFormData) {
  const recipientEmail = process.env.CONTACT_EMAIL;
  
  if (!recipientEmail) {
    throw new Error("CONTACT_EMAIL environment variable is not set");
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || "587");
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;

  if (!smtpHost || !smtpUser || !smtpPassword) {
    throw new Error("SMTP configuration is incomplete. Check your environment variables.");
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // true for 465, false for other ports
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
  });

  // Send email
  try {
    const info = await transporter.sendMail({
      from: `"Portfolio Contact Form" <${smtpUser}>`,
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

    return info;
  } catch (error) {
    console.error("Error sending email via SMTP:", error);
    throw error;
  }
}

