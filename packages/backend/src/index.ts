import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { ValidRoutes } from "./shared/ValidRoutes";
import { sampleUsers, sampleGames, sampleReviews } from "./data/sampleData";
import type { Review } from "./shared/schemas";

dotenv.config();
const PORT = process.env.PORT || 3000;
const STATIC_DIR = process.env.STATIC_DIR || "public";

const app = express();

app.use(express.static(STATIC_DIR));
app.use(express.json());

// api routes
app.get("/api/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

// get all reviews
app.get("/api/reviews", (req: Request, res: Response) => {
    res.json(sampleReviews);
});

// get reviews by game ID
app.get("/api/reviews/game/:gameId", (req: Request, res: Response) => {
    const { gameId } = req.params;
    const gameReviews = sampleReviews.filter(review => review.gameId === gameId);
    res.json(gameReviews);
});

// get reviews by user ID
app.get("/api/reviews/user/:username", (req: Request, res: Response) => {
    const { username } = req.params;
    const userReviews = sampleReviews.filter(review => review.username === username);
    res.json(userReviews);
});

// get all games
app.get("/api/games", (req: Request, res: Response) => {
    res.json(sampleGames);
});

// get specific game
app.get("/api/games/:gameId", (req: Request, res: Response) => {
    const { gameId } = req.params;
    const game = sampleGames.find(game => game._id === gameId);
    if (game) {
        res.json(game);
    } else {
        res.status(404).json({ error: "Game not found" });
    }
});

// create new review
app.post("/api/reviews", (req: Request, res: Response) => {
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

app.get(Object.values(ValidRoutes), (req: Request, res: Response) => {
    res.sendFile("index.html", { root: STATIC_DIR });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
