import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function login(email: string, password: string) {

  const token = jwt.sign(
    { email },
    process.env.JWT_SECRET || "quelora-secret",
    {
      expiresIn: "7d"
    }
  )

  return token
}
