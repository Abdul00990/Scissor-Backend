import { Schema, model } from 'mongoose';

export interface IUser {
  username: string;
  email: string;
  password: string;
  roles: string[]; // Array of roles
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: { type: [String], default: ['user'] }, // Default role
});

export default model<IUser>('User', userSchema);
