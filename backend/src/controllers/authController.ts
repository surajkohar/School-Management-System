import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';
import { RBACService } from '../services/rbacService';

const authService = new AuthService();
const rbacService = new RBACService();

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await authService.register(req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await authService.login(req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.json({ success: true, data: { user: req.user } });
    } catch (error) {
      next(error);
    }
  }

  async getMyPermissions(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      // Pass isSuperAdmin flag to get ALL permissions if super admin
      const permissions = await rbacService.getRolePermissions(req.user.role, req.user.isSuperAdmin);

      res.json({
        success: true,
        data: {
          role: req.user.role,
          isSuperAdmin: req.user.isSuperAdmin,
          permissions
        }
      });
    } catch (error) {
      next(error);
    }
  }
}
