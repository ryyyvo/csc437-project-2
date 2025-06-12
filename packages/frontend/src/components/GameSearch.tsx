import { useState, useEffect, useRef } from 'react';
import { useGameSearch, useCreateGame } from '../hooks/useQueryApi';
import type { Game } from '../../../backend/src/shared/schemas';

interface GameSearchProps {
  onGameSelect: (game: Game) => void;
  value: string;
  onChange: (value: string) => void;
}

export default function GameSearch({ onGameSelect, value, onChange }: GameSearchProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(value);
    }, 300);

    return () => clearTimeout(timer);
  }, [value]);

  const { data: searchResults = [], isLoading } = useGameSearch(debouncedQuery);
  const createGameMutation = useCreateGame();

  // show dropdown when have a query and results
  useEffect(() => {
    setShowDropdown(debouncedQuery.length >= 2);
  }, [debouncedQuery, searchResults]);

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
      const newGame = await createGameMutation.mutateAsync(value);
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
        onFocus={() => debouncedQuery.length >= 2 && setShowDropdown(true)}
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
              {searchResults.length === 0 && debouncedQuery.length >= 2 && (
                <div
                  className="dropdown-item create-new"
                  onClick={handleCreateNewGame}
                  style={{ 
                    opacity: createGameMutation.isPending ? 0.6 : 1,
                    pointerEvents: createGameMutation.isPending ? 'none' : 'auto'
                  }}
                >
                  {createGameMutation.isPending ? 'Creating...' : `Create "${value}" as new game`}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}