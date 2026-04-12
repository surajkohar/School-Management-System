// models/Permission.ts

import mongoose, { Schema, Document } from 'mongoose';
import { IPermission } from '../interfaces/IPermission';

export interface IPermissionDocument extends IPermission, Document {}

const PermissionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      uppercase: true
    },
    description: { type: String, required: true },
    resource: {
      type: String,
      required: true,
      lowercase: true
    },
    action: {
      type: String,
      required: true,
      enum: ['create', 'read', 'update', 'delete', 'manage', 'approve', 'reject', 'export', 'import']
    },
    isActive: { type: Boolean, default: true }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

PermissionSchema.index({ name: 1 }, { unique: true });
PermissionSchema.index({ resource: 1, action: 1 }, { unique: true });

export const PermissionModel = mongoose.model<IPermissionDocument>('Permission', PermissionSchema);
