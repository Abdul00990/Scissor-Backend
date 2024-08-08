import Url from '../models/Url';

export const deleteUrl = async (shortCode: string) => {
  const url = await Url.findOneAndDelete({ shortCode });
  if (!url) {
    throw new Error('URL not found');
  }
  return url;
};
