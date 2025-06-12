import { useState, useEffect, useRef } from 'react';
import { api } from '../services/api';
import type { Game } from '../../../backend/src/shared/schemas';

interface GameSearchProps {
  onGameSelect: (game: Game) => void;
  value: string;
  onChange: (value: string) => void;
}

export default function GameSearch({ onGameSelect, value, onChange }: GameSearchProps) {
  const [searchResults, setSearchResults] = useState<Game[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const searchGames = async () => {
      if (value.length < 2) {
        setSearchResults([]);
        setShowDropdown(false);
        return;
      }

      setIsLoading(true);
      try {
        const results = await api.searchGames(value);
        setSearchResults(results);
        setShowDropdown(true);
      } catch (error) {
        console.error('Error searching games:', error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(searchGames, 300);
    return () => clearTimeout(timeoutId);
  }, [value]);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGameSelect = (game: Game) => {
    onChange(game.title);
    onGameSelect(game);
    setShowDropdown(false);
  };

  const handleCreateNewGame = async () => {
    try {
      const newGame = await api.createGame(value);
      handleGameSelect(newGame);
    } catch (error) {
      console.error('Error creating game:', error);
    }
  };

  return (
    <div ref={searchRef} style={{ position: 'relative', width: '100%' }}>
      <input
        type="text"
        id="game_title"
        name="game_title"
        placeholder="Search for a game..."
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => value.length >= 2 && setShowDropdown(true)}
      />
      
      {showDropdown && (
        <div className="game-dropdown">
          {isLoading ? (
            <div className="dropdown-item">Searching...</div>
          ) : (
            <>
              {searchResults.map((game) => (
                <div
                  key={game._id}
                  className="dropdown-item"
                  onClick={() => handleGameSelect(game)}
                >
                  {game.title}
                </div>
              ))}
              {searchResults.length === 0 && value.length >= 2 && (
                <div
                  className="dropdown-item create-new"
                  onClick={handleCreateNewGame}
                >
                  Create "{value}" as new game
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}