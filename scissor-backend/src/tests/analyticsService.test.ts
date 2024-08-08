import { trackClick } from '../services/analyticsService';
import Url from '../models/Url';
import mongoose from 'mongoose';

describe('trackClick', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test');
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should increment clickCount for existing URL', async () => {
    const url = new Url({
      originalUrl: 'http://example.com',
      shortCode: 'short123',
      clickCount: 0,
    });
    await url.save();

    await trackClick('short123');

    const updatedUrl = await Url.findOne({ shortCode: 'short123' });
    expect(updatedUrl?.clickCount).toBe(1);
  });

  it('should throw error for non-existing URL', async () => {
    await expect(trackClick('nonexistent')).rejects.toThrow('URL not found');
  });
});
