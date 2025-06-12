import { Router, Request, Response, RequestHandler } from 'express';
import { Review } from '../models/Review';
import mongoose from 'mongoose';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

// get all reviews
router.get('/', (async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({}).sort({ dateCreated: -1 });
    const serializedReviews = reviews.map(review => ({
      ...review.toObject(),
      _id: (review._id as mongoose.Types.ObjectId).toString(),
      userId: (review.userId as mongoose.Types.ObjectId).toString(),
      gameId: (review.gameId as mongoose.Types.ObjectId).toString()
    }));
    res.json(serializedReviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
}) as RequestHandler);

// get reviews by game ID
router.get('/game/:gameId', (async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(gameId)) {
      return res.status(400).json({ error: 'Invalid game ID' });
    }
    
    const reviews = await Review.find({ gameId }).sort({ dateCreated: -1 });
    const serializedReviews = reviews.map(review => ({
      ...review.toObject(),
      _id: (review._id as mongoose.Types.ObjectId).toString(),
      userId: (review.userId as mongoose.Types.ObjectId).toString(),
      gameId: (review.gameId as mongoose.Types.ObjectId).toString()
    }));
    res.json(serializedReviews);
  } catch (error) {
    console.error('Error fetching game reviews:', error);
    res.status(500).json({ error: 'Failed to fetch game reviews' });
  }
}) as RequestHandler);

// get reviews by username
router.get('/user/:username', (async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const reviews = await Review.find({ username }).sort({ dateCreated: -1 });
    const serializedReviews = reviews.map(review => ({
      ...review.toObject(),
      _id: (review._id as mongoose.Types.ObjectId).toString(),
      userId: (review.userId as mongoose.Types.ObjectId).toString(),
      gameId: (review.gameId as mongoose.Types.ObjectId).toString()
    }));
    res.json(serializedReviews);
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    res.status(500).json({ error: 'Failed to fetch user reviews' });
  }
}) as RequestHandler);

// create new review
router.post('/', authenticateToken, (async (req: AuthRequest, res: Response) => {
  try {
    const { gameId, gameName, rating, content } = req.body;
    
    // Get user info from authenticated token
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    
    if (!mongoose.Types.ObjectId.isValid(gameId)) {
      return res.status(400).json({ error: 'Invalid game ID' });
    }
    
    const review = new Review({
      userId: req.user.userId, // From JWT token
      gameId,
      username: req.user.username, // From JWT token
      gameName,
      rating,
      content
    });
    
    const savedReview = await review.save();
    const serializedReview = {
      ...savedReview.toObject(),
      _id: (savedReview._id as mongoose.Types.ObjectId).toString(),
      userId: (savedReview.userId as mongoose.Types.ObjectId).toString(),
      gameId: (savedReview.gameId as mongoose.Types.ObjectId).toString()
    };
    
    res.status(201).json(serializedReview);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
}) as RequestHandler);

export default router;