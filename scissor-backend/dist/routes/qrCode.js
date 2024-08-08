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
import { generateQRCode } from '../services/qrCodeService';
const router = express.Router();
// Generate QR Code for a shortened URL
router.get('/qrcode/:shortCode', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shortCode } = req.params;
    try {
        const url = yield Url.findOne({ shortCode });
        if (!url) {
            return res.status(404).json({ error: 'URL not found' });
        }
        const qrCodeUrl = yield generateQRCode(`${process.env.BASE_URL}/${shortCode}`);
        res.json({ qrCodeUrl });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
export default router;
