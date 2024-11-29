import mongoose, { Schema, Document } from 'mongoose';

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

const Game = mongoose.models.Game || mongoose.model<Game>('Game', gameSchema);

export default Game;
