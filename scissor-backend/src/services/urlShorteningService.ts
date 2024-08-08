// src/services/urlShorteningService.ts
import { nanoid } from 'nanoid';
import validUrl from 'valid-url';
import Url from '../models/Url';

const baseUrl = process.env.BASE_URL || 'http://localhost:5001';

export const shortenUrl = async (originalUrl: string, customCode?: string, expiresAt?: Date) => {
  if (!validUrl.isUri(originalUrl)) {
    throw new Error('Invalid URL');
  }

  // Check if the URL already exists in the database
  let url = await Url.findOne({ originalUrl });
  if (url) {
    return {
      shortUrl: `${baseUrl}/${url.shortCode}`,
      originalUrl: url.originalUrl,
    };
  }

  // Generate short code
  const shortCode = customCode || nanoid(7);

  // Create new URL entry
  url = new Url({
    originalUrl,
    shortCode,
    customCode: customCode || null,
    createdAt: new Date(),
    expiresAt: expiresAt || null // Set expiry date if provided
  });

  await url.save();

  return {
    shortUrl: `${baseUrl}/${shortCode}`,
    originalUrl,
  };
};
