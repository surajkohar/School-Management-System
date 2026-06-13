import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/userService';
import { getFullImageUrl } from '../config/imageUrl';

const userService = new UserService();

export class UserController {
  async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await userService.getProfile(req.user!.userId);
      res.json({
        success: true,
        data: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          image: getFullImageUrl(req, user.image), // Use helper
          status: user.status
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;
      const { firstName, lastName, email, phone } = req.body;

      // Handle file upload with type assertion
      let image = undefined;
      const file = (req as any).file;

      if (file) {
        image = `/uploads/profiles/${file.filename}`;
      }

      const updateData: any = {
        firstName,
        lastName,
        email,
        phone
      };

      if (image) {
        updateData.image = image;
      }

      const updatedUser = await userService.updateProfile(userId, updateData);

      res.json({
        success: true,
        message: 'Profile updated successfully',
        data: {
          id: updatedUser._id,
          email: updatedUser.email,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          role: updatedUser.role,
          phone: updatedUser.phone,
          image: getFullImageUrl(req, updatedUser.image) // Use helper
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;
      const { currentPassword, newPassword } = req.body;

      await userService.changePassword(userId, currentPassword, newPassword);

      res.json({
        success: true,
        message: 'Password changed successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await userService.getAllUsers();

      res.json({
        success: true,
        data: users.map(user => ({
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          phone: user.phone,
          image: getFullImageUrl(req, user.image), // Use helper
          status: user.status
        }))
      });
    } catch (error) {
      next(error);
    }
  }
}
