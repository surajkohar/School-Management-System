import mongoose, { Document, Schema } from 'mongoose';
import { IRole } from '../interfaces/IRole';

export interface IRoleDocument extends IRole, Document {}

const RoleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    description: {
      type: String,
      required: true
    },
    isDefault: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Ensure only one default role
RoleSchema.pre('save', async function (next) {
  if (this.isDefault) {
    await this.model('Role').updateMany({ isDefault: true, _id: { $ne: this._id } }, { isDefault: false });
  }
  next();
});

RoleSchema.index({ name: 1 }, { unique: true });

export const RoleModel = mongoose.model<IRoleDocument>('Role', RoleSchema);
