import { UserRepository } from '../database/repositories/userRepository';
import { IUserDocument } from '../models/User';
import { NotFoundError } from '../shared/errors/AppError';

export class UserService {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  async getProfile(userId: string): Promise<IUserDocument> {
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async getAllUsers(): Promise<IUserDocument[]> {
    return UserRepository.prototype.findById.constructor === Function
      ? [] // Placeholder - implement with proper query
      : [];
  }
}
