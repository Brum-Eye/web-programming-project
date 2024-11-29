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
  } else if (req.method === "DELETE") {
    const { id } = req.query; // Get the ID from the query parameters

    if (!id) {
      return res.status(400).json({ message: "Game ID is required." });
    }

    try {
      // Delete the game by ID
      const deletedGame = await Game.findByIdAndDelete(id);

      if (!deletedGame) {
        return res.status(404).json({ message: "Game not found." });
      }

      return res.status(200).json({ message: "Game deleted successfully." });
    } catch (error) {
      console.error("Error deleting game:", error);
      return res.status(500).json({ message: "Error deleting game." });
    }
  } else if (req.method === "PUT") {
    const { id } = req.query; // Get the ID from the query parameters
    const { title, photo, stars, review } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Game ID is required." });
    }

    try {
      // Find the game by ID and update it with new values
      const updatedGame = await Game.findByIdAndUpdate(
        id,
        { title, photo, stars, review },
        { new: true } // Return the updated game document
      );

      if (!updatedGame) {
        return res.status(404).json({ message: "Game not found." });
      }

      return res.status(200).json({ message: "Game updated successfully.", game: updatedGame });
    } catch (error) {
      console.error("Error updating game:", error);
      return res.status(500).json({ message: "Error updating game." });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed." });
  }
}
