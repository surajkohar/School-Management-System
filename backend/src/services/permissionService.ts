import { PermissionRepository } from '../database/repositories/permissionRepository';
import { IPermission, IPermissionDocument } from '../interfaces/IPermission';
import { NotFoundError } from '../shared/errors/AppError';

export class PermissionService {
  private permissionRepo: PermissionRepository;

  constructor() {
    this.permissionRepo = new PermissionRepository();
  }

  async getAllPermissions(): Promise<IPermissionDocument[]> {
    return this.permissionRepo.findAll();
  }

  async getPermissionById(id: string): Promise<IPermissionDocument> {
    const permission = await this.permissionRepo.findById(id);
    if (!permission) throw new NotFoundError('Permission not found');
    return permission;
  }

  async createPermission(data: IPermission): Promise<IPermissionDocument> {
    // Auto-generate name from resource and action
    if (!data.name) {
      data.name = `${data.resource}_${data.action}`.toUpperCase();
    }
    return this.permissionRepo.create(data);
  }

  async updatePermission(id: string, data: Partial<IPermission>): Promise<IPermissionDocument> {
    const permission = await this.permissionRepo.update(id, data);
    if (!permission) throw new NotFoundError('Permission not found');
    return permission;
  }

  async deletePermission(id: string): Promise<void> {
    const deleted = await this.permissionRepo.delete(id);
    if (!deleted) throw new NotFoundError('Permission not found');
  }

  async bulkCreatePermissions(permissions: IPermission[]): Promise<IPermissionDocument[]> {
    return this.permissionRepo.bulkCreate(permissions);
  }

  async getPermissionsByResource(resource: string): Promise<IPermissionDocument[]> {
    return this.permissionRepo.findByResource(resource);
  }
}