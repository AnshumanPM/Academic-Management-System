type VerifyEmailProps = {
  username: string;
  verifyUrl: string;
};

export function verifyEmail(props: VerifyEmailProps): string {
  const { username, verifyUrl } = props;

  return `<!DOCTYPE html>
<html dir="ltr" lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify your email</title>
</head>
<body style="background-color: #f3f4f6; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <div style="background-color: #ffffff; max-width: 600px; margin: 0 auto; border-radius: 8px; padding: 32px; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);">
    <div style="margin-bottom: 32px; text-align: center;">
      <h1 style="margin: 0 0 8px; font-size: 28px; font-weight: 700; color: #111827;">
        Verify Your Email Address
      </h1>
      <p style="margin: 0; font-size: 16px; color: #4b5563;">
        Complete your registration to get started
      </p>
    </div>

    <div style="margin-bottom: 24px;">
      <p style="margin: 0 0 16px; font-size: 16px; line-height: 24px; color: #374151;">
        Hello, ${username}
      </p>
      <p style="margin: 0 0 24px; font-size: 16px; line-height: 24px; color: #374151;">
        Thanks for signing up! To complete your registration and secure your account, please verify your email address by clicking the button below.
      </p>
    </div>

    <div style="margin-bottom: 32px; text-align: center;">
      <a href="${verifyUrl}" style="display: inline-block; box-sizing: border-box; border-radius: 6px; background-color: #1f2937; padding: 12px 32px; font-size: 16px; font-weight: 500; color: #ffffff; text-decoration: none;">
        Verify Email Address
      </a>
    </div>

    <div style="margin-bottom: 24px;">
      <p style="margin: 0 0 8px; font-size: 14px; line-height: 20px; color: #4b5563;">
        If the button doesn&apos;t work, copy and paste this link into your browser:
      </p>
      <a href="${verifyUrl}" style="font-size: 14px; word-break: break-all; color: #374151;">
        ${verifyUrl}
      </a>
    </div>

    <div style="margin-bottom: 24px; border-radius: 8px; background-color: #f9fafb; padding: 20px;">
      <p style="margin: 0 0 8px; font-size: 14px; line-height: 20px; font-weight: 600; color: #374151;">
        Important Information:
      </p>
      <p style="margin: 0 0 8px; font-size: 14px; line-height: 20px; color: #4b5563;">
        &bull; This verification link will expire in 24 hours
      </p>
      <p style="margin: 0; font-size: 14px; line-height: 20px; color: #4b5563;">
        &bull; If you didn&apos;t create an account, you can safely ignore this email
      </p>
    </div>

    <div>
      <p style="margin: 0; font-size: 14px; line-height: 20px; color: #4b5563;">
        Need help? Contact our support team at
        <a href="mailto:admin@anshumanpm.in" style="color: #374151;">
          admin@anshumanpm.in
        </a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

export default verifyEmail;
