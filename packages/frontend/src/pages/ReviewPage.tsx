import { useState } from "react";
import { useNavigate } from "react-router";
import Layout from "../components/Layout";
import GameSearch from "../components/GameSearch";
import { useCreateReview } from "../hooks/useQueryApi";
import type { Game } from "../../../backend/src/shared/schemas";

export default function ReviewPage() {
  const [gameTitle, setGameTitle] = useState("");
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [reviewContent, setReviewContent] = useState("");
  const [rating, setRating] = useState("5");
  const currentUser = "User123";
  const navigate = useNavigate();
  
  const createReviewMutation = useCreateReview();
  
  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedGame) {
      alert("Please select a game first");
      return;
    }

    try {
      await createReviewMutation.mutateAsync({
        userId: "user-1",
        gameId: selectedGame._id!,
        username: currentUser,
        gameName: selectedGame.title,
        rating: parseInt(rating),
        content: reviewContent
      });
      
      navigate(`/user/${currentUser}`);
    } catch (error) {
      console.error('Failed to create review:', error);
      alert('Failed to create review. Please try again.');
    }
  };
  
  return (
    <Layout currentUser={currentUser}>
      <h2>Write Your Review</h2>
      <form className="create_review" onSubmit={handleSubmit}>
        <label htmlFor="game_title">Game Title:</label>
        <GameSearch
          value={gameTitle}
          onChange={setGameTitle}
          onGameSelect={handleGameSelect}
        />

        <label htmlFor="review_content">Review Content:</label>
        <textarea 
          id="review_content" 
          name="review_content" 
          placeholder="Add a review..." 
          required
          value={reviewContent}
          onChange={(e) => setReviewContent(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <select 
          id="rating" 
          name="rating" 
          style={{ minWidth: "60px", maxWidth: "60px" }}
          required
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <button 
          type="submit" 
          disabled={createReviewMutation.isPending}
        >
          {createReviewMutation.isPending ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </Layout>
  );
}