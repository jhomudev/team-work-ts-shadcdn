import { env } from "@/lib/env"
import { ApiResponse } from "@/server/types"
import axios from "axios"

export const verifyEmailByToken = async (token: string) => { 
  try {
    const res = await axios.post<ApiResponse>(`${env.NEXT_PUBLIC_API_URL}/auth/verify-email`, { token })
    const { data } = res
    return data
  } catch (error) {
    return null
  }
}
