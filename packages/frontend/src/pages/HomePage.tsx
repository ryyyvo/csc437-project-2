import { useState, useEffect } from "react";
import { Link } from "react-router";
import Layout from "../components/Layout";
import { useGameSearch, useReviews } from "../hooks/useQueryApi";
import Review from "../components/Review";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Debounce the search query to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: searchResults = [], isLoading } = useGameSearch(debouncedQuery);

  // Show results when we have a query
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

  // Close search results when clicking outside
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
      
      {/* Show recent reviews when not searching */}
      {!showResults && <RecentReviews />}
    </Layout>
  );
}

// Component to show recent reviews on the homepage
function RecentReviews() {
  const { data: reviews = [], isLoading, error } = useReviews();

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
        <p>Error loading reviews</p>
      </div>
    );
  }

  const recentReviews = reviews.slice(0, 5); // Show only 5 most recent

  return (
    <div className="recent-reviews">
      <h3>Recent Reviews</h3>
      {recentReviews.length > 0 ? (
        <div className="review-list">
          {recentReviews.map((review) => (
            <Review key={review._id} review={review} showGameName={true} />
          ))}
        </div>
      ) : (
        <p>No reviews yet. Be the first to write one!</p>
      )}
    </div>
  );
}