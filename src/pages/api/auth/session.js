import { verify } from "jsonwebtoken"

export default function handler(req, res) {
  const { auth_token } = req.cookies

  if (!auth_token) {
    return res.status(200).json({ user: null })
  }

  try {
    const user = verify(auth_token, process.env.JWT_SECRET)
    return res.status(200).json({ user })
  } catch (error) {
    return res.status(200).json({ user: null })
  }
} 