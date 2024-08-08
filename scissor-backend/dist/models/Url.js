import { Schema, model } from 'mongoose';
const urlSchema = new Schema({
    originalUrl: {
        type: String,
        required: true,
        unique: true,
    },
    shortCode: {
        type: String,
        required: true,
        unique: true,
    },
    customCode: {
        type: String,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const Url = model('Url', urlSchema);
export default Url;
