import { RoleRepository } from '../database/repositories/roleRepository';
import { PermissionRepository } from '../database/repositories/permissionRepository';
import { RolePermissionRepository } from '../database/repositories/rolePermissionRepository';

export class RBACService {
  private roleRepo: RoleRepository;
  private permissionRepo: PermissionRepository;
  private rolePermissionRepo: RolePermissionRepository;

  constructor() {
    this.roleRepo = new RoleRepository();
    this.permissionRepo = new PermissionRepository();
    this.rolePermissionRepo = new RolePermissionRepository();
  }

  // Check permission - Super Admin bypass
  async checkPermission(userRole: string, isSuperAdmin: boolean, resource: string, action: string): Promise<boolean> {
    // Super Admin has ALL permissions - no check needed
    if (isSuperAdmin) return true;

    // Admin role also has full access (optional)
    if (userRole === 'admin') return true;

    // Get role
    const role = await this.roleRepo.findByName(userRole);
    if (!role || !role.isActive) return false;

    // Get permissions from role_permissions table
    const rolePermissions = await this.rolePermissionRepo.getPermissionsByRole(role._id!.toString());
    
    return rolePermissions.some(rp => {
      const perm = rp.permission as any;
      return (
        perm.resource === resource || perm.resource === '*' ||
        (perm.resource === resource && (perm.action === action || perm.action === '*'))
      );
    });
  }

  // Get permissions for a role - Super Admin gets ALL
  async getRolePermissions(roleName: string, isSuperAdmin: boolean = false) {
    // Super Admin gets ALL permissions
    if (isSuperAdmin) {
      const allPermissions = await this.permissionRepo.findAll();
      return allPermissions.map(p => ({
        id: p._id,
        name: p.name,
        description: p.description,
        resource: p.resource,
        action: p.action,
        isSuperAdmin: true // Flag to indicate super admin access
      }));
    }

    const role = await this.roleRepo.findByName(roleName);
    if (!role) return [];

    const rolePermissions = await this.rolePermissionRepo.getPermissionsByRole(role._id!.toString());
    
    return rolePermissions.map(rp => ({
      id: (rp.permission as any)._id,
      name: (rp.permission as any).name,
      description: (rp.permission as any).description,
      resource: (rp.permission as any).resource,
      action: (rp.permission as any).action,
      conditions: rp.conditions
    }));
  }

  // Get permission IDs - Super Admin gets ALL
  async getRolePermissionIds(roleName: string, isSuperAdmin: boolean = false): Promise<string[]> {
    if (isSuperAdmin) {
      const allPermissions = await this.permissionRepo.findAll();
      return allPermissions.map(p => p._id!.toString());
    }

    const role = await this.roleRepo.findByName(roleName);
    if (!role) return [];
    return this.rolePermissionRepo.getPermissionIdsByRole(role._id!.toString());
  }
}