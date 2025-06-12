import { Router, Request, Response } from 'express';
import { sampleGames } from '../data/sampleData';

const router = Router();

// get all games
router.get('/', (req: Request, res: Response) => {
    res.json(sampleGames);
});

// search games by title
router.get('/search/:query', (req: Request, res: Response) => {
    const { query } = req.params;
    const matchingGames = sampleGames.filter(game => 
        game.title.toLowerCase().includes(query.toLowerCase())
    );
    res.json(matchingGames);
});

// get specific game
router.get('/:gameId', (req: Request, res: Response) => {
    const { gameId } = req.params;
    const game = sampleGames.find(game => game._id === gameId);
    if (game) {
        res.json(game);
    } else {
        res.status(404).json({ error: "Game not found" });
    }
});

// create new game
router.post('/', (req: Request, res: Response) => {
    const { title } = req.body;
    
    // check if game already exists
    const existingGame = sampleGames.find(game => 
        game.title.toLowerCase() === title.toLowerCase()
    );
    
    if (existingGame) {
        res.json(existingGame);
        return;
    }
    
    // create new game
    const newGame = {
        _id: `game-${Date.now()}`,
        title: title.trim()
    };
    
    sampleGames.push(newGame);
    res.status(201).json(newGame);
});

export default router;