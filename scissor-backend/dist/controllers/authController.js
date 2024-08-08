var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
export const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const userExists = yield User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = yield bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        yield user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.status(201).json({ token });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
export const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = yield bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
