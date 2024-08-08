import express from 'express';
import Url from '../models/Url';
import { authMiddleware } from '../middlewares/authMiddleware';
import { JwtPayload } from '../types/JwtPayload'; // Import JwtPayload interface

const router = express.Router();

router.use(authMiddleware);

router.delete('/:shortCode', async (req, res) => {
  try {
    const url = await Url.findOneAndDelete({ shortCode: req.params.shortCode });
    if (!url) {
      return res.status(404).send('URL not found');
    }
    res.send('URL deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    // Assert the type of req.user
    const userId = (req.user as JwtPayload).id; // Cast req.user to JwtPayload
    const urls = await Url.find({ createdBy: userId });
    res.json(urls);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;