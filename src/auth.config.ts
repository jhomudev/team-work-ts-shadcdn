import type { NextAuthConfig } from "next-auth"
import Credentials from 'next-auth/providers/credentials'
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import axios from 'axios'
import { AuthSignInResponse } from "./server/types"
import { loginSchema } from "./server/schemas"
import { env } from "./lib/env"


const authConfig = {
  providers: [
    Credentials({
    async authorize(credentials) {
      const validateFields = loginSchema.safeParse(credentials)
      if (validateFields.success) {
        const res = await axios.post<AuthSignInResponse>(`${env.NEXT_PUBLIC_API_URL}/auth/login`, credentials)
        const { data: auth } = res
  
        if (auth.success) return auth.session
        return null
      }

      return null
    },
  }),
    Github({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthConfig

export default authConfig