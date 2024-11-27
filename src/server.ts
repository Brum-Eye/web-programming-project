import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import cors from 'cors';

dotenv.config();

connectDB();

const app = express();

// Use cors (for different ports)
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
