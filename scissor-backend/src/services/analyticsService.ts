import Url from '../models/Url';

// Function to track clicks on URLs
export const trackClick = async (shortCode: string) => {
    const url = await Url.findOne({ shortCode });
    if (!url) {
      throw new Error('URL not found');
    }

  
  url.clickCount += 1;
  url.lastAccessed = new Date();
  await url.save();
};



export const getAnalytics = async (shortCode: string) => {
  const url = await Url.findOne({ shortCode });
  if (!url) {
    throw new Error('URL not found');
  }

  return {
    originalUrl: url.originalUrl,
    shortCode: url.shortCode,
    clickCount: url.clickCount,
    lastAccessed: url.lastAccessed,
  };
};