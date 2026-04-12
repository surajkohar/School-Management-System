import { RoleModel, IRoleDocument } from '../../models/Role';
import { IRole, IRoleInput } from '../../interfaces/IRole';

export class RoleRepository {
  async findAll(): Promise<IRoleDocument[]> {
    return RoleModel.find().populate('permissions.permission');
  }

  async findById(id: string): Promise<IRoleDocument | null> {
    return RoleModel.findById(id).populate('permissions.permission');
  }

  async findByName(name: string): Promise<IRoleDocument | null> {
    return RoleModel.findOne({ name: name.toLowerCase() }).populate('permissions.permission');
  }

  async findDefault(): Promise<IRoleDocument | null> {
    return RoleModel.findOne({ isDefault: true }).populate('permissions.permission');
  }

  async create(roleData: IRoleInput): Promise<IRoleDocument> {
    const role = new RoleModel({
      name: roleData.name,
      description: roleData.description,
      isDefault: roleData.isDefault || false,
      permissions: roleData.permissionIds.map(id => ({ permission: id }))
    });
    return role.save();
  }

  async update(id: string, roleData: Partial<IRoleInput>): Promise<IRoleDocument | null> {
    const updateData: any = {};
    
    if (roleData.name) updateData.name = roleData.name;
    if (roleData.description) updateData.description = roleData.description;
    if (roleData.isDefault !== undefined) updateData.isDefault = roleData.isDefault;
    if (roleData.permissionIds) {
      updateData.permissions = roleData.permissionIds.map(id => ({ permission: id }));
    }

    return RoleModel.findByIdAndUpdate(id, updateData, { new: true }).populate('permissions.permission');
  }

  async delete(id: string): Promise<boolean> {
    const result = await RoleModel.findByIdAndDelete(id);
    return !!result;
  }

  async addPermissions(roleId: string, permissionIds: string[]): Promise<IRoleDocument | null> {
    const permissionsToAdd = permissionIds.map(id => ({ permission: id }));
    
    return RoleModel.findByIdAndUpdate(
      roleId,
      { $addToSet: { permissions: { $each: permissionsToAdd } } },
      { new: true }
    ).populate('permissions.permission');
  }

  async removePermissions(roleId: string, permissionIds: string[]): Promise<IRoleDocument | null> {
    return RoleModel.findByIdAndUpdate(
      roleId,
      { $pull: { permissions: { permission: { $in: permissionIds } } } },
      { new: true }
    ).populate('permissions.permission');
  }

  async initializeRoles(roles: any[]): Promise<void> {
    const count = await RoleModel.countDocuments();
    if (count === 0) {
      await RoleModel.insertMany(roles);
      console.log('✅ Default roles created');
    }
  }
}