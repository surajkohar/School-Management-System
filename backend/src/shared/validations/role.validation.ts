import { z } from 'zod';

export const createRoleSchema = z.object({
  name: z.string().min(2, 'Role name must be at least 2 characters'),
  description: z.string().min(5, 'Description must be at least 5 characters'),
  permissionIds: z.array(z.string()).optional().default([]),
  isDefault: z.boolean().optional().default(false)
});

export const updateRoleSchema = createRoleSchema.partial();

export const assignPermissionsSchema = z.object({
  permissionIds: z.array(z.string()).min(1, 'At least one permission ID required')
});

export type CreateRoleInput = z.infer<typeof createRoleSchema>;
export type UpdateRoleInput = z.infer<typeof updateRoleSchema>;