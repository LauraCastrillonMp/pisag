import { serialize } from "cookie";
import { verify } from "jsonwebtoken";

export default function handler(req, res) {
  // if (req.method !== "POST") {
  //   return res.status(405).json({ message: "Method not allowed" })
  // }

  // // Clear the auth cookie
  // res.setHeader(
  //   "Set-Cookie",
  //   cookie.serialize("auth_token", "", {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV !== "development",
  //     expires: new Date(0),
  //     sameSite: "strict",
  //     path: "/",
  //   }),
  // )

  // return res.status(200).json({ message: "Logged out successfully" })
  const { auth_token } = req.cookies;

  if (!auth_token) {
    return res.status(200).json({ message: "No token found" });
  }

  try {
    verify(auth_token, process.env.JWT_SECRET);
    const serialized = serialize("auth_token", null, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0, 
      path: "/",
    });

    res.setHeader('Set-Cookie', serialized);
    return res.status(200).json({ message: "Logout successful" })
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
