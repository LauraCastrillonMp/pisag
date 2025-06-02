export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getImages(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

async function getImage(req, res) {
  try {
    await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=hsZub3VBreA3ADY9scvbbHzpdNfyjcG2pRgdhVSp"
    )
      .then((response) => response.json())
      .then((json) => {
        return res.status(200).json({ images: json });
      });
  } catch (error) {
    console.error("Error fetching images:", error);
    return res.status(500).json({ message: "Error fetching images" });
  }
}

async function getImages(req, res) {
  try {
    await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=hsZub3VBreA3ADY9scvbbHzpdNfyjcG2pRgdhVSp&count=12"
    )
      .then((response) => response.json())
      .then((json) => {
        return res.status(200).json({ images: json });
      });
  } catch (error) {
    console.error("Error fetching images:", error);
    return res.status(500).json({ message: "Error fetching images" });
  }
}