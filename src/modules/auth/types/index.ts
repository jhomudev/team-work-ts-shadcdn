import { User as UserPrisma } from 'prisma/prisma-client'

export type User = Omit<UserPrisma , 'password'>