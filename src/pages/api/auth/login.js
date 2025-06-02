import { serialize } from "cookie"
import db from "../../../lib/db"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" })
  }

  try {
    // Check if user exists
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email])
    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" })
    }

    // Check if password is correct using bcrypt
    const user = users[0]
    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        return res.status(401).json({ message: "Invalid email or password" })
      }
    })

    // Generate JWT token
    const token = jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "30d" })

    const serialized = serialize('auth_token', token, {
      httpOnly: true, // Only displays in HTTP requests(development only)
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })

    res.setHeader('Set-Cookie', serialized);
    return res.status(200).json({ message: "Login successful" })
  } catch (error) {
    console.error("Login error:", error)
    return res.status(500).json({ message: "Error in Login..." })
  }

  
}