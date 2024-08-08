var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { nanoid } from 'nanoid';
import validUrl from 'valid-url';
import Url from '../models/Url';
import { generateQRCode } from './qrCodeService'; // Import QR code generation service
const baseUrl = process.env.BASE_URL || 'http://localhost:5001';
export const shortenUrl = (originalUrl, customCode) => __awaiter(void 0, void 0, void 0, function* () {
    if (!validUrl.isUri(originalUrl)) {
        throw new Error('Invalid URL');
    }
    let url = yield Url.findOne({ originalUrl });
    if (url) {
        return url;
    }
    const shortCode = customCode || nanoid(7);
    url = new Url({
        originalUrl,
        shortCode,
        customCode: customCode || null,
        createdAt: new Date(),
    });
    yield url.save();
    const qrCodeUrl = yield generateQRCode(`${baseUrl}/${shortCode}`);
    return {
        shortUrl: `${baseUrl}/${shortCode}`,
        originalUrl,
        qrCodeUrl, // Include QR code URL in the response
    };
});
