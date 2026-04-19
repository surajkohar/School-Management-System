import { Request, Response, NextFunction } from 'express';
import { RBACService } from '../services/rbacService';
import { ForbiddenError } from '../shared/errors/AppError';

const rbacService = new RBACService();

export const authorize = (resource: string, action: string) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        throw new ForbiddenError('Authentication required');
      }

      // Super Admin bypass - no permission check needed
      if (req.user.isSuperAdmin) {
        return next();
      }

      // Check permission
      const hasPermission = await rbacService.checkPermission(
        req.user.role,
        req.user.isSuperAdmin, // Pass isSuperAdmin flag
        resource,
        action
      );

      if (!hasPermission) {
        throw new ForbiddenError(`Insufficient permissions: ${resource}.${action}`);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

// Check specific permission by name
export const requirePermission = (permissionName: string) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        throw new ForbiddenError('Authentication required');
      }

      // Super Admin bypass
      if (req.user.isSuperAdmin) {
        return next();
      }

      const permissions = await rbacService.getRolePermissions(req.user.role, false);

      const hasPermission = permissions.some((p: any) => p.name === permissionName);
      if (!hasPermission) {
        throw new ForbiddenError(`Permission required: ${permissionName}`);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

// Check multiple roles
export const requireRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new ForbiddenError('Authentication required');
    }

    // Super Admin bypass
    if (req.user.isSuperAdmin) {
      return next();
    }

    if (!roles.includes(req.user.role)) {
      throw new ForbiddenError(`Required role: ${roles.join(' or ')}`);
    }

    next();
  };
};
