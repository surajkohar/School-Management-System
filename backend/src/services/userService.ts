import { UserRepository } from '../database/repositories/userRepository';
import { IUserDocument } from '../models/User';
import { NotFoundError, ValidationError, UnauthorizedError } from '../shared/errors/AppError';
import bcrypt from 'bcrypt';

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

  async updateProfile(userId: string, updateData: Partial<IUserDocument>): Promise<IUserDocument> {
    // Validate userId
    if (!userId) {
      throw new ValidationError('User ID is required');
    }

    // Find user
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    // Email validation if being updated
    if (updateData.email) {
      // Check email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(updateData.email)) {
        throw new ValidationError('Invalid email format');
      }

      // Check if email is already taken by another user
      if (updateData.email.toLowerCase() !== user.email) {
        const existingUser = await this.userRepo.findByEmail(updateData.email);
        if (existingUser && existingUser._id.toString() !== userId) {
          throw new ValidationError('Email already in use');
        }
      }
      updateData.email = updateData.email.toLowerCase();
    }

    // Name validation
    if (updateData.firstName && updateData.firstName.length < 2) {
      throw new ValidationError('First name must be at least 2 characters long');
    }

    if (updateData.lastName && updateData.lastName.length < 2) {
      throw new ValidationError('Last name must be at least 2 characters long');
    }

    // Phone validation (optional)
    if (updateData.phone && updateData.phone.length < 10) {
      throw new ValidationError('Phone number must be at least 10 characters long');
    }

    // Update user
    const updatedUser = await this.userRepo.update(userId, updateData);
    if (!updatedUser) {
      throw new NotFoundError('User not found');
    }

    return updatedUser;
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Current password is incorrect');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await this.userRepo.update(userId, { password: hashedPassword });
  }

  async getAllUsers(): Promise<IUserDocument[]> {
    return this.userRepo.findAll();
  }
}
