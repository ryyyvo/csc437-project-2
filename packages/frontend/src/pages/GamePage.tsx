import { useParams } from "react-router";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Review from "../components/Review";
import { api, type ReviewData } from "../services/api";
import type { Game } from "../../../backend/src/shared/schemas";

export default function GamePage() {
  const { id } = useParams<{ id: string }>();
  const currentUser = "User123";
  const [gameReviews, setGameReviews] = useState<ReviewData[]>([]);
  const [game, setGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchGameData = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const [gameData, reviewsData] = await Promise.all([
          api.getGame(id),
          api.getReviewsByGame(id)
        ]);
        setGame(gameData);
        setGameReviews(reviewsData);
      } catch (err) {
        setError('Failed to load game data');
        console.error('Error fetching game data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGameData();
  }, [id]);

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
        <p>Error: {error || 'Game not found'}</p>
      </Layout>
    );
  }

  const averageRating = gameReviews.length > 0 
    ? (gameReviews.reduce((sum, review) => sum + review.rating, 0) / gameReviews.length).toFixed(1)
    : "0";

  return (
    <Layout currentUser={currentUser}>
      <h2>{game.title}</h2>
      <p>Game ID: {id}</p>
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