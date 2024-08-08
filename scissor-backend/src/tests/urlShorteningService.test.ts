import { shortenUrl } from '../services/urlShorteningService';
import Url from '../models/Url';
import mongoose from 'mongoose';
import request from 'supertest';
import express from 'express';
import urlRoutes from '../routes/url'; // Assuming this is your routes file

const app = express();
app.use(express.json());
app.use('/', urlRoutes);

describe('shortenUrl', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test', {
      // Remove useNewUrlParser and useUnifiedTopology
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  afterEach(async () => {
    await Url.deleteMany({});
  });

  it('should create a shortened URL with an expiry date', async () => {
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour from now
    const shortUrl = await shortenUrl('http://example.com', undefined, expiresAt);

    expect(shortUrl).toHaveProperty('shortUrl');
    expect(shortUrl).toHaveProperty('originalUrl', 'http://example.com');

    const url = await Url.findOne({ originalUrl: 'http://example.com' });
    expect(url?.expiresAt).toEqual(expiresAt);
  });

  it('should return a 410 status code for expired URLs', async () => {
    const expiresAt = new Date(Date.now() - 1000 * 60 * 60); // 1 hour ago
    const { shortUrl } = await shortenUrl('http://expired.com', undefined, expiresAt);

    const shortCode = shortUrl.split('/').pop();
    const response = await request(app).get(`/${shortCode}`);
    expect(response.status).toBe(410);
  });
});
