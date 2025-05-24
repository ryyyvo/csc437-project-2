import { useState } from "react";
import Layout from "../components/Layout";
import { useReviews } from "../hooks/useReviews";

export default function ReviewPage() {
  const [gameTitle, setGameTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [rating, setRating] = useState("5");
  const currentUser = "User123"; // Would be from authentication
  const { addReview } = useReviews();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReview({
      gameName: gameTitle,
      userName: currentUser,
      rating: parseInt(rating),
      content: reviewContent
    });
    
    // Reset form
    setGameTitle("");
    setReviewContent("");
    setRating("5");
    
    alert("Review submitted successfully!");
  };
  
  return (
    <Layout currentUser={currentUser}>
      <h2>Write Your Review</h2>
      <form className="create_review" onSubmit={handleSubmit}>
        <label htmlFor="game_title">Game Title:</label>
        <input 
          type="text" 
          id="game_title" 
          name="game_title" 
          placeholder="Search for a game..." 
          required
          value={gameTitle}
          onChange={(e) => setGameTitle(e.target.value)}
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

        <button type="submit">Submit Review</button>
      </form>
    </Layout>
  );
}