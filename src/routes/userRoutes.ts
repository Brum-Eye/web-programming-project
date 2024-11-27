import express, { Request, Response } from 'express';
import User from '../models/User';

const router = express.Router();

// Create a user
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, age } = req.body;
    const user = new User({ name, email, age });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
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
