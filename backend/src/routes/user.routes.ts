import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { authenticate } from '../middleware/auth';
import { authorize, requireRole } from '../middleware/rbac';

const router = Router();
const userController = new UserController();

// Protected routes
router.get('/profile', authenticate, userController.getProfile);

// Admin only
router.get('/all', authenticate, requireRole('admin'), userController.getAllUsers);

// Teacher/Admin can access students
router.get('/students', authenticate, authorize('students', 'read'), (req, res) => {
  res.json({ message: 'Students list' });
});

export default router;
