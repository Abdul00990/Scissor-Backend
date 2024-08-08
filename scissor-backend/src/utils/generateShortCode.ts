import crypto from 'crypto';

export const generateShortCode = (length: number = 6): string => {
  return crypto.randomBytes(length).toString('hex').slice(0, length);
};
