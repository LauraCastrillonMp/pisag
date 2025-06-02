import db from "../../../lib/db"
import { verifyToken } from "../../../lib/auth-middleware"

export default async function handler(req, res) {
  const { slug } = req.query

  switch (req.method) {
    case "GET":
      return getTopicBySlug(req, res, slug)
    case "PUT":
      return updateTopic(req, res, slug)
    case "DELETE":
      return deleteTopic(req, res, slug)
    default:
      return res.status(405).json({ message: "Method not allowed" })
  }
}

// Get a single information topic by slug
async function getTopicBySlug(req, res, slug) {
  try {
    const [topics] = await db.query(
      `
      SELECT it.*
      FROM information_topics it
      WHERE it.slug = ?
    `,
      [slug],
    )

    if (topics.length === 0) {
      return res.status(404).json({ message: "Topic not found" })
    }

    return res.status(200).json(topics[0])
  } catch (error) {
    console.error("Error fetching information topic:", error)
    return res.status(500).json({ message: "Error fetching information topic" })
  }
}
