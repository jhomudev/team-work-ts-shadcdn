import { ApiResponse } from "@/server/types"
import axios from "axios"

export const registerUser = async (input: any) => { 
  try {
    const res = await axios.post<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, input)
    const { data } = res
    return data
  } catch (error) {
    return null
  }
}
