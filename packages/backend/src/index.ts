import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { ValidRoutes } from "./shared/ValidRoutes";
import apiRoutes from "./routes";

dotenv.config();
const PORT = process.env.PORT || 3000;
const STATIC_DIR = process.env.STATIC_DIR || "public";

const app = express();

app.use(express.static(STATIC_DIR));
app.use(express.json());
app.use('/api', apiRoutes);

app.get(Object.values(ValidRoutes), (req: Request, res: Response) => {
    res.sendFile("index.html", { root: STATIC_DIR });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
