import jwt from "jsonwebtoken"

export const GenerateToken = (id: string, username: string, email: string) : string => {
  return jwt.sign({_id: id, username, email}, process.env.SECRET_KEY!, {
    expiresIn: '2h'
  })
}