import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredResource, requiredAction, requiredRoles }) => {
  const { isAuthenticated, isSuperAdmin, role, permissions, user } = useSelector(state => state.auth);

  // Not logged in - redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Super Admin bypass - full access to everything
  if (isSuperAdmin) {
    return children;
  }

  // Check required roles if specified
  if (requiredRoles && requiredRoles.length > 0) {
    if (!requiredRoles.includes(role)) {
      return <Navigate to="/unauthorized" />;
    }
  }

  // Check specific permission if specified
  if (requiredResource && requiredAction) {
    const hasPermission = checkPermission(permissions, requiredResource, requiredAction);
    if (!hasPermission) {
      return <Navigate to="/unauthorized" />;
    }
  }

  return children;
};

// Helper function to check permission
function checkPermission(permissions, resource, action) {
  if (!permissions || permissions.length === 0) return false;

  // Check wildcard
  const hasWildcard = permissions.some(p => p.resource === '*' || p.action === '*');
  if (hasWildcard) return true;

  // Check specific permission
  return permissions.some(p => p.resource === resource && (p.action === action || p.action === '*'));
}

export default ProtectedRoute;
