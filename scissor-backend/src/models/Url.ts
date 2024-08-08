import { Schema, model, Document } from 'mongoose';

interface IUrl extends Document {
  originalUrl: string;
  shortCode: string;
  customCode?: string;
  createdAt: Date;
  expiresAt?: Date;  // Optional expiry date
  clickCount: number;
  lastAccessed?: Date;
}

const urlSchema = new Schema<IUrl>({
  originalUrl: { type: String, required: true, unique: true },
  shortCode: { type: String, required: true, unique: true },
  customCode: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, default: null }, // Field for expiry date
  clickCount: { type: Number, default: 0 },
  lastAccessed: { type: Date, default: null }
});

const Url = model<IUrl>('Url', urlSchema);
export default Url;
