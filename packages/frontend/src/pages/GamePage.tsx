import { useParams } from "react-router";
import Layout from "../components/Layout";
import Review from "../components/Review";
import { baldursGate3Reviews } from "../data/sampleReviews";

export default function GamePage() {
  const { id } = useParams<{ id: string }>();
  const currentUser = "User123";
  
  // fetch reviews based on the game ID from params with backend later on
  const gameReviews = baldursGate3Reviews;
  const gameName = "Baldur's Gate 3";
  
  const averageRating = gameReviews.length > 0 
    ? (gameReviews.reduce((sum, review) => sum + review.rating, 0) / gameReviews.length).toFixed(1)
    : "0";

  return (
    <Layout currentUser={currentUser}>
      <h2>{gameName}</h2>
      <p>Game ID: {id}</p>
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