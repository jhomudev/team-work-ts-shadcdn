import { UserRole } from "@prisma/client"
import NextAuth, { type DefaultSession } from "next-auth"

export type ExtendedUser = {
  role: UserRole
  username: string
  names?: string
  lastnames?: string
} & DefaultSession

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}
