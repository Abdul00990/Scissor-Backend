import express, { Request, Response } from 'express';
import Url from '../models/Url';
import { nanoid } from 'nanoid';
import validUrl from 'valid-url';
import { trackClick } from '../services/analyticsService';
import { shortenUrl } from '../services/urlShorteningService';
import logger from '../logger';

const router = express.Router();

router.post('/shorten', async (req: Request, res: Response) => {
  const { originalUrl, customCode, expiresAt } = req.body;

  try {
    if (!validUrl.isUri(originalUrl)) {
      logger.error(`Invalid URL: ${originalUrl}`);
      return res.status(400).json({ error: 'Invalid URL' });
    }

    const shortUrl = await shortenUrl(originalUrl, customCode, expiresAt);
    logger.info(`URL shortened: ${originalUrl} -> ${shortUrl.shortUrl}`);
    res.status(201).json(shortUrl);
  } catch (error) {
    logger.error(`Error shortening URL: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
});

router.get('/:shortCode', async (req: Request, res: Response) => {
  const { shortCode } = req.params;

  try {
    await trackClick(shortCode);

    const url = await Url.findOne({ shortCode });
    if (url) {
      if (url.expiresAt && new Date() > url.expiresAt) {
        logger.warn(`Expired URL accessed: ${shortCode}`);
        return res.status(410).send('URL has expired');
      }
      res.redirect(url.originalUrl);
    } else {
      res.status(404).send('URL not found');
    }
  } catch (error) {
    logger.error(`Error redirecting URL: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

export default router;
