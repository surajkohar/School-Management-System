import { RoleRepository } from '../database/repositories/roleRepository';
import { PermissionRepository } from '../database/repositories/permissionRepository';
import { IRoleDocument } from '../interfaces/IRole';
import { NotFoundError, ValidationError } from '../shared/errors/AppError';

export class RoleService {
  private roleRepo: RoleRepository;
  private permissionRepo: PermissionRepository;

  constructor() {
    this.roleRepo = new RoleRepository();
    this.permissionRepo = new PermissionRepository();
  }

  async getAllRoles(): Promise<IRoleDocument[]> {
    return this.roleRepo.findAll();
  }

  async getRoleById(id: string): Promise<IRoleDocument> {
    const role = await this.roleRepo.findById(id);
    if (!role) throw new NotFoundError('Role not found');
    return role;
  }

  async createRole(data: {
    name: string;
    description: string;
    permissionIds: string[];
    isDefault?: boolean;
  }): Promise<IRoleDocument> {
    // Validate permissions exist
    if (data.permissionIds.length > 0) {
      const permissions = await this.permissionRepo.findByIds(data.permissionIds);
      if (permissions.length !== data.permissionIds.length) {
        throw new ValidationError('Some permissions do not exist');
      }
    }

    return this.roleRepo.create({
      name: data.name,
      description: data.description,
      permissionIds: data.permissionIds,
      isDefault: data.isDefault
    });
  }

  async updateRole(
    id: string,
    data: Partial<{
      name: string;
      description: string;
      permissionIds: string[];
      isDefault: boolean;
    }>
  ): Promise<IRoleDocument> {
    if (data.permissionIds) {
      const permissions = await this.permissionRepo.findByIds(data.permissionIds);
      if (permissions.length !== data.permissionIds.length) {
        throw new ValidationError('Some permissions do not exist');
      }
    }

    const role = await this.roleRepo.update(id, data);
    if (!role) throw new NotFoundError('Role not found');
    return role;
  }

  async deleteRole(id: string): Promise<void> {
    const deleted = await this.roleRepo.delete(id);
    if (!deleted) throw new NotFoundError('Role not found');
  }

  async addPermissionsToRole(roleId: string, permissionIds: string[]): Promise<IRoleDocument> {
    const role = await this.roleRepo.addPermissions(roleId, permissionIds);
    if (!role) throw new NotFoundError('Role not found');
    return role;
  }

  async removePermissionsFromRole(roleId: string, permissionIds: string[]): Promise<IRoleDocument> {
    const role = await this.roleRepo.removePermissions(roleId, permissionIds);
    if (!role) throw new NotFoundError('Role not found');
    return role;
  }
}