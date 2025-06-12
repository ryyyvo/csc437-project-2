import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { api, type ReviewData } from '../services/api';


interface ReviewsContextType {
  reviews: ReviewData[];
  addReview: (review: Omit<ReviewData, '_id' | 'dateCreated'>) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

export const ReviewsProvider = ({ children }: { children: ReactNode }) => {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const fetchedReviews = await api.getReviews();
        setReviews(fetchedReviews);
      } catch (err) {
        setError('Failed to load reviews');
        console.error('Error fetching reviews:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const addReview = async (review: Omit<ReviewData, '_id' | 'dateCreated'>) => {
    try {
      const newReview = await api.createReview(review);
      setReviews(prev => [newReview, ...prev]);
    } catch (err) {
      setError('Failed to create review');
      console.error('Error creating review:', err);
    }
  };

  return (
    <ReviewsContext.Provider value={{ reviews, addReview, isLoading, error }}>
      {children}
    </ReviewsContext.Provider>
  );
};