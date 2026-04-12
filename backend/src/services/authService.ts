import { UserRepository } from '../database/repositories/userRepository';
import { RoleRepository } from '../database/repositories/roleRepository';
import { hashPassword, comparePassword } from '../shared/utils/password';
import { generateToken } from '../shared/utils/jwt';
import { AppError, ValidationError } from '../shared/errors/AppError';
import { IRegisterInput, ILoginInput, IAuthResponse } from '../interfaces/IAuth';

export class AuthService {
  private userRepo: UserRepository;
  private roleRepo: RoleRepository;

  constructor() {
    this.userRepo = new UserRepository();
    this.roleRepo = new RoleRepository();
  }

  async register(data: IRegisterInput & { isSuperAdmin?: boolean }): Promise<IAuthResponse> {
    // Check if user exists
    const exists = await this.userRepo.exists(data.email);
    if (exists) {
      throw new AppError('Email already registered', 409);
    }

    // Get default role
    const defaultRole = await this.roleRepo.findDefault();
    if (!defaultRole) {
      throw new AppError('Default role not configured', 500);
    }

    // Hash password
    const hashedPassword = await hashPassword(data.password);

    // Create user (isSuperAdmin defaults to false)
    const user = await this.userRepo.create({
      email: data.email,
      password: hashedPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      role: defaultRole._id!.toString(),
      isSuperAdmin: data.isSuperAdmin || false // ← HANDLE isSuperAdmin
    });

    // Get role name
    const roleName = typeof user.role === 'string' ? (await this.roleRepo.findById(user.role))?.name || 'unknown' : user.role.name;

    // Generate token with isSuperAdmin
    const token = generateToken({
      userId: user._id!.toString(),
      email: user.email,
      role: roleName,
      isSuperAdmin: user.isSuperAdmin || false // ← INCLUDE IN TOKEN
    });

    return {
      user: {
        id: user._id!.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: roleName
      },
      token
    };
  }

  async login(data: ILoginInput): Promise<IAuthResponse> {
    // Find user (auto-populates role)
    const user = await this.userRepo.findByEmail(data.email);
    if (!user) {
      throw new ValidationError('Invalid credentials');
    }

    // Check status
    if (user.status !== 'active') {
      throw new AppError('Account is not active', 403);
    }

    // Verify password
    const isValid = await comparePassword(data.password, user.password);
    if (!isValid) {
      throw new ValidationError('Invalid credentials');
    }

    // Get role name
    const roleName = typeof user.role === 'string' ? (await this.roleRepo.findById(user.role))?.name || 'unknown' : user.role.name;

    // Generate token with isSuperAdmin
    const token = generateToken({
      userId: user._id!.toString(),
      email: user.email,
      role: roleName,
      isSuperAdmin: user.isSuperAdmin || false // ← INCLUDE IN TOKEN
    });

    return {
      user: {
        id: user._id!.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: roleName,
        isSuperAdmin: user.isSuperAdmin || false // ← RETURN IN RESPONSE
      },
      token
    };
  }
}
