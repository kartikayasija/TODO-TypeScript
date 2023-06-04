import { Schema, model } from 'mongoose';
import { IUser } from '../interface/user';

const userSchema = new Schema<IUser> ({
  email: { type: String, required: true },
  password: {type: String, required: true}
})

export const User = model<IUser>('User', userSchema);