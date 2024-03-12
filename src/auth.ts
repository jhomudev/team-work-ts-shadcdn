import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { verifyEmail } from "./features/auth/actions";
import db from "./lib/prisma";
import { UserRole } from '@prisma/client';
import { getUser } from './features/auth/services';


export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account }) {

      if (account?.provider === 'credentials') return true

      if(!user.email) return false
      return true
      // const existingUser = await getUser({ by: 'email', value: user.email })
      // // const existingUser = await getUser({ by: 'email', value: user.email })
      
      // const isNoEmailVerified = !existingUser?.emailVerified
      // return !isNoEmailVerified
    },
    async session({session, token}) {
      if (!session.user) return session
      
      if (token.sub) {
        session.user.id = token.sub
      }

      if (token.role) {
        session.user.role = token.role as UserRole
        session.user.username = token.username as string
        session.user.image = token.image as string
        session.user.name = token.name
      }
      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token
      
      const user = await getUser({by: 'id', value: token.sub})
      if(!user) return token

      token.role = user.role
      token.image = user.image
      token.username = user.username
      token.name = user.name

      return token
    }
  },
  events: {
    async linkAccount({ user }) {
      //verify email automatically after link
      //this only works if provider is another than credentials
      user.id  && await verifyEmail(user.id)
    }
  },
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
    error: '/auth/error'
  }
})