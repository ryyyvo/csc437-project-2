import { useContext } from 'react';
import { ReviewsContext } from '../context/ReviewsContext';

export const useReviews = () => {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error('useReviews must be used within ReviewsProvider');
  }
  return context;
};