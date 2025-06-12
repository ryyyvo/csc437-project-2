import { Link } from "react-router";
import type { ReviewData } from '../services/api';

interface ReviewProps {
  review: ReviewData;
  showGameName?: boolean;
  showAuthor?: boolean;
}

export default function Review({ review, showGameName = false, showAuthor = true }: ReviewProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const gameLink = `/game/${review.gameId}`;
  const userLink = `/user/${review.username}`;

  return (
    <li className="review-item">
      <div className="review-header">
        <div className="review-titles">
          {showGameName && (
            <Link to={gameLink} className="review-game">
              {review.gameName}
            </Link>
          )}
          {showAuthor && (
            <Link to={userLink} className="review-author">
              {showGameName ? `Review by ${review.username}` : `Review by ${review.username}`}
            </Link>
          )}
        </div>
        <div className="review-meta">
          <span className="review-rating" aria-label={`${review.rating} out of 5 stars`}>
            {renderStars(review.rating)} ({review.rating}/5)
          </span>
          <span className="review-date">
            {formatDate(review.dateCreated)}
          </span>
        </div>
      </div>
      <p className="review-content">{review.content}</p>
    </li>
  );
}