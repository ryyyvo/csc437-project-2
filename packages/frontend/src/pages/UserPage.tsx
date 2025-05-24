import Layout from "../components/Layout";
import Review from "../components/Review";
import { useReviews } from "../hooks/useReviews";

export default function UserPage() {
  const username = "User123"; // This would come from authentication/params
  const { reviews } = useReviews();
  
  // Filter reviews for this user
  const userReviews = reviews.filter(review => review.userName === username);
  
  return (
    <Layout currentUser={username}>
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