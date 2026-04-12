// models/User.ts

import mongoose, { Schema, Document } from 'mongoose';
import { IUser, UserStatus } from '../interfaces/IUser';

export interface IUserDocument extends IUser, Document {}

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    password: { type: String, required: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    role: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
      required: true
    },
    isSuperAdmin: { type: Boolean, default: false },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.ACTIVE
    },
    isEmailVerified: { type: Boolean, default: false },
    lastLoginAt: { type: Date }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ role: 1 });
UserSchema.index({ isSuperAdmin: 1 });

// Auto-populate role
UserSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'role',
    select: 'name description permissions'
  });
  next();
});

export const UserModel = mongoose.model<IUserDocument>('User', UserSchema);
