export interface User {
  _id?: string; // MongoDB ObjectId
  username: string;
  password: string; // This should be hashed in practice
}

export interface Game {
  _id?: string; // MongoDB ObjectId
  title: string;
}

export interface Review {
  _id?: string; // MongoDB ObjectId
  userId: string; // Reference to User._id
  gameId: string; // Reference to Game._id
  username: string; // Denormalized for easy display
  gameName: string; // Denormalized for easy display
  rating: number; // 1-5 stars
  content: string;
  dateCreated: string; // ISO date string
  dateModified?: string; // For edit functionality
}