import { PermissionRepository } from '../repositories/permissionRepository';
import { RoleRepository } from '../repositories/roleRepository';
import { RolePermissionRepository } from '../repositories/rolePermissionRepository';
import { UserRepository } from '../repositories/userRepository';
import { SYSTEM_PERMISSIONS } from '../../shared/constants/permissions';
import { hashPassword } from '../../shared/utils/password';

export class DatabaseSeeder {
  private permissionRepo: PermissionRepository;
  private roleRepo: RoleRepository;
  private rolePermissionRepo: RolePermissionRepository;
  private userRepo: UserRepository;

  constructor() {
    this.permissionRepo = new PermissionRepository();
    this.roleRepo = new RoleRepository();
    this.rolePermissionRepo = new RolePermissionRepository();
    this.userRepo = new UserRepository();
  }

  async seedAll(): Promise<void> {
    console.log('🌱 Starting Database Seeding...');

    try {
      await this.seedPermissions();
      await this.seedRoles();
      await this.seedRolePermissions();
      await this.seedSuperAdmin();

      console.log('✅ Database Seeding Completed Successfully!');
    } catch (error) {
      console.error('❌ Seeding Failed:', error);
      throw error;
    }
  }

  private async seedPermissions(): Promise<void> {
    const existing = await this.permissionRepo.findAll();
    if (existing.length > 0) {
      console.log('ℹ️ Permissions already exist, skipping...');
      return;
    }

    await this.permissionRepo.bulkCreate(SYSTEM_PERMISSIONS);
    console.log(`✅ Created ${SYSTEM_PERMISSIONS.length} permissions`);
  }

  private async seedRoles(): Promise<void> {
    const existing = await this.roleRepo.findAll();
    if (existing.length > 0) {
      console.log('ℹ️ Roles already exist, skipping...');
      return;
    }

    const roles = [
      { name: 'admin', description: 'System Administrator', isDefault: false, isActive: true },
      { name: 'teacher', description: 'Teacher role', isDefault: false, isActive: true },
      { name: 'student', description: 'Student role', isDefault: true, isActive: true },
      { name: 'parent', description: 'Parent role', isDefault: false, isActive: true }
    ];

    for (const roleData of roles) {
      await this.roleRepo.create(roleData);
    }
    console.log(`✅ Created ${roles.length} roles`);
  }

  private async seedRolePermissions(): Promise<void> {
    const adminRole = await this.roleRepo.findByName('admin');
    if (!adminRole) return;

    // Check if admin already has permissions
    const adminPerms = await this.rolePermissionRepo.getPermissionsByRole(adminRole._id!.toString());
    if (adminPerms.length > 0) {
      console.log('ℹ️ Role permissions already exist, skipping...');
      return;
    }

    // Get all permissions
    const allPermissions = await this.permissionRepo.findAll();
    const allPermissionIds = allPermissions.map(p => p._id!.toString());

    // Assign ALL permissions to admin role (for non-super admin users with admin role)
    await this.rolePermissionRepo.assignPermissions(adminRole._id!.toString(), allPermissionIds);
    console.log(`✅ Assigned ${allPermissionIds.length} permissions to admin role`);

    // Assign basic permissions to student role
    const studentRole = await this.roleRepo.findByName('student');
    if (studentRole) {
      const studentPerms = allPermissions
        .filter(p => p.resource === 'profile' || (p.resource === 'grade' && p.action === 'read'))
        .map(p => p._id!.toString());

      if (studentPerms.length > 0) {
        await this.rolePermissionRepo.assignPermissions(studentRole._id!.toString(), studentPerms);
        console.log(`✅ Assigned ${studentPerms.length} permissions to student role`);
      }
    }

    // NOTE: No permissions assigned to super admin in role_permission table
    // because isSuperAdmin flag bypasses all permission checks!
  }

  private async seedSuperAdmin(): Promise<void> {
    const existing = await this.userRepo.findByEmail('admin@school.com');
    if (existing) {
      console.log('ℹ️ Super Admin already exists, skipping...');
      return;
    }

    const adminRole = await this.roleRepo.findByName('admin');
    if (!adminRole) {
      console.error('❌ Admin role not found, cannot create super admin');
      return;
    }

    const hashedPassword = await hashPassword('admin123');

    await this.userRepo.create({
      email: 'admin@school.com',
      password: hashedPassword,
      firstName: 'Super',
      lastName: 'Admin',
      role: adminRole._id!.toString(),
      isSuperAdmin: true, // ← This flag gives ALL permissions automatically!
      status: 'active',
      isEmailVerified: true
    });

    console.log('✅ Super Admin created: admin@school.com / admin123');
    console.log('ℹ️ Super Admin has ALL permissions via isSuperAdmin flag (no role_permission entries needed)');
  }
}
