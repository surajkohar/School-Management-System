import { Request, Response, NextFunction } from 'express';
import { RoleRepository } from '../database/repositories/roleRepository';
import { ForbiddenError } from '../shared/errors/AppError';

const roleRepo = new RoleRepository();

export const authorize = (resource: string, action: string) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        throw new ForbiddenError('Authentication required');
      }

      // ← SUPER ADMIN BYPASS - No permission check needed
      if (req.user.isSuperAdmin) {
        return next();
      }

      // Admin role also has full access (optional, remove if not needed)
      if (req.user.role === 'admin') {
        return next();
      }

      // Get role with permissions
      const role = await roleRepo.findByName(req.user.role);
      if (!role || !role.isActive) {
        throw new ForbiddenError('Role not found or inactive');
      }

      // Check if role has the required permission
      const hasPermission = role.permissions.some(rp => {
        const perm = rp.permission as any;
        return (
          perm.resource === resource ||
          perm.resource === '*' ||
          (perm.resource === resource && (perm.action === action || perm.action === '*'))
        );
      });

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

      // ← SUPER ADMIN BYPASS
      if (req.user.isSuperAdmin) {
        return next();
      }

      const role = await roleRepo.findByName(req.user.role);
      if (!role) {
        throw new ForbiddenError('Role not found');
      }

      const hasPermission = role.permissions.some(rp => {
        const perm = rp.permission as any;
        return perm.name === permissionName;
      });

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

    // ← SUPER ADMIN BYPASS
    if (req.user.isSuperAdmin) {
      return next();
    }

    if (!roles.includes(req.user.role)) {
      throw new ForbiddenError(`Required role: ${roles.join(' or ')}`);
    }

    next();
  };
};
