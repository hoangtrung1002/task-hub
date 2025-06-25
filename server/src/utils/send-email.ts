import sgMail from "@sendgrid/mail";
import "dotenv/config";
import { config } from "../config/app.config";

sgMail.setApiKey(config.SEND_GRID_API_KEY);
const fromEmail = config.FROM_EMAIL;

export async function sendEmail(to: string, subject: string, content: string) {
  const msg = {
    to,
    from: fromEmail,
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
