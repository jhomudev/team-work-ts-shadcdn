import { AuthSignInResponse } from "@/server/types"
import axios from "axios"
import { LoginSchemaType } from "../schemas"
//TODO: NO SE USA; ELMINAR

export const getUserByCredentials = async (credentials: LoginSchemaType) => { 
  try {
    const res = await axios.post<AuthSignInResponse>(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, credentials)
    const { data } = res
    return data
  } catch (error) {
    return null
  }
}