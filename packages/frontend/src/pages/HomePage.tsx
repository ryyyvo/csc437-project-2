import { useState, useEffect } from "react";
import { Link } from "react-router";
import Layout from "../components/Layout";
import { useGameSearch, useReviews, usePrefetchGame, usePrefetchUser } from "../hooks/useQueryApi";
import Review from "../components/Review";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  
  const prefetchGame = usePrefetchGame();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: searchResults = [], isLoading } = useGameSearch(debouncedQuery);

  useEffect(() => {
    setShowResults(debouncedQuery.length >= 2);
  }, [debouncedQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleInputFocus = () => {
    if (debouncedQuery.length >= 2) {
      setShowResults(true);
    }
  };

  const handleResultClick = () => {
    setShowResults(false);
    setSearchQuery("");
  };

  const handleGameHover = (gameId: string) => {
    prefetchGame(gameId);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.search-container')) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Layout>
      <div className="search-container" style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
        <label htmlFor="game_search">
          <h2>Game Search</h2>
          <input 
            type="text" 
            id="game_search" 
            name="game_search" 
            placeholder="Enter game name..." 
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </label>
        
        {showResults && (
          <div className="search-results">
            {isLoading ? (
              <div className="search-result-item">
                <p>Searching...</p>
              </div>
            ) : searchResults.length > 0 ? (
              searchResults.map((game) => (
                <Link
                  key={game._id}
                  to={`/game/${game._id}`}
                  className="search-result-item"
                  onClick={handleResultClick}
                  onMouseEnter={() => handleGameHover(game._id!)}
                >
                  <div>
                    <h3>{game.title}</h3>
                  </div>
                </Link>
              ))
            ) : debouncedQuery.length >= 2 ? (
              <div className="search-result-item">
                <p>No games found for "{debouncedQuery}"</p>
                <p style={{ fontSize: '0.9em', opacity: 0.7 }}>
                  Try creating a review to add this game!
                </p>
              </div>
            ) : null}
          </div>
        )}
      </div>
      {!showResults && <RecentReviews />}
    </Layout>
  );
}

function RecentReviews() {
  const { data: reviews = [], isLoading, error } = useReviews();
  const prefetchUser = usePrefetchUser();
  const prefetchGame = usePrefetchGame();

  const handleUserHover = (username: string) => {
    prefetchUser(username);
  };

  const handleGameHover = (gameId: string) => {
    prefetchGame(gameId);
  };

  if (isLoading) {
    return (
      <div className="recent-reviews">
        <h3>Recent Reviews</h3>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recent-reviews">
        <h3>Recent Reviews</h3>
        <div style={{ color: 'red', textAlign: 'center', padding: '2em' }}>
          <h4>Error loading reviews</h4>
          <p>{error.message}</p>
          <button onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const recentReviews = reviews.slice(0, 5);

  return (
    <div className="recent-reviews">
      <h3>Recent Reviews</h3>
      {recentReviews.length > 0 ? (
        <div className="review-list">
          {recentReviews.map((review) => (
            <div
              key={review._id}
              onMouseEnter={() => {
                handleUserHover(review.username);
                handleGameHover(review.gameId);
              }}
            >
              <Review 
                review={review} 
                showGameName={true} 
                showAuthor={true} 
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No reviews yet. Be the first to write one!</p>
      )}
    </div>
  );
}