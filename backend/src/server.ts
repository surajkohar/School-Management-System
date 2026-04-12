import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import { connectDB } from './config/database';
import { env } from './config/env';
import { AppError } from './shared/errors/AppError';
import { SYSTEM_PERMISSIONS } from './shared/constants/permissions';
import { PermissionRepository } from './database/repositories/permissionRepository';
import { RoleRepository } from './database/repositories/roleRepository';

const app: Application = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: err.message
    });
  } else {
    console.error('Unexpected error:', err);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

const initializeSystem = async (): Promise<void> => {
  try {
    // Initialize permissions
    const permissionRepo = new PermissionRepository();
    const existingPermissions = await permissionRepo.findAll();

    if (existingPermissions.length === 0) {
      await permissionRepo.bulkCreate(SYSTEM_PERMISSIONS);
      console.log('✅ System permissions initialized');
    }

    // Initialize default roles (you can expand this)
    const roleRepo = new RoleRepository();
    const existingRoles = await roleRepo.findAll();

    if (existingRoles.length === 0) {
      // Get all permissions for admin
      const allPermissions = await permissionRepo.findAll();
      const allPermissionIds = allPermissions.map(p => p._id!.toString());

      const defaultRoles = [
        {
          name: 'admin',
          description: 'System Administrator with full access',
          permissions: allPermissionIds.map(id => ({ permission: id })),
          isDefault: false,
          isActive: true
        },
        {
          name: 'teacher',
          description: 'Teacher role',
          permissions: [], // Will be assigned via UI/API
          isDefault: false,
          isActive: true
        },
        {
          name: 'student',
          description: 'Student role',
          permissions: [], // Will be assigned via UI/API
          isDefault: true,
          isActive: true
        },
        {
          name: 'parent',
          description: 'Parent role',
          permissions: [], // Will be assigned via UI/API
          isDefault: false,
          isActive: true
        }
      ];

      for (const roleData of defaultRoles) {
        await RoleModel.create(roleData);
      }
      console.log('✅ Default roles initialized');
    }
  } catch (error) {
    console.error('Initialization error:', error);
  }
};

const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    await initializeSystem();

    app.listen(env.PORT, () => {
      console.log(`🚀 Server running on port ${env.PORT}`);
      console.log(`📚 Environment: ${env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

import { RoleModel } from './models/Role';

export default app;
