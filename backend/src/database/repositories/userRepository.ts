import { UserModel, IUserDocument } from '../../models/User';
import { IUser, IUserInput } from '../../interfaces/IUser';

export class UserRepository {
  async findById(id: string): Promise<IUserDocument | null> {
    return UserModel.findById(id);
  }

  async findByEmail(email: string): Promise<IUserDocument | null> {
    return UserModel.findOne({ email: email.toLowerCase() });
  }

  async create(userData: IUserInput & { password: string; role: string }): Promise<IUserDocument> {
    return UserModel.create({
      ...userData,
      isSuperAdmin: userData.isSuperAdmin || false // ← DEFAULT FALSE
    });
  }

  async update(id: string, data: Partial<IUser>): Promise<IUserDocument | null> {
    return UserModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await UserModel.findByIdAndDelete(id);
    return !!result;
  }

  async exists(email: string): Promise<boolean> {
    const count = await UserModel.countDocuments({ email: email.toLowerCase() });
    return count > 0;
  }

  // ← NEW: Find super admin
  async findSuperAdmins(): Promise<IUserDocument[]> {
    return UserModel.find({ isSuperAdmin: true });
  }
}
