import jwt from "jsonwebtoken"

export const GenerateToken = (id: string, username: string, email: string, role: string) : string => {
  return jwt.sign({_id: id, username, email, role}, process.env.SECRET_KEY!, {
    expiresIn: '2h'
  })
}