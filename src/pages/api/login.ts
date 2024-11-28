// src/pages/api/login.ts

import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../lib/mongodb';
import User from '../../models/User';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      const { username, password } = req.body;
  
      try {
        // Connect to database
        await connectToDatabase();
  
        // Find user in the database
        const user = await User.findOne({ username });
  
        if (!user) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }
  
        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
  
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }
  
        // Successful login
        return res.status(200).json({ message: 'Login successful', user: { id: user._id, username: user.username } });
      } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  }
