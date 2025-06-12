import { Router, Request, Response } from 'express';
import { sampleReviews } from '../data/sampleData';
import type { Review } from '../shared/schemas';

const router = Router();

// Get all reviews
router.get('/', (req: Request, res: Response) => {
    res.json(sampleReviews);
});

// Get reviews by game ID
router.get('/game/:gameId', (req: Request, res: Response) => {
    const { gameId } = req.params;
    const gameReviews = sampleReviews.filter(review => review.gameId === gameId);
    res.json(gameReviews);
});

// Get reviews by user ID
router.get('/user/:username', (req: Request, res: Response) => {
    const { username } = req.params;
    const userReviews = sampleReviews.filter(review => review.username === username);
    res.json(userReviews);
});

// Create new review
router.post('/', (req: Request, res: Response) => {
    const { userId, gameId, username, gameName, rating, content } = req.body;
    
    const newReview: Review = {
        _id: `review-${Date.now()}`,
        userId,
        gameId,
        username,
        gameName,
        rating,
        content,
        dateCreated: new Date().toISOString().split('T')[0]
    };
    
    sampleReviews.unshift(newReview);
    res.status(201).json(newReview);
});

export default router;