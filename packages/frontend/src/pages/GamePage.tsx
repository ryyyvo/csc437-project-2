import { useParams } from "react-router";
import Layout from "../components/Layout";
import Review from "../components/Review";
import { useGame, useReviewsByGame } from "../hooks/useQueryApi";

export default function GamePage() {
  const { id } = useParams<{ id: string }>();
  const currentUser = "User123";

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
      <Layout currentUser={currentUser}>
        <p>Loading...</p>
      </Layout>
    );
  }

  if (error || !game) {
    return (
      <Layout currentUser={currentUser}>
        <p>Error: {error?.message || 'Game not found'}</p>
      </Layout>
    );
  }

  const averageRating = gameReviews.length > 0 
    ? (gameReviews.reduce((sum, review) => sum + review.rating, 0) / gameReviews.length).toFixed(1)
    : "0";

  return (
    <Layout currentUser={currentUser}>
      <h2>{game.title}</h2>
      <div className="user-reviews">
        <h3>Average Rating: {averageRating}/5 stars ({gameReviews.length} reviews)</h3>
        <ul>
          {gameReviews.map((review) => (
            <Review key={review._id} review={review} />
          ))}
        </ul>
      </div>
    </Layout>
  );
}