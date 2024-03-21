'use server'
import { ApiResponse } from "@/server/types"
import axios from "axios"
import { formatUserFromApi } from "../adapters"
import { env } from "@/lib/env"

type Props = {
  by: 'id' | 'email',
  value: string
}

export const getUser = async ({by = 'id' ,value}: Props) => { 
  try {
    const res = await axios<ApiResponse>(`${env.NEXT_PUBLIC_API_URL}/users/find?by=${by}&value=${value}`)
    const { data } = res
    if (data.ok) {
      return formatUserFromApi(data.data)
    }
  } catch (error) {
    console.log({error})
    return null
  }
}