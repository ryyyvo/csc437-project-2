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
  users: ['users'] as const,
  user: (username: string) => ['users', username] as const,
} as const;

// Auth mutations
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      api.login(username, password),
    onSuccess: (_data) => {
      // Invalidate user-related queries after login
      queryClient.invalidateQueries({ queryKey: queryKeys.users });
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews });
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      api.register(username, password),
    onSuccess: (data) => {
      // Set user data in cache after registration
      queryClient.setQueryData(queryKeys.user(data.user.username), data.user);
    },
  });
};

// User queries
export const useUser = (username: string) => {
  return useQuery({
    queryKey: queryKeys.user(username),
    queryFn: () => api.getUser(username),
    enabled: !!username,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Enhanced reviews queries with better error handling
export const useReviews = () => {
  return useQuery({
    queryKey: queryKeys.reviews,
    queryFn: api.getReviews,
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useReviewsByGame = (gameId: string) => {
  return useQuery({
    queryKey: queryKeys.reviewsByGame(gameId),
    queryFn: () => api.getReviewsByGame(gameId),
    enabled: !!gameId,
    staleTime: 2 * 60 * 1000,
    retry: 3,
  });
};

export const useReviewsByUser = (username: string) => {
  return useQuery({
    queryKey: queryKeys.reviewsByUser(username),
    queryFn: () => api.getReviewsByUser(username),
    enabled: !!username,
    staleTime: 2 * 60 * 1000,
    retry: 3,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.createReview,
    onMutate: async (newReview) => {
      // Optimistic update - show review immediately
      await queryClient.cancelQueries({ queryKey: queryKeys.reviews });
      await queryClient.cancelQueries({ queryKey: queryKeys.reviewsByGame(newReview.gameId) });
      
      const previousReviews = queryClient.getQueryData(queryKeys.reviews);
      const previousGameReviews = queryClient.getQueryData(queryKeys.reviewsByGame(newReview.gameId));
      
      // Optimistically update the cache
      const optimisticReview: ReviewData = {
        _id: `temp-${Date.now()}`,
        ...newReview,
        dateCreated: new Date().toISOString().split('T')[0],
      };
      
      queryClient.setQueryData(queryKeys.reviews, (old: ReviewData[] | undefined) => {
        return old ? [optimisticReview, ...old] : [optimisticReview];
      });
      
      queryClient.setQueryData(queryKeys.reviewsByGame(newReview.gameId), (old: ReviewData[] | undefined) => {
        return old ? [optimisticReview, ...old] : [optimisticReview];
      });
      
      return { previousReviews, previousGameReviews, optimisticReview };
    },
    onError: (_err, newReview, context) => {
      // Rollback optimistic update on error
      if (context?.previousReviews) {
        queryClient.setQueryData(queryKeys.reviews, context.previousReviews);
      }
      if (context?.previousGameReviews) {
        queryClient.setQueryData(queryKeys.reviewsByGame(newReview.gameId), context.previousGameReviews);
      }
    },
    onSuccess: (newReview) => {
      // Invalidate and refetch to get the real data
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews });
      queryClient.invalidateQueries({ queryKey: queryKeys.reviewsByGame(newReview.gameId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.reviewsByUser(newReview.username) });
    },
  });
};

// Enhanced games queries
export const useGames = () => {
  return useQuery({
    queryKey: queryKeys.games,
    queryFn: api.getGames,
    staleTime: 10 * 60 * 1000, // 10 minutes - games don't change often
    retry: 3,
  });
};

export const useGame = (gameId: string) => {
  return useQuery({
    queryKey: queryKeys.game(gameId),
    queryFn: () => api.getGame(gameId),
    enabled: !!gameId,
    staleTime: 10 * 60 * 1000,
    retry: 3,
  });
};

export const useGameSearch = (query: string) => {
  return useQuery({
    queryKey: queryKeys.gameSearch(query),
    queryFn: () => api.searchGames(query),
    enabled: query.length >= 2,
    staleTime: 30 * 1000, // 30 seconds
    retry: 2,
  });
};

export const useCreateGame = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.createGame,
    onSuccess: (newGame) => {
      // Update games list cache
      queryClient.invalidateQueries({ queryKey: queryKeys.games });
      queryClient.setQueryData(queryKeys.games, (old: Game[] | undefined) => {
        return old ? [...old, newGame] : [newGame];
      });
      
      // Set individual game cache
      queryClient.setQueryData(queryKeys.game(newGame._id!), newGame);
    },
  });
};

// Prefetch utilities
export const usePrefetchGame = () => {
  const queryClient = useQueryClient();
  
  return (gameId: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.game(gameId),
      queryFn: () => api.getGame(gameId),
      staleTime: 10 * 60 * 1000,
    });
  };
};

export const usePrefetchUser = () => {
  const queryClient = useQueryClient();
  
  return (username: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.user(username),
      queryFn: () => api.getUser(username),
      staleTime: 5 * 60 * 1000,
    });
  };
};