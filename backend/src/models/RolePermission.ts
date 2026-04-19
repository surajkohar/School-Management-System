import mongoose, { Document, Schema } from 'mongoose';
import { IRolePermission } from '../interfaces/IRolePermission';

export interface IRolePermissionDocument extends IRolePermission, Document {}

const RolePermissionSchema = new Schema(
  {
    role: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
      required: true
    },
    permission: {
      type: Schema.Types.ObjectId,
      ref: 'Permission',
      required: true
    },
    conditions: {
      type: Schema.Types.Mixed,
      default: null
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

// Compound index to prevent duplicate role-permission pairs
RolePermissionSchema.index({ role: 1, permission: 1 }, { unique: true });
RolePermissionSchema.index({ role: 1 });
RolePermissionSchema.index({ permission: 1 });

export const RolePermissionModel = mongoose.model<IRolePermissionDocument>('RolePermission', RolePermissionSchema);
