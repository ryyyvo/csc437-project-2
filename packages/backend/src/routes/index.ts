import { Router } from 'express';
import reviewRoutes from './reviewRoutes';
import gameRoutes from './gameRoutes';
import userRoutes from './userRoutes';

const router = Router();

router.use('/reviews', reviewRoutes);
router.use('/games', gameRoutes);
router.use('/users', userRoutes);

router.get('/hello', (req, res) => {
    res.send("Hello, World");
});

export default router;