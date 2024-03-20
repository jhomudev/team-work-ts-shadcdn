export const publicRoutes = [
  '/', '/jobs', '/jobs/[id]', '/employers', '/employers/[username]', '/people', '/people/[username]'
]

export const authRoutes = [
  '/auth/login', '/auth/register', '/auth/verify-email', '/auth/forgot-password', '/auth/reset-password', '/auth/error',
]

export const apiAuthPrefix = '/api/auth'

export const DEFAULT_LOGIN_REDIRECT = '/panel/jobs'