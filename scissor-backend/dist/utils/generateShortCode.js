import crypto from 'crypto';
export const generateShortCode = (length = 6) => {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
};
