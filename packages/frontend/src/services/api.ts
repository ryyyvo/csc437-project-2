import type { Game } from '../../../backend/src/shared/schemas';

const API_BASE_URL = '/api';

export interface ReviewData {
  _id?: string;
  userId: string;
  gameId: string;
  username: string;
  gameName: string;
  rating: number;
  content: string;
  dateCreated: string;
  dateModified?: string;
}

export const api = {
  // reviews
  async getReviews(): Promise<ReviewData[]> {
    const response = await fetch(`${API_BASE_URL}/reviews`);
    if (!response.ok) throw new Error('Failed to fetch reviews');
    return response.json();
  },

  async getReviewsByGame(gameId: string): Promise<ReviewData[]> {
    const response = await fetch(`${API_BASE_URL}/reviews/game/${gameId}`);
    if (!response.ok) throw new Error('Failed to fetch game reviews');
    return response.json();
  },

  async getReviewsByUser(username: string): Promise<ReviewData[]> {
    const response = await fetch(`${API_BASE_URL}/reviews/user/${username}`);
    if (!response.ok) throw new Error('Failed to fetch user reviews');
    return response.json();
  },

  async createReview(review: Omit<ReviewData, '_id' | 'dateCreated'>): Promise<ReviewData> {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    });
    if (!response.ok) throw new Error('Failed to create review');
    return response.json();
  },

  // games
  async getGames(): Promise<Game[]> {
    const response = await fetch(`${API_BASE_URL}/games`);
    if (!response.ok) throw new Error('Failed to fetch games');
    return response.json();
  },

  async getGame(gameId: string): Promise<Game> {
    const response = await fetch(`${API_BASE_URL}/games/${gameId}`);
    if (!response.ok) throw new Error('Failed to fetch game');
    return response.json();
  },

  async searchGames(query: string): Promise<Game[]> {
    if (!query.trim()) return [];
    const response = await fetch(`${API_BASE_URL}/games/search/${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search games');
    return response.json();
  },

  async createGame(title: string): Promise<Game> {
    const response = await fetch(`${API_BASE_URL}/games`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });
    if (!response.ok) throw new Error('Failed to create game');
    return response.json();
  },
};