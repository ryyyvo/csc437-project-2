import { useParams } from "react-router";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Review from "../components/Review";
import { api, type ReviewData } from "../services/api";

export default function UserPage() {
  const { username } = useParams<{ username: string }>();
  const currentUser = "User123";
  const [userReviews, setUserReviews] = useState<ReviewData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchUserReviews = async () => {
      if (!username) return;
      
      try {
        setIsLoading(true);
        const reviews = await api.getReviewsByUser(username);
        setUserReviews(reviews);
      } catch (err) {
        setError('Failed to load user reviews');
        console.error('Error fetching user reviews:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserReviews();
  }, [username]);

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
        <p>Error: {error}</p>
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