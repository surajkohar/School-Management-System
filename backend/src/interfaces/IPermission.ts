// interfaces/IPermission.ts

import { Document } from 'mongoose';

export interface IPermission {
  name: string;
  description: string;
  resource: string;
  action: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// This interface now works correctly
export interface IPermissionDocument extends IPermission, Document {}

// For assigning permissions to role
export interface IRolePermission {
  permission: string;
  conditions?: {
    [key: string]: any;
  };
}