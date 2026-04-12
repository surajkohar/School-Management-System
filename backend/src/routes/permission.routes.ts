import { Router } from 'express';
import { PermissionController } from '../controllers/permissionController';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/rbac';

const router = Router();
const permissionController = new PermissionController();

// All routes require authentication and permission management access
router.use(authenticate);
router.use(authorize('permission', 'manage'));

router.get('/', permissionController.getAll);
router.get('/resource/:resource', permissionController.getByResource);
router.get('/:id', permissionController.getById);
router.post('/', permissionController.create);
router.put('/:id', permissionController.update);
router.delete('/:id', permissionController.delete);

export default router;