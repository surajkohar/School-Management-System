export const ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student',
  PARENT: 'parent'
} as const;

export const DEFAULT_ROLE = 'student';

export const ROLE_PERMISSIONS = [
  {
    name: 'admin',
    description: 'Full system access',
    permissions: [{ resource: '*', actions: ['*'] }],
    isDefault: false
  },
  {
    name: 'teacher',
    description: 'Teacher access',
    permissions: [
      { resource: 'students', actions: ['read', 'write'] },
      { resource: 'grades', actions: ['read', 'write'] },
      { resource: 'attendance', actions: ['read', 'write'] }
    ],
    isDefault: false
  },
  {
    name: 'student',
    description: 'Student access',
    permissions: [
      { resource: 'profile', actions: ['read', 'update'] },
      { resource: 'grades', actions: ['read'] },
      { resource: 'attendance', actions: ['read'] }
    ],
    isDefault: true
  },
  {
    name: 'parent',
    description: 'Parent access',
    permissions: [
      { resource: 'children', actions: ['read'] },
      { resource: 'grades', actions: ['read'] }
    ],
    isDefault: false
  }
];
