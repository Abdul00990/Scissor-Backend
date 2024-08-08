import express from 'express';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware(['admin']));

router.get('/dashboard', (req, res) => {
  res.send('Admin Dashboard');
});

export default router;