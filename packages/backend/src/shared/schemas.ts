export interface User {
  _id?: string; 
  username: string;
  password: string; 
}

export interface Game {
  _id?: string; 
  title: string;
}

export interface Review {
  _id?: string; 
  userId: string; 
  gameId: string; 
  username: string; 
  gameName: string; 
  rating: number; // 1-5 stars
  content: string;
  dateCreated: string; 
  dateModified?: string; 
}