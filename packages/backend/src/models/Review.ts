import mongoose, { Schema, Document, Types } from 'mongoose';
import type { Review as ReviewInterface } from '../shared/schemas';

// Create a document interface that uses ObjectId for userId and gameId
export interface ReviewDocument extends Omit<ReviewInterface, '_id' | 'userId' | 'gameId'>, Document {
  userId: Types.ObjectId;
  gameId: Types.ObjectId;
}

const reviewSchema = new Schema<ReviewDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  gameId: {
    type: Schema.Types.ObjectId,
    ref: 'Game',
    required: true
  },
  username: {
    type: String,
    required: true
  },
  gameName: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 2000
  },
  dateCreated: {
    type: String,
    default: () => new Date().toISOString().split('T')[0]
  },
  dateModified: {
    type: String
  }
}, {
  timestamps: true
});

// Compound index for efficient queries
reviewSchema.index({ gameId: 1, dateCreated: -1 });
reviewSchema.index({ username: 1, dateCreated: -1 });

export const Review = mongoose.model<ReviewDocument>('Review', reviewSchema);