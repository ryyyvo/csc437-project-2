import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { ReviewData } from '../components/Review';
import { baldursGate3Reviews } from '../data/sampleReviews';


interface ReviewsContextType {
  reviews: ReviewData[];
  addReview: (review: Omit<ReviewData, 'id' | 'dateCreated'>) => void;
}

export const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

export const ReviewsProvider = ({ children }: { children: ReactNode }) => {
  const [reviews, setReviews] = useState<ReviewData[]>(baldursGate3Reviews);

  const addReview = (review: Omit<ReviewData, 'id' | 'dateCreated'>) => {
    const newReview: ReviewData = {
      ...review,
      id: `review-${Date.now()}`,
      dateCreated: new Date().toISOString().split('T')[0]
    };
    setReviews(prev => [newReview, ...prev]);
  };

  return (
    <ReviewsContext.Provider value={{ reviews, addReview }}>
      {children}
    </ReviewsContext.Provider>
  );
};