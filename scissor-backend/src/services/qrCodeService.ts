import QRCode from 'qrcode';

// Function to generate QR code URL
export const generateQRCode = async (shortUrl: string): Promise<string> => {
  try {
    const qrCodeUrl = await QRCode.toDataURL(shortUrl);
    return qrCodeUrl;
  } catch (err) {
    throw new Error('Error generating QR code');
  }
};
