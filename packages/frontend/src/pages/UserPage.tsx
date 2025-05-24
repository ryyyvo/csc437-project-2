import Layout from "../components/Layout";
import Review from "../components/Review";
import { baldursGate3Reviews } from "../data/sampleReviews";

export default function UserPage() {
  const username = "User123"; // This would come from authentication/params
  
  // Filter reviews for this user
  const userReviews = baldursGate3Reviews.filter(review => review.userName === username);
  
  return (
    <Layout currentUser={username}>
      <h2>{username}</h2>
      <div className="user-reviews">
        <h3>Recent Reviews</h3>
        <ul>
          {userReviews.map((review) => (
            <Review key={review.id} review={review} />
          ))}
        </ul>
      </div>
    </Layout>
  );
}