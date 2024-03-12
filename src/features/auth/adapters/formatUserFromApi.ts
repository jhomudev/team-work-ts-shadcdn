import { User } from "../types";

export const formatUserFromApi = (data: any): User => {
  return {
    id: data.id,
    name: data.name,
    username: data.username,
    email: data.email,
    emailVerified: data.emailVerified,
    image: data.image,
    role: data.role,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    description: data.description
  }
}