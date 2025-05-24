import { useParams } from "react-router";
import Layout from "../components/Layout";
import Review from "../components/Review";
import { useReviews } from "../hooks/useReviews";

export default function UserPage() {
  const { username } = useParams<{ username: string }>();
  const currentUser = "User123"; // This would come from authentication
  const { reviews } = useReviews();
  
  // Filter reviews for this user
  const userReviews = reviews.filter(review => review.userName === username);
  
  return (
    <Layout currentUser={currentUser}>
      <h2>{username}</h2>
      <div className="user-reviews">
        <h3>Recent Reviews</h3>
        <ul>
          {userReviews.map((review) => (
            <Review key={review.id} review={review} showGameName={true} />
          ))}
        </ul>
      </div>
    </Layout>
  );
}