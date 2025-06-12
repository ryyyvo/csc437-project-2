import mongoose, { Schema, Document } from 'mongoose';
import type { Game as GameInterface } from '../shared/schemas';

export interface GameDocument extends Omit<GameInterface, '_id'>, Document {}

const gameSchema = new Schema<GameDocument>({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 1,
    maxlength: 200
  }
}, {
  timestamps: true
});

// Index for text search
gameSchema.index({ title: 'text' });

export const Game = mongoose.model<GameDocument>('Game', gameSchema);