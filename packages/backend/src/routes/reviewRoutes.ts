import { Router, Request, Response } from 'express';
import { Review } from '../models/Review';

const router = Router();

// Get all reviews
router.get('/', async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({}).sort({ dateCreated: -1 });
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Get reviews by game ID
router.get('/game/:gameId', async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    const reviews = await Review.find({ gameId }).sort({ dateCreated: -1 });
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching game reviews:', error);
    res.status(500).json({ error: 'Failed to fetch game reviews' });
  }
});

// Get reviews by username
router.get('/user/:username', async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const reviews = await Review.find({ username }).sort({ dateCreated: -1 });
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    res.status(500).json({ error: 'Failed to fetch user reviews' });
  }
});

// Create new review
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, gameId, username, gameName, rating, content } = req.body;
    
    const review = new Review({
      userId,
      gameId,
      username,
      gameName,
      rating,
      content
    });
    
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (error) {
    console.error('Error creating review:', error);
    
    if (error instanceof Error && error.name === 'ValidationError') {
      res.status(400).json({ error: 'Invalid review data', details: error.message });
    } else {
      res.status(500).json({ error: 'Failed to create review' });
    }
  }
});

export default router;