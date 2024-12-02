import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../lib/mongodb';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// JWT Secret (make sure to store this securely in an environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Helper function to generate JWT token
const generateToken = (user: { id: string; username: string }): string => {
  return jwt.sign(
    { id: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: '1h' } // Set token expiration to 1 hour
  );
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      // Connect to the database
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

      // Generate JWT token
      const token = generateToken(user);

      // Successful login
      return res.status(200).json({
        message: 'Login successful',
        token, // Send token to the client
        user: { id: user._id, username: user.username },
      });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
