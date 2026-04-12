import { Request, Response, NextFunction } from 'express';
import { RoleService } from '../services/roleService';

const roleService = new RoleService();

export class RoleController {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const roles = await roleService.getAllRoles();
      res.json({ success: true, data: roles });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const role = await roleService.getRoleById(req.params.id);
      res.json({ success: true, data: role });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const role = await roleService.createRole(req.body);
      res.status(201).json({ success: true, data: role });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const role = await roleService.updateRole(req.params.id, req.body);
      res.json({ success: true, data: role });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await roleService.deleteRole(req.params.id);
      res.json({ success: true, message: 'Role deleted' });
    } catch (error) {
      next(error);
    }
  }

  async addPermissions(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { permissionIds } = req.body;
      const role = await roleService.addPermissionsToRole(req.params.id, permissionIds);
      res.json({ success: true, data: role });
    } catch (error) {
      next(error);
    }
  }

  async removePermissions(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { permissionIds } = req.body;
      const role = await roleService.removePermissionsFromRole(req.params.id, permissionIds);
      res.json({ success: true, data: role });
    } catch (error) {
      next(error);
    }
  }
}