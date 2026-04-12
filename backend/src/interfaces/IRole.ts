import { Document } from 'mongoose';
import { IRolePermission } from './IPermission';

export interface IRole {
  name: string;           // e.g., "admin", "teacher", "student"
  description: string;
  permissions: IRolePermission[];  // Array of permission references
  isDefault: boolean;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRoleDocument extends IRole, Document {}

// For creating/updating roles
export interface IRoleInput {
  name: string;
  description: string;
  permissionIds: string[];  // Just array of permission IDs
  isDefault?: boolean;
}