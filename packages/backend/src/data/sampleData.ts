import type { User, Game, Review } from '../shared/schemas';

export const sampleUsers: User[] = [
  {
    _id: "user-1",
    username: "User123",
    password: "hashed_password_1"
  },
  {
    _id: "user-2", 
    username: "shadowheart_fan",
    password: "hashed_password_2"
  },
  {
    _id: "user-3",
    username: "gale_lover", 
    password: "hashed_password_3"
  }
];

export const sampleGames: Game[] = [
  {
    _id: "game-1",
    title: "Baldur's Gate 3"
  }
];

export const sampleReviews: Review[] = [
  {
    _id: "bg3-review-001",
    userId: "user-1",
    gameId: "game-1",
    username: "User123",
    gameName: "Baldur's Gate 3",
    rating: 5,
    content: "yes",
    dateCreated: "2024-01-15"
  },
  {
    _id: "bg3-review-002",
    userId: "user-2", 
    gameId: "game-1",
    username: "shadowheart_fan",
    gameName: "Baldur's Gate 3",
    rating: 4,
    content: "I like shadowheart",
    dateCreated: "2024-02-03"
  },
  {
    _id: "bg3-review-003",
    userId: "user-3",
    gameId: "game-1", 
    username: "gale_lover",
    gameName: "Baldur's Gate 3",
    rating: 5,
    content: "I like this game",
    dateCreated: "2024-01-28"
  }
];