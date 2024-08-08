import express from 'express';
import { getAnalytics } from '../services/analyticsService';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(authMiddleware);

router.get('/:shortCode', async (req, res) => {
  try {
    const analytics = await getAnalytics(req.params.shortCode);
    res.json(analytics);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;