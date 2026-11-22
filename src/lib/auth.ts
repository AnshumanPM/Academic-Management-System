import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import {
  lastLoginMethod,
  admin,
  username,
  oneTap,
  captcha,
} from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createAuthMiddleware, APIError } from "better-auth/api";
import ForgotPasswordEmail from "@/components/emails/reset-password";
import VerifyEmail from "@/components/emails/verify-email";
import { db } from "@/db/drizzle";
import * as schema from "@/db/auth-schema";
import { ac, roleObjects, ROLES } from "@/lib/permissions";
import { sendTelegramMessage, sendEmail } from "@/lib/helper";
import { env } from "cloudflare:workers";

function createAuth() {
  const secret = env?.BETTER_AUTH_SECRET ?? process.env.BETTER_AUTH_SECRET;
  const baseURL = env?.BETTER_AUTH_URL ?? process.env.BETTER_AUTH_URL;

  return betterAuth({
    secret,
    baseURL,
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
      sendResetPassword: async ({ user, url }) => {
        console.log("Reset password URL:", url);
        const html = ForgotPasswordEmail({
          username: user.name,
          resetUrl: url,
          userEmail: user.email,
        });
        await sendEmail({
          to: user.email,
          subject: "Reset your password",
          html,
        });
      },
    },
    emailVerification: {
      sendVerificationEmail: async ({ user, url }) => {
        console.log("Verify email URL:", url);
        const html = VerifyEmail({ username: user.name, verifyUrl: url });
        await sendEmail({
          to: user.email,
          subject: "Verify your email",
          html,
        });
      },
      sendOnSignUp: true,
      autoSignInAfterVerification: true,
    },
    socialProviders: {
      google: {
        clientId: (env?.GOOGLE_CLIENT_ID ??
          process.env.GOOGLE_CLIENT_ID) as string,
        clientSecret: (env?.GOOGLE_CLIENT_SECRET ??
          process.env.GOOGLE_CLIENT_SECRET) as string,
      },
      github: {
        clientId: (env?.GITHUB_CLIENT_ID ??
          process.env.GITHUB_CLIENT_ID) as string,
        clientSecret: (env?.GITHUB_CLIENT_SECRET ??
          process.env.GITHUB_CLIENT_SECRET) as string,
      },
    },
    database: drizzleAdapter(db, {
      provider: "pg",
      schema,
    }),
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 60 * 5,
        strategy: "jwt",
      },
    },
    hooks: {
      before: createAuthMiddleware(async (ctx) => {
        if (ctx.path !== "/sign-up/email") {
          return;
        }
        if (!ctx.body?.email.endsWith("@gmail.com")) {
          throw new APIError("BAD_REQUEST", {
            message: "Email must end with @gmail.com",
          });
        }
      }),
      after: createAuthMiddleware(async (ctx) => {
        if (
          ctx.path.startsWith("/sign-up") ||
          ctx.path.startsWith("/sign-in") ||
          ctx.path.startsWith("/callback")
        ) {
          const newSession = ctx.context.newSession;
          if (newSession) {
            const user = newSession.user;
            const imageLink = user.image
              ? `<a href="${user.image}">Here</a>`
              : "No image";
            const message = `<b>New ${ctx.path.startsWith("/sign-up") ? "Sign Up" : "Sign In"}</b>\n\n<b>Name:</b> ${user.name}\n<b>Email:</b> ${user.email}\n<b>Picture:</b> ${imageLink}`;
            await sendTelegramMessage(message);
          }
        }
      }),
    },
    plugins: [
      admin({
        ac,
        roleObjects,
        defaultRole: ROLES.USER,
        adminRoles: ROLES.ADMIN,
      }),
      username(),
      lastLoginMethod(),
      oneTap(),
      nextCookies(),
      captcha({
        provider: "cloudflare-turnstile",
        secretKey: (env?.TURNSTILE_SECRET_KEY ??
          process.env.TURNSTILE_SECRET_KEY)!,
      }),
    ],
    advanced: {
      database: {
        validateSchema: false,
      },
      ipAddress: {
        ipAddressHeaders: ["cf-connecting-ip", "x-real-ip", "x-forwarded-for"],
        disableIpTracking: false,
      },
      cookiePrefix: "AMS_AUTH",
    },
  });
}

let _auth: ReturnType<typeof createAuth> | null = null;

export function getAuth() {
  if (!_auth) {
    _auth = createAuth();
  }
  return _auth;
}

export const auth = new Proxy({} as ReturnType<typeof createAuth>, {
  get(_target, prop, receiver) {
    const instance = getAuth();
    const value = Reflect.get(instance, prop, receiver);
    if (typeof value === "function") {
      return value.bind(instance);
    }
    return value;
  },
  has(_target, prop) {
    const instance = getAuth();
    return Reflect.has(instance, prop);
  },
});
