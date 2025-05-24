import Layout from "../components/Layout";
import Review from "../components/Review";
import { baldursGate3Reviews } from "../data/sampleReviews";

export default function GamePage() {
  const currentUser = "User123"; // Would be from authentication
  
  // In a real app, you'd fetch reviews based on the game ID
  const gameReviews = baldursGate3Reviews;
  const gameName = "Baldur's Gate 3";
  
  // Calculate average rating
  const averageRating = gameReviews.length > 0 
    ? (gameReviews.reduce((sum, review) => sum + review.rating, 0) / gameReviews.length).toFixed(1)
    : "0";

  return (
    <Layout currentUser={currentUser}>
      <h2>{gameName}</h2>
      <div className="user-reviews">
        <h3>Average Rating: {averageRating}/5 stars ({gameReviews.length} reviews)</h3>
        <ul>
          {gameReviews.map((review) => (
            <Review key={review.id} review={review} />
          ))}
        </ul>
      </div>
    </Layout>
  );
}