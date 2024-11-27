// src/pages/api/login.ts

import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../lib/mongodb';
import User from '../../models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      // Connect to the database
      await connectToDatabase();

      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Compare the input password with the stored plain-text password
      if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Respond with success
      return res.status(200).json({ message: 'Login successful', user: { username: user.username, email: user.email } });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    // Handle non-POST requests
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
