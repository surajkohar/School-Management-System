import { z } from 'zod';

export const createPermissionSchema = z.object({
  name: z.string().min(3, 'Permission name must be at least 3 characters').toUpperCase(),
  description: z.string().min(5, 'Description must be at least 5 characters'),
  resource: z.string().min(2, 'Resource name required').toLowerCase(),
  action: z.enum(['create', 'read', 'update', 'delete', 'manage', 'approve', 'reject', 'export', 'import'])
});

export type CreatePermissionInput = z.infer<typeof createPermissionSchema>;