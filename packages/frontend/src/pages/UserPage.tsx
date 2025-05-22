import Layout from "../components/Layout";

export default function UserPage() {
  const username = "User123"; // This would come from authentication/params
  
  return (
    <Layout currentUser={username}>
      <h2>{username}</h2>
      <div className="user-reviews">
        <h3>Recent Reviews</h3>
        <ul>
          <li>
            <a href="/game/1">Game Title 1</a>
            <p>Review content for Game Title 1...</p>
          </li>
          <li>
            <a href="/game/2">Game Title 2</a>
            <p>Review content for Game Title 2...</p>
          </li>
          <li>
            <a href="/game/3">Game Title 3</a>
            <p>Review content for Game Title 3...</p>
          </li>
        </ul>
      </div>
    </Layout>
  );
}