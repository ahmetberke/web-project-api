import { User } from "@prisma/client";

export const UserToUserDTO = (user : User) => {
  return {
    username: user.username,
    email: user.email,
    fullname: user.fullname,
    role: user.role,
    createdAt: user.createdAt,
    deletedAt: user.deletedAt,
    updatedAt: user.updatedAt
  }
}