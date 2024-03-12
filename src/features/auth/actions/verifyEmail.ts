'use server'

import db from "@/lib/prisma"
// TODO: Crear una peticion axios y remeplzar esrto
export const verifyEmail = async (userId: string) => { 
  await db.user.update({
    data: {
      emailVerified: new Date()
    }, 
    where: {id: userId}
  })
}