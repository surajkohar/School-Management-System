import { Request, Response, NextFunction } from 'express';
import { PermissionService } from '../services/permissionService';

const permissionService = new PermissionService();

export class PermissionController {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const permissions = await permissionService.getAllPermissions();
      res.json({ success: true, data: permissions });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const permission = await permissionService.getPermissionById(req.params.id);
      res.json({ success: true, data: permission });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const permission = await permissionService.createPermission(req.body);
      res.status(201).json({ success: true, data: permission });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const permission = await permissionService.updatePermission(req.params.id, req.body);
      res.json({ success: true, data: permission });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await permissionService.deletePermission(req.params.id);
      res.json({ success: true, message: 'Permission deleted' });
    } catch (error) {
      next(error);
    }
  }

  async getByResource(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const permissions = await permissionService.getPermissionsByResource(req.params.resource);
      res.json({ success: true, data: permissions });
    } catch (error) {
      next(error);
    }
  }
}