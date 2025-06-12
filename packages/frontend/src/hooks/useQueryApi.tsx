import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, type ReviewData } from '../services/api';
import type { Game } from '../../../backend/src/shared/schemas';

export const queryKeys = {
  reviews: ['reviews'] as const,
  reviewsByGame: (gameId: string) => ['reviews', 'game', gameId] as const,
  reviewsByUser: (username: string) => ['reviews', 'user', username] as const,
  games: ['games'] as const,
  game: (gameId: string) => ['games', gameId] as const,
  gameSearch: (query: string) => ['games', 'search', query] as const,
} as const;

export const useReviews = () => {
  return useQuery({
    queryKey: queryKeys.reviews,
    queryFn: api.getReviews,
  });
};

export const useReviewsByGame = (gameId: string) => {
  return useQuery({
    queryKey: queryKeys.reviewsByGame(gameId),
    queryFn: () => api.getReviewsByGame(gameId),
    enabled: !!gameId,
  });
};

export const useReviewsByUser = (username: string) => {
  return useQuery({
    queryKey: queryKeys.reviewsByUser(username),
    queryFn: () => api.getReviewsByUser(username),
    enabled: !!username,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.createReview,
    onSuccess: (newReview) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews });
      queryClient.invalidateQueries({ queryKey: queryKeys.reviewsByGame(newReview.gameId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.reviewsByUser(newReview.username) });

      queryClient.setQueryData(queryKeys.reviews, (old: ReviewData[] | undefined) => {
        return old ? [newReview, ...old] : [newReview];
      });
    },
  });
};

// Games Hooks
export const useGames = () => {
  return useQuery({
    queryKey: queryKeys.games,
    queryFn: api.getGames,
  });
};

export const useGame = (gameId: string) => {
  return useQuery({
    queryKey: queryKeys.game(gameId),
    queryFn: () => api.getGame(gameId),
    enabled: !!gameId,
  });
};

export const useGameSearch = (query: string) => {
  return useQuery({
    queryKey: queryKeys.gameSearch(query),
    queryFn: () => api.searchGames(query),
    enabled: query.length >= 2,
    staleTime: 30 * 1000, // 30 seconds
  });
};

export const useCreateGame = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.createGame,
    onSuccess: (newGame) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.games });
      
      queryClient.setQueryData(queryKeys.games, (old: Game[] | undefined) => {
        return old ? [...old, newGame] : [newGame];
      });
    },
  });
};