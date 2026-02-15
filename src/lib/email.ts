import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(to: string, name: string) {
     //console.log("Sending email to:", to);

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
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
    //console.log("API KEY:", process.env.RESEND_API_KEY);

    //console.log("Resend response : ", data)
    return data;
  } catch (error) {
    console.error("Email send error:", error);
    throw error;
  }
}
