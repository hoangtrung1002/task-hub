import sgMail from "@sendgrid/mail";
import "dotenv/config";
import { config } from "../config/app.config";

sgMail.setApiKey(config.SEND_GRID_API_KEY);
const fromEmail = config.FROM_EMAIL;

export async function sendEmail(to: string, verificationToken: string) {
  const verificationLink = `${config.FRONTEND_URL}/verify-email?token=${verificationToken}`;
  const content = `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`;
  const subject = "Email Verification";
  const msg = {
    to,
    from: `TaskHub <${fromEmail}>`,
    subject,
    html: content,
  };
  try {
    await sgMail.send(msg);
    console.log(`Email sent to successfully`);
    return true;
  } catch (error) {
    console.error(`Failed to send email: ${error}`);
    return false;
  }
}
