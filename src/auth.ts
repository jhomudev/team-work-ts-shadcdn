import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { verifyEmail } from "./modules/auth/actions";
import db from "./lib/prisma";
import { UserRole } from '@prisma/client';
import { getUser } from './modules/auth/services';


export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account }) {

      if (account?.provider === 'credentials') return true
      if(!user.email) return false
      return true
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
        session.user.name = token.name as string
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