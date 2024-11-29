import mongoose, { Schema, Document } from 'mongoose';
import fs from 'fs'; // file system
import path from 'path';

interface Game extends Document {
  title: string;
  photo: string; 
  stars: number;
  review: string;
}

const gameSchema = new Schema<Game>({
  title: { type: String, required: true, unique: true },
  photo: { type: String, required: true }, 
  stars: { type: Number, required: true },
  review: { type: String, required: true },
});

// Middleware to handle Base64 conversion before saving
gameSchema.pre('save', async function (next) {
  const game = this as Game;

  // Ensure the `photo` field contains a file path before conversion
  if (fs.existsSync(game.photo)) {
    const filePath = path.resolve(game.photo);
    const fileBuffer = fs.readFileSync(filePath);
    game.photo = fileBuffer.toString('base64'); // Convert to Base64
  }

  next();
});

const Game = mongoose.models.Game || mongoose.model<Game>('Game', gameSchema);

export default Game;
