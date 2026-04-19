import { Document } from 'mongoose';

export interface IRolePermission {
  role: string; // Role ID
  permission: string; // Permission ID
  conditions?: {
    // Optional conditions
    [key: string]: any;
  };
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRolePermissionDocument extends IRolePermission, Document {}

// For creating role-permission links
export interface IRolePermissionInput {
  roleId: string;
  permissionIds: string[];
  conditions?: { [key: string]: any };
}
