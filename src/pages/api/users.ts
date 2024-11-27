// src/pages/api/users.ts

import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../lib/mongodb';
import User from '../../models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Connect to the database
  await connectToDatabase();

  if (req.method === 'POST') {
    const { email, username, password } = req.body;

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create new user
      const newUser = new User({ email, username, password });
      await newUser.save();

      return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error creating user' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
