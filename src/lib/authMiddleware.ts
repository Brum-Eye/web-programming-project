import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null; 
  }
};

const authenticate = (handler: any) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {

    const token = req.headers.authorization?.split(" ")[1]; 

    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const user = verifyToken(token); 

    if (!user) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    req.user = user;

    return handler(req, res);
  };
};

export default authenticate;
