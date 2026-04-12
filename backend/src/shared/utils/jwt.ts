import jwt from 'jsonwebtoken';
import { env } from '../../config/env';

export interface ITokenPayload {
  userId: string;
  email: string;
  role: string;
  isSuperAdmin: boolean;
}

export const generateToken = (payload: ITokenPayload): string => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN
  });
};

export const verifyToken = (token: string): ITokenPayload => {
  return jwt.verify(token, env.JWT_SECRET) as ITokenPayload;
};
