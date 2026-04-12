import { PermissionModel, IPermissionDocument } from '../../models/Permission';
import { IPermission } from '../../interfaces/IPermission';

export class PermissionRepository {
    
  async findAll(): Promise<IPermissionDocument[]> {
    return PermissionModel.find().sort({ resource: 1, action: 1 });
  }

  async findById(id: string): Promise<IPermissionDocument | null> {
    return PermissionModel.findById(id);
  }

  async findByName(name: string): Promise<IPermissionDocument | null> {
    return PermissionModel.findOne({ name: name.toUpperCase() });
  }

  async findByResource(resource: string): Promise<IPermissionDocument[]> {
    return PermissionModel.find({ resource: resource.toLowerCase() });
  }

  async create(permissionData: IPermission): Promise<IPermissionDocument> {
    return PermissionModel.create(permissionData);
  }

  async update(id: string, data: Partial<IPermission>): Promise<IPermissionDocument | null> {
    return PermissionModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await PermissionModel.findByIdAndDelete(id);
    return !!result;
  }

  async bulkCreate(permissions: IPermission[]): Promise<IPermissionDocument[]> {
    return PermissionModel.insertMany(permissions, { ordered: false });
  }

  async findByIds(ids: string[]): Promise<IPermissionDocument[]> {
    return PermissionModel.find({ _id: { $in: ids } });
  }
}