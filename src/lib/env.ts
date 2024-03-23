import { z } from "zod"
import { createEnv } from "@t3-oss/env-nextjs"

export const env = createEnv({
  server: {
    GITHUB_CLIENT_ID: z.string({
      required_error: 'GITHUB_CLIENT_ID is required in .env.local file',
      invalid_type_error: 'GITHUB_CLIENT_ID must be a string'
    }).trim()
      .min(2, 'GITHUB_CLIENT_ID is required in .env.local file'),
    GITHUB_CLIENT_SECRET: z.string({
      required_error: 'GITHUB_CLIENT_SECRET is required in .env.local file',
      invalid_type_error: 'GITHUB_CLIENT_SECRET must be a string'
    }).trim()
      .min(2, 'GITHUB_CLIENT_SECRET is required in .env.local file'),
    GOOGLE_CLIENT_ID: z.string({
      required_error: 'GOOGLE_CLIENT_ID is required in .env.local file',
      invalid_type_error: 'GOOGLE_CLIENT_ID must be a string'
    }).trim()
      .min(2, 'GOOGLE_CLIENT_ID is required in .env.local file'),
    GOOGLE_CLIENT_SECRET: z.string({
      required_error: 'GOOGLE_CLIENT_SECRET is required in .env.local file',
      invalid_type_error: 'GOOGLE_CLIENT_SECRET must be a string'
    }).trim()
      .min(2, 'GOOGLE_CLIENT_SECRET is required in .env.local file'),
      NEXTAUTH_SECRET: z.string({
        required_error: 'NEXTAUTH_SECRET is required in .env.local file',
        invalid_type_error: 'NEXTAUTH_SECRET must be a string'
      }).trim()
        .min(2, 'NEXTAUTH_SECRET is required in .env.local file'),
      RESEND_API_KEY: z.string({
        required_error: 'RESEND_API_KEY is required in .env.local file',
        invalid_type_error: 'RESEND_API_KEY must be a string'
      }).trim()
        .min(2, 'RESEND_API_KEY is required in .env.local file'),
      RESEND_DOMAIN: z.string({
        required_error: 'RESEND_DOMAIN is required in .env.local file',
        invalid_type_error: 'RESEND_DOMAIN must be a string'
      }).trim()
        .min(2, 'RESEND_DOMAIN is required in .env.local file'),
      RESEND_GENERAL_AUDIENCE_ID: z.string({
        required_error: 'RESEND_GENERAL_AUDIENCE_ID is required in .env.local file',
        invalid_type_error: 'RESEND_GENERAL_AUDIENCE_ID must be a string'
      }).trim()
        .min(2, 'RESEND_GENERAL_AUDIENCE_ID is required in .env.local file'),
      DATABASE_URL: z.string({
        required_error: 'DATABASE_URL is required in .env file',
        invalid_type_error: 'DATABASE_URL must be a string'
      }).trim()
        .min(2, 'DATABASE_URL is required in .env file'),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string({
      required_error: 'NEXT_PUBLIC_APP_URL is required in .env.local file',
      invalid_type_error: 'NEXT_PUBLIC_APP_URL must be a string'
    }).url('NEXT_PUBLIC_API_URL must be a valid URL'),
    NEXT_PUBLIC_API_URL: z.string({
      required_error: 'NEXT_PUBLIC_API_URL is required in .env.local file',
      invalid_type_error: 'NEXT_PUBLIC_API_URL must be a string'
    }).url('NEXT_PUBLIC_API_URL must be a valid URL'),
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  // runtimeEnv: {
  //   DATABASE_URL: process.env.DATABASE_URL,
  //   OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY,
  //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  // },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  }
});
