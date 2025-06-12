import { Router, Request, Response } from 'express';
import { User } from '../models/User';

const router = Router();

router.get('/:username', async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    
    if (user) {
      const { password, ...userWithoutPassword } = user.toObject();
      res.json(userWithoutPassword);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

export default router;