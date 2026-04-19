import { RolePermissionModel, IRolePermissionDocument } from '../../models/RolePermission';
import { IRolePermissionInput } from '../../interfaces/IRolePermission';

export class RolePermissionRepository {
  // Assign permissions to role
  async assignPermissions(roleId: string, permissionIds: string[]): Promise<IRolePermissionDocument[]> {
    const rolePermissions = permissionIds.map(permissionId => ({
      role: roleId,
      permission: permissionId,
      isActive: true
    }));

    // Use insertMany with ordered: false to skip duplicates
    return RolePermissionModel.insertMany(rolePermissions, { ordered: false });
  }

  // Remove permissions from role
  async removePermissions(roleId: string, permissionIds: string[]): Promise<void> {
    await RolePermissionModel.deleteMany({
      role: roleId,
      permission: { $in: permissionIds }
    });
  }

  // Get all permissions for a role
  async getPermissionsByRole(roleId: string): Promise<IRolePermissionDocument[]> {
    return RolePermissionModel.find({ role: roleId, isActive: true })
      .populate('permission', 'name description resource action')
      .populate('role', 'name description');
  }

  // Get all roles that have a specific permission
  async getRolesByPermission(permissionId: string): Promise<IRolePermissionDocument[]> {
    return RolePermissionModel.find({ permission: permissionId, isActive: true })
      .populate('role', 'name description')
      .populate('permission', 'name description resource action');
  }

  // Check if role has specific permission
  async hasPermission(roleId: string, permissionId: string): Promise<boolean> {
    const count = await RolePermissionModel.countDocuments({
      role: roleId,
      permission: permissionId,
      isActive: true
    });
    return count > 0;
  }

  // Get permission IDs for a role (for quick checks)
  async getPermissionIdsByRole(roleId: string): Promise<string[]> {
    const rolePerms = await RolePermissionModel.find({ role: roleId, isActive: true }).select('permission');
    return rolePerms.map(rp => rp.permission.toString());
  }

  // Delete all permissions for a role (when role is deleted)
  async deleteByRole(roleId: string): Promise<void> {
    await RolePermissionModel.deleteMany({ role: roleId });
  }

  // Delete all role links for a permission (when permission is deleted)
  async deleteByPermission(permissionId: string): Promise<void> {
    await RolePermissionModel.deleteMany({ permission: permissionId });
  }
}
