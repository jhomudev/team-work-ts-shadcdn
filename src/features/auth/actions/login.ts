'use server'
import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { LoginSchemaType } from "../schemas"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { getUser } from "../services"
import { generateVerificationToken } from "@/server/actions"

export const login = async (credentials: LoginSchemaType) => {
  try {
    const existUser = await getUser({ by: 'email', value: credentials.email })
    if (existUser?.email && !existUser?.emailVerified) {
      await generateVerificationToken(existUser.email)
      return {
        ok: false,
        message: 'Correo no verificado',
        error : 'Verifique su correo para poder iniciar sesión'
      }
    }
    await signIn('credentials', {
      ...credentials,
      redirectTo: DEFAULT_LOGIN_REDIRECT
    })
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.cause?.err instanceof Error) {
        return error.cause.err.message; // return "custom error"
      }
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials';
        default:
          return 'Something went wrong';
      }
    }
    throw error;
  }
}