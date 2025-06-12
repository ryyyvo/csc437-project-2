import { useParams } from "react-router";
import Layout from "../components/Layout";
import Review from "../components/Review";
import { useReviewsByUser } from "../hooks/useQueryApi";

export default function UserPage() {
  const { username } = useParams<{ username: string }>();
  const currentUser = "User123";

  const { 
    data: userReviews = [], 
    isLoading, 
    error 
  } = useReviewsByUser(username || '');

  if (isLoading) {
    return (
      <Layout currentUser={currentUser}>
        <p>Loading...</p>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout currentUser={currentUser}>
        <p>Error: {error.message}</p>
      </Layout>
    );
  }
  
  return (
    <Layout currentUser={currentUser}>
      <h2>{username}</h2>
      <div className="user-reviews">
        <h3>Recent Reviews</h3>
        <ul>
          {userReviews.map((review) => (
            <Review key={review._id} review={review} showGameName={true} />
          ))}
        </ul>
      </div>
    </Layout>
  );
}