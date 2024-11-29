import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../lib/mongodb';
import User from '../../models/User';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      const { name, username, email, password } = req.body;
  
      try {
        // Connect to database
        await connectToDatabase();
  
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Create the user
        const newUser = new User({
          name,
          username,
          email,
          password: hashedPassword,
        });
  
        await newUser.save();
  
        return res.status(201).json({ message: 'User created successfully' });
      } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Error creating user' });
      }
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  }