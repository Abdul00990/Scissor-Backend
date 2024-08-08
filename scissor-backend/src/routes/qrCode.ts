import express, { Request, Response } from 'express';
import Url from '../models/Url';
import { generateQRCode } from '../services/qrCodeService';

const router = express.Router();

// Generate QR Code for a shortened URL
router.get('/qrcode/:shortCode', async (req: Request, res: Response) => {
    const { shortCode } = req.params;

    try {
        const url = await Url.findOne({ shortCode });
        if (!url) {
            return res.status(404).json({ error: 'URL not found' });
        }

        const qrCodeUrl = await generateQRCode(`${process.env.BASE_URL}/${shortCode}`);
        res.json({ qrCodeUrl });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

export default router;
