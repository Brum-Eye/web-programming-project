import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../lib/mongodb';
import Game from '../../models/Game';
import authenticate from '../../lib/authMiddleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDatabase();

  // Apply authentication middleware excluding GET
  if (req.method === 'POST' || req.method === 'DELETE' || req.method === 'PUT') {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }

  if (req.method === 'POST') {
    const { title, photo, stars, review } = req.body;

    try {
      if (!title || !photo || !stars || !review) {
        return res.status(400).json({ message: 'All fields are required.' });
      }

      const newGame = new Game({
        title,
        photo, //base64 string
        stars,
        review,
      });

      await newGame.save();

      return res.status(201).json({ message: 'Game created successfully.' });
    } catch (error) {
      console.error('Error creating game:', error);
      return res.status(500).json({ message: 'Error creating game.' });
    }
  } else if (req.method === 'GET') {
    try {
      // Get all game reviews
      const games = await Game.find();

      return res.status(200).json(games);
    } catch (error) {
      console.error('Error fetching games:', error);
      return res.status(500).json({ message: 'Error fetching games.' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: 'Game ID is required.' });
    }

    try {
      const deletedGame = await Game.findByIdAndDelete(id);

      if (!deletedGame) {
        return res.status(404).json({ message: 'Game not found.' });
      }

      return res.status(200).json({ message: 'Game deleted successfully.' });
    } catch (error) {
      console.error('Error deleting game:', error);
      return res.status(500).json({ message: 'Error deleting game.' });
    }
  } else if (req.method === 'PUT') {
    const { id } = req.query; 
    const { title, photo, stars, review } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Game ID is required.' });
    }

    try {
      // Update the selected game review
      const updatedGame = await Game.findByIdAndUpdate(
        id,
        { title, photo, stars, review },
        { new: true } 
      );

      if (!updatedGame) {
        return res.status(404).json({ message: 'Game not found.' });
      }

      return res.status(200).json({ message: 'Game updated successfully.', game: updatedGame });
    } catch (error) {
      console.error('Error updating game:', error);
      return res.status(500).json({ message: 'Error updating game.' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed.' });
  }
};

export default handler;
