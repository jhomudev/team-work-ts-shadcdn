import { z } from "zod";

const envSchema = z.object({
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
  NEXT_PUBLIC_APP_URL: z.string({
    required_error: 'NEXT_PUBLIC_APP_URL is required in .env.local file',
    invalid_type_error: 'NEXT_PUBLIC_APP_URL must be a string'
  }).trim()
    .min(2, 'NEXT_PUBLIC_APP_URL is required in .env.local file'),
  NEXT_PUBLIC_API_URL: z.string({
    required_error: 'NEXT_PUBLIC_API_URL is required in .env.local file',
    invalid_type_error: 'NEXT_PUBLIC_API_URL must be a string'
  }).trim()
    .min(2, 'NEXT_PUBLIC_API_URL is required in .env.local file'),
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
})

export const env = envSchema.parse(process.env)