var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import Url from '../models/Url';
import { nanoid } from 'nanoid'; // Import nanoid correctly
import validUrl from 'valid-url'; // Import valid-url correctly
const router = express.Router();
router.post('/shorten', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { originalUrl, customCode } = req.body;
    try {
        // Validate URL
        if (!validUrl.isUri(originalUrl)) {
            return res.status(400).json({ error: 'Invalid URL' });
        }
        // Check for custom code conflict
        if (customCode) {
            const existingCustomCode = yield Url.findOne({ customCode });
            if (existingCustomCode) {
                return res.status(400).json({ error: 'Custom code already in use' });
            }
        }
        // Generate short code if not provided
        const shortCode = customCode || nanoid(7);
        // Check for short code conflict
        const existingShortCode = yield Url.findOne({ shortCode });
        if (existingShortCode) {
            return res.status(400).json({ error: 'Short code already in use' });
        }
        // Save URL
        const url = new Url({
            originalUrl,
            shortCode,
            customCode: customCode || null,
            createdAt: new Date(),
        });
        yield url.save();
        res.status(201).json({
            shortUrl: `${process.env.BASE_URL}/${shortCode}`,
            originalUrl,
        });
    }
    catch (error) {
        const errorMessage = error.message;
        res.status(400).json({ error: errorMessage });
    }
}));
export default router;
