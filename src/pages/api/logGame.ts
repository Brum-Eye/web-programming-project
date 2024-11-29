import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../lib/mongodb";
import Game from "../../models/Game";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === "POST") {
    const { title, photo, stars, review } = req.body;

    try {
      // Ensure required fields are provided
      if (!title || !photo || !stars || !review) {
        return res.status(400).json({ message: "All fields are required." });
      }

      // Create the game document
      const newGame = new Game({
        title,
        photo, // Save the Base64 string directly
        stars,
        review,
      });

      await newGame.save();

      return res.status(201).json({ message: "Game created successfully." });
    } catch (error) {
      console.error("Error creating game:", error);
      return res.status(500).json({ message: "Error creating game." });
    }
  } else if (req.method === "GET") {
    try {
      // Fetch all games from the database
      const games = await Game.find();

      return res.status(200).json(games);
    } catch (error) {
      console.error("Error fetching games:", error);
      return res.status(500).json({ message: "Error fetching games." });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed." });
  }
}
