import { RoleModel, IRoleDocument } from '../../models/Role';
import { IRoleInput } from '../../interfaces/IRole';

export class RoleRepository {
  async findAll(): Promise<IRoleDocument[]> {
    return RoleModel.find();
  }

  async findById(id: string): Promise<IRoleDocument | null> {
    return RoleModel.findById(id);
  }

  async findByName(name: string): Promise<IRoleDocument | null> {
    return RoleModel.findOne({ name: name.toLowerCase() });
  }

  async findDefault(): Promise<IRoleDocument | null> {
    return RoleModel.findOne({ isDefault: true });
  }

  async create(roleData: IRoleInput): Promise<IRoleDocument> {
    return RoleModel.create(roleData);
  }

  async update(id: string, data: Partial<IRoleInput>): Promise<IRoleDocument | null> {
    return RoleModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await RoleModel.findByIdAndDelete(id);
    return !!result;
  }
}