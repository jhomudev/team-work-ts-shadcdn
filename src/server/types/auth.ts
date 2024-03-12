export type AuthSignInResponse<T = any> = {
  success: true,
  message: string,
  session: T
} | {
  success: false,
  message: string,
  error: string
}