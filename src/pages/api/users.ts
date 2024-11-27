import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../lib/mongodb';
import User from '../../models/User';

// GET and POST requests to handle User data
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'POST') {
    try {
      const { name, email, password } = req.body;

      // Create a new user
      const user = new User({
        name,
        email,
        password,
      });

      await user.save();
      res.status(201).json({ message: 'User created' });
    } catch (error) {
      res.status(500).json({ message: 'Error creating user' });
    }
  } else if (req.method === 'GET') {
    try {
      // Fetch all users
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
