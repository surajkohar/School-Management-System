import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../shared/utils/jwt';
import { UnauthorizedError } from '../shared/errors/AppError';
import { ITokenPayload } from '../interfaces/IAuth';

// Extend Express Request
declare global {
  namespace Express {
    interface Request {
      user?: ITokenPayload & { isSuperAdmin?: boolean };    // ← ADDED isSuperAdmin
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedError('No token provided');
    }

    const token = authHeader.substring(7);
    const payload = verifyToken(token);
    
    req.user = payload;
    next();
  } catch (error) {
    next(new UnauthorizedError('Invalid token'));
  }
};