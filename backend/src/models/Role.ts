// models/Role.ts - FIXED
import mongoose, { Schema } from 'mongoose';
import { IRoleDocument } from '../interfaces/IRole';

const RolePermissionSchema = new Schema(
  {
    permission: {
      type: Schema.Types.ObjectId,
      ref: 'Permission',
      required: true
    },
    conditions: { type: Schema.Types.Mixed, default: null }
  },
  { _id: false }
);

const RoleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true
    },
    description: { type: String, required: true },
    permissions: [RolePermissionSchema],
    isDefault: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Keep only this index
RoleSchema.index({ name: 1 }, { unique: true }); // ← Define here only

// Ensure only one default role
RoleSchema.pre('save', async function (next) {
  if (this.isDefault) {
    await this.model('Role').updateMany({ isDefault: true, _id: { $ne: this._id } }, { isDefault: false });
  }
  next();
});

export const RoleModel = mongoose.model<IRoleDocument>('Role', RoleSchema);
