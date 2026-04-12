import { RoleRepository } from '../database/repositories/roleRepository';

export class RBACService {
  private roleRepo: RoleRepository;

  constructor() {
    this.roleRepo = new RoleRepository();
  }

  async checkPermission(userRole: string, resource: string, action: string): Promise<boolean> {
    if (userRole === 'admin') return true;

    const role = await this.roleRepo.findByName(userRole);
    if (!role) return false;

    const permission = role.permissions.find(p => 
      p.resource === resource || p.resource === '*'
    );
    
    if (!permission) return false;
    
    return permission.actions.includes(action) || 
           permission.actions.includes('*');
  }

  async getRolePermissions(roleName: string) {
    const role = await this.roleRepo.findByName(roleName);
    return role?.permissions || [];
  }
}