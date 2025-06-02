import db from "../../../../lib/db"

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getImages(req, res)
    default:
      return res.status(405).json({ message: "Method not allowed" })
  }
}

async function getImages(req, res) {
  try {
    const [images] = await db.query("SELECT * FROM gallery_images")
    return res.status(200).json({ images })
  } catch (error) {
    console.error("Error fetching images:", error)
    return res.status(500).json({ message: "Error fetching images" })
  }
}