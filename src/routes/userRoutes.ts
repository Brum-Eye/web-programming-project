import express, { Request, Response } from 'express';
import User from '../models/User';

const router = express.Router();

// Create a new user
router.post('/', async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
  
      // Create a new user instance
      const newUser = new User({ name, email, password });
  
      // Save to the database
      await newUser.save();
  
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : 'Unknown error occurred.' });
    }
  });

// Get all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
});

// Update a user
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(user);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
});

// Delete a user
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
});

export default router;
