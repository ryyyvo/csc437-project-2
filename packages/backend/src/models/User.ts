import mongoose, { Schema, Document } from 'mongoose';
import type { User as UserInterface } from '../shared/schemas';

export interface UserDocument extends Omit<UserInterface, '_id'>, Document {}

const userSchema = new Schema<UserDocument>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}, {
  timestamps: true
});

export const User = mongoose.model<UserDocument>('User', userSchema);