import { Router, Request, Response, RequestHandler } from 'express';
import { Game } from '../models/Game';
import mongoose from 'mongoose';

const router = Router();

// get all games
router.get('/', async (req: Request, res: Response) => {
  try {
    const games = await Game.find({});
    res.json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});

// search games by title
router.get('/search/:query', async (req: Request, res: Response) => {
  try {
    const { query } = req.params;
    const games = await Game.find({
      title: { $regex: query, $options: 'i' }
    });
    res.json(games);
  } catch (error) {
    console.error('Error searching games:', error);
    res.status(500).json({ error: 'Failed to search games' });
  }
});

// get specific game
router.get('/:gameId', (async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(gameId)) {
      return res.status(400).json({ error: 'Invalid game ID' });
    }
    
    const game = await Game.findById(gameId);
    
    if (game) {
      res.json(game);
    } else {
      res.status(404).json({ error: "Game not found" });
    }
  } catch (error) {
    console.error('Error fetching game:', error);
    res.status(500).json({ error: 'Failed to fetch game' });
  }
}) as RequestHandler);

// create new game
router.post('/', (async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    
    // check if game already exists
    const existingGame = await Game.findOne({
      title: { $regex: `^${title.trim()}$`, $options: 'i' }
    });
    
    if (existingGame) {
      return res.json(existingGame);
    }
    
    // create new game
    const game = new Game({ title: title.trim() });
    const savedGame = await game.save();
    
    res.status(201).json(savedGame);
  } catch (error: unknown) {
    console.error('Error creating game:', error);
    
    if (error instanceof Error) {
      const mongoError = error as any;
      
      if (mongoError.name === 'ValidationError') {
        res.status(400).json({ error: 'Invalid game data', details: mongoError.message });
      } else if (mongoError.code === 11000) { // duplicate key error
        res.status(409).json({ error: 'Game already exists' });
      } else {
        res.status(500).json({ error: 'Failed to create game' });
      }
    } else {
      res.status(500).json({ error: 'Failed to create game' });
    }
  }
}) as RequestHandler);

export default router;