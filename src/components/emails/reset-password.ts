type ForgotPasswordEmailProps = {
  username: string;
  resetUrl: string;
  userEmail: string;
};

export function forgotPasswordEmail(props: ForgotPasswordEmailProps): string {
  const { username, resetUrl, userEmail } = props;

  return `<!DOCTYPE html>
<html dir="ltr" lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset your password</title>
</head>
<body style="background-color: #f3f4f6; padding: 40px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0;">
  <div style="background-color: #ffffff; max-width: 600px; margin: 0 auto; border-radius: 8px; padding: 32px; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);">
    <div style="margin-bottom: 32px; text-align: center;">
      <h1 style="margin: 0 0 8px; font-size: 28px; font-weight: 700; color: #111827;">
        Reset Your Password
      </h1>
      <p style="margin: 0; font-size: 16px; color: #4b5563;">
        We received a request to reset your password
      </p>
    </div>

    <div style="margin-bottom: 24px;">
      <p style="margin: 0 0 16px; font-size: 16px; line-height: 24px; color: #374151;">
        Hello, ${username}
      </p>
      <p style="margin: 0 0 16px; font-size: 16px; line-height: 24px; color: #374151;">
        We received a password reset request for your account associated with <strong>${userEmail}</strong>.
      </p>
      <p style="margin: 0 0 24px; font-size: 16px; line-height: 24px; color: #374151;">
        Click the button below to create a new password. This link will expire in 24 hours for security reasons.
      </p>
    </div>

    <div style="margin-bottom: 32px; text-align: center;">
      <a href="${resetUrl}" style="display: inline-block; box-sizing: border-box; border-radius: 6px; background-color: #1f2937; padding: 12px 32px; font-size: 16px; font-weight: 500; color: #ffffff; text-decoration: none;">
        Reset Password
      </a>
    </div>

    <div style="margin-bottom: 24px;">
      <p style="margin: 0 0 8px; font-size: 14px; line-height: 20px; color: #4b5563;">
        If the button doesn&apos;t work, copy and paste this link into your browser:
      </p>
      <a href="${resetUrl}" style="font-size: 14px; word-break: break-all; color: #374151;">
        ${resetUrl}
      </a>
    </div>

    <div style="margin-bottom: 24px; border-radius: 8px; background-color: #f9fafb; padding: 20px;">
      <p style="margin: 0 0 8px; font-size: 14px; line-height: 20px; font-weight: 600; color: #374151;">
        Security Notice:
      </p>
      <p style="margin: 0 0 8px; font-size: 14px; line-height: 20px; color: #4b5563;">
        &bull; If you didn&apos;t request this password reset, please ignore this email
      </p>
      <p style="margin: 0 0 8px; font-size: 14px; line-height: 20px; color: #4b5563;">
        &bull; This link will expire in 24 hours
      </p>
      <p style="margin: 0; font-size: 14px; line-height: 20px; color: #4b5563;">
        &bull; For security, never share this link with anyone
      </p>
    </div>

    <div style="margin-bottom: 24px;">
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

export default forgotPasswordEmail;
