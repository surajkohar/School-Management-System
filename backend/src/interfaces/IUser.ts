import { Document } from 'mongoose';
import { IRole } from './IRole';

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended'
}

export interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string | IRole;
  isSuperAdmin: boolean;
  status: UserStatus;
  isEmailVerified: boolean;
  lastLoginAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserDocument extends IUser, Document {}

export interface IUserInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;
  status: string;
  isSuperAdmin?: boolean;
  isEmailVerified?: boolean;
}
