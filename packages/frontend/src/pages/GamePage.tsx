import { useParams } from "react-router";
import Layout from "../components/Layout";
import Review from "../components/Review";
import { useGame, useReviewsByGame } from "../hooks/useQueryApi";

export default function GamePage() {
  const { id } = useParams<{ id: string }>();

  const { 
    data: game, 
    isLoading: isLoadingGame, 
    error: gameError 
  } = useGame(id || '');

  const { 
    data: gameReviews = [], 
    isLoading: isLoadingReviews, 
    error: reviewsError 
  } = useReviewsByGame(id || '');

  const isLoading = isLoadingGame || isLoadingReviews;
  const error = gameError || reviewsError;

  if (isLoading) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  if (error || !game) {
    return (
      <Layout>
        <p>Error: {error?.message || 'Game not found'}</p>
      </Layout>
    );
  }

  const averageRating = gameReviews.length > 0 
    ? (gameReviews.reduce((sum, review) => sum + review.rating, 0) / gameReviews.length).toFixed(1)
    : "0";

  return (
    <Layout>
      <h2>{game.title}</h2>
      <div className="recent-reviews">
        <h3>Average Rating: {averageRating}/5 stars ({gameReviews.length} reviews)</h3>
        {gameReviews.length > 0 ? (
          <div className="review-list"> {/* Added wrapper */}
            {gameReviews.map((review) => (
              <Review key={review._id} review={review} showAuthor={true} />
            ))}
          </div>
        ) : (
          <p>No reviews yet. Be the first to review this game!</p>
        )}
      </div>
    </Layout>
  );
}