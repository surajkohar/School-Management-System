// Check if user has specific permission
export const hasPermission = (user, permissions, resource, action) => {
  // Super Admin has ALL permissions - no check needed
  if (user?.isSuperAdmin) return true;

  if (!permissions || permissions.length === 0) return false;

  // Check wildcard
  const hasWildcard = permissions.some(p => p.resource === '*' || p.action === '*');
  if (hasWildcard) return true;

  // Check specific permission
  return permissions.some(p => p.resource === resource && (p.action === action || p.action === '*'));
};

// Check if user has role
export const hasRole = (user, ...allowedRoles) => {
  // Super Admin bypasses role check
  if (user?.isSuperAdmin) return true;

  return allowedRoles.includes(user?.role);
};

// Check if super admin
export const isSuperAdmin = user => {
  return user?.isSuperAdmin === true;
};
