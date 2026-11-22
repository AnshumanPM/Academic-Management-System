import { env } from "cloudflare:workers";

export async function sendTelegramMessage(
  text: string,
  chatId: string = "-1002250964229",
) {
  const botToken = env?.TELEGRAM_BOT_TOKEN ?? process.env.TELEGRAM_BOT_TOKEN;

  if (!botToken) {
    console.error("TELEGRAM_BOT_TOKEN is not set in environment variables");
    return;
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Failed to send Telegram message:", error);
    }
  } catch (error) {
    console.error("Error sending Telegram message:", error);
  }
}

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string | string[];
  subject: string;
  html: string;
}) {
  const apiKey =
    env?.RESEND_API_KEY ?? process.env.RESEND_API_KEY ?? "re_dummy";
  const emailSenderName =
    env?.EMAIL_SENDER_NAME ?? process.env.EMAIL_SENDER_NAME;
  const emailSenderAddress =
    env?.EMAIL_SENDER_ADDRESS ?? process.env.EMAIL_SENDER_ADDRESS;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${emailSenderName} <${emailSenderAddress}>`,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Failed to send email via Resend API:", response.status, error);
    }
  } catch (error) {
    console.error("Error sending email via Resend API:", error);
  }
}
