import { RoleRepository } from '../database/repositories/roleRepository';
import { PermissionRepository } from '../database/repositories/permissionRepository';
import { RolePermissionRepository } from '../database/repositories/rolePermissionRepository';
import { IRoleDocument } from '../interfaces/IRole';
import { NotFoundError, ValidationError } from '../shared/errors/AppError';

export class RoleService {
  private roleRepo: RoleRepository;
  private permissionRepo: PermissionRepository;
  private rolePermissionRepo: RolePermissionRepository;

  constructor() {
    this.roleRepo = new RoleRepository();
    this.permissionRepo = new PermissionRepository();
    this.rolePermissionRepo = new RolePermissionRepository();
  }

  async getAllRoles(): Promise<any[]> {
    const roles = await this.roleRepo.findAll();
    
    // Get permissions for each role
    const rolesWithPermissions = await Promise.all(
      roles.map(async (role) => {
        const permissions = await this.rolePermissionRepo.getPermissionsByRole(role._id!.toString());
        return {
          ...role.toObject(),
          permissions: permissions.map(rp => rp.permission)
        };
      })
    );
    
    return rolesWithPermissions;
  }

  async getRoleById(id: string): Promise<any> {
    const role = await this.roleRepo.findById(id);
    if (!role) throw new NotFoundError('Role not found');

    const permissions = await this.rolePermissionRepo.getPermissionsByRole(id);
    
    return {
      ...role.toObject(),
      permissions: permissions.map(rp => rp.permission)
    };
  }

  async createRole(data: { name: string; description: string; permissionIds?: string[] }): Promise<IRoleDocument> {
    const role = await this.roleRepo.create({
      name: data.name,
      description: data.description
    });

    // Assign permissions if provided
    if (data.permissionIds && data.permissionIds.length > 0) {
      await this.validatePermissions(data.permissionIds);
      await this.rolePermissionRepo.assignPermissions(role._id!.toString(), data.permissionIds);
    }

    return role;
  }

  async updateRole(id: string, data: Partial<{ name: string; description: string; permissionIds: string[] }>): Promise<any> {
    if (data.permissionIds) {
      await this.validatePermissions(data.permissionIds);
    }

    const role = await this.roleRepo.update(id, {
      name: data.name,
      description: data.description
    });

    if (!role) throw new NotFoundError('Role not found');

    // If permissionIds provided, replace all permissions
    if (data.permissionIds) {
      // Remove existing
      await this.rolePermissionRepo.deleteByRole(id);
      // Add new
      await this.rolePermissionRepo.assignPermissions(id, data.permissionIds);
    }

    return this.getRoleById(id);
  }

  async deleteRole(id: string): Promise<void> {
    // First delete all role-permission links
    await this.rolePermissionRepo.deleteByRole(id);
    // Then delete role
    const deleted = await this.roleRepo.delete(id);
    if (!deleted) throw new NotFoundError('Role not found');
  }

  async addPermissionsToRole(roleId: string, permissionIds: string[]): Promise<any> {
    const role = await this.roleRepo.findById(roleId);
    if (!role) throw new NotFoundError('Role not found');

    await this.validatePermissions(permissionIds);
    await this.rolePermissionRepo.assignPermissions(roleId, permissionIds);

    return this.getRoleById(roleId);
  }

  async removePermissionsFromRole(roleId: string, permissionIds: string[]): Promise<any> {
    const role = await this.roleRepo.findById(roleId);
    if (!role) throw new NotFoundError('Role not found');

    await this.rolePermissionRepo.removePermissions(roleId, permissionIds);
    return this.getRoleById(roleId);
  }

  private async validatePermissions(permissionIds: string[]): Promise<void> {
    const permissions = await this.permissionRepo.findByIds(permissionIds);
    if (permissions.length !== permissionIds.length) {
      throw new ValidationError('Some permissions do not exist');
    }
  }
}