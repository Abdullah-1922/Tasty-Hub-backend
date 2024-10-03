/* eslint-disable no-useless-escape */
// models/User.ts
import mongoose, { Schema } from 'mongoose';
import { IUser } from './user.interface';
import { validateEmail } from './user.utils';
import bcrypt from 'bcryptjs';
import config from '../../config';


const userSchema: Schema<IUser> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    // unique: true,
    required: true,
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  image: { type: String },
  followers: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
  recipePublished: {
    type: [Schema.Types.ObjectId],
    ref: 'Recipe',
    default: [],
  },
  socialLinks: {
    type: [
      {
        name: { type: String, enum: ['facebook', 'instagram'] },
        link: { type: String },
      },
    ],
  },
  isPremium: { type: Boolean,default:false },
});

userSchema.pre('save', async function (next) {
  
  if (this.isModified('password') && this.password) {
    const salt = await bcrypt.genSalt(Number(config.bcrypt_salt_rounds) );
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

export const User = mongoose.model<IUser>('User', userSchema);
