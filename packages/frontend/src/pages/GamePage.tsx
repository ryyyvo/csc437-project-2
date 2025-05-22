import { useParams } from "react-router";
import Layout from "../components/Layout";

export default function GamePage() {
  const { id } = useParams();
  const currentUser = "User123"; // Would be from authentication
  
  return (
    <Layout currentUser={currentUser}>
      <h2>Game {id || '1'}</h2>
      <div className="user-reviews">
        <h3>4.5/5</h3>
        <ul>
          <li>
            <a href="/user">Review by User1 - 5/5</a>
            <p>Review content for Game 1...</p>
          </li>
          <li>
            <a href="/user">Review by User2 - 4/5</a>
            <p>Review content for Game 1...</p>
          </li>
          <li>
            <a href="/user">Review by User1 - 4.5/5</a>
            <p>Review content for Game 1...</p>
          </li>
        </ul>
      </div>
    </Layout>
  );
}