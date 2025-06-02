import { tr } from "date-fns/locale";
import { verify } from "jsonwebtoken";

export default function handler(req, res) {
  const { myTokenName } = req.cookies;

  if (!myTokenName) {
    return res.status(200).json({ message: "No token found" });
  }

  try {
    const user = verify(myTokenName, process.env.JWT_SECRET);
    return res.json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
