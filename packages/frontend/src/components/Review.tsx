import { Link } from "react-router";

export interface ReviewData {
  id: string;
  gameName: string;
  userName: string;
  dateCreated: string;
  rating: number;
  content: string;
}

interface ReviewProps {
  review: ReviewData;
  showGameName?: boolean; // Add prop to control display mode
}

export default function Review({ review, showGameName = false }: ReviewProps) {
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

  return (
    <li className="review-item">
      <div className="review-header">
        {showGameName ? (
          <Link to="/game" className="review-game">
            {review.gameName}
          </Link>
        ) : (
          <Link to="/user" className="review-author">
            Review by {review.userName}
          </Link>
        )}
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