import { UserRole } from "@prisma/client"
import NextAuth, { type DefaultSession } from "next-auth"

export type ExtendedUser = {
  role: UserRole
  username: string
  name: string
  image?: string
} & DefaultSession

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}
