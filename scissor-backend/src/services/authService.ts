import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';

export const registerUser = async (username: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid email or password');
  }
  const token = jwt.sign({ id: user._id, roles: user.roles }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  return { user, token };
};
