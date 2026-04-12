import { Router } from 'express';
import { RoleController } from '../controllers/roleController';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/rbac';

const router = Router();
const roleController = new RoleController();

// All routes require authentication
router.use(authenticate);

// Role management requires role permissions
router.get('/', authorize('role', 'read'), roleController.getAll);
router.get('/:id', authorize('role', 'read'), roleController.getById);
router.post('/', authorize('role', 'create'), roleController.create);
router.put('/:id', authorize('role', 'update'), roleController.update);
router.delete('/:id', authorize('role', 'delete'), roleController.delete);

// Permission assignment within role
router.post('/:id/permissions', authorize('role', 'update'), roleController.addPermissions);
router.delete('/:id/permissions', authorize('role', 'update'), roleController.removePermissions);

export default router;