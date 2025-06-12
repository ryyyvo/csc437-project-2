import { useParams } from "react-router";
import Layout from "../components/Layout";
import Review from "../components/Review";
import { useReviewsByUser } from "../hooks/useQueryApi";

export default function UserPage() {
  const { username } = useParams<{ username: string }>();

  const { 
    data: userReviews = [], 
    isLoading, 
    error 
  } = useReviewsByUser(username || '');

  if (isLoading) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <p>Error: {error.message}</p>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <h2>{username}</h2>
      <div className="recent-reviews">
        <h3>Reviews by {username}</h3>
        {userReviews.length > 0 ? (
          <div className="review-list">
            {userReviews.map((review) => (
              <Review 
                key={review._id} 
                review={review} 
                showGameName={true} 
                showAuthor={false}
              />
            ))}
          </div>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </Layout>
  );
}