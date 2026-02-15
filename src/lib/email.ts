import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(to: string, name: string) {
  try {
    const data = await resend.emails.send({
      from: "Memora@gmail.com",
      to,
      subject: "Welcome to Memora",
      html: `
        <div style="font-family: sans-serif;">
          <h2>Welcome, ${name}!</h2>
          <p>Your account has been successfully created.</p>
          <p>Start creating and sharing memories with your group.</p>
        </div>
      `,
    });

    return data;
  } catch (error) {
    console.error("Email send error:", error);
    throw error;
  }
}
