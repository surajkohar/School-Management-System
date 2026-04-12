import React, { useState, useEffect } from 'react';

const RolePermissions = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [permissions, setPermissions] = useState({});
  const [loading, setLoading] = useState(false);

  // Mock roles data
  const mockRoles = [
    {
      id: 1,
      name: 'Super Admin',
      description: 'Full system access',
      userCount: 1,
      isSystem: true
    },
    {
      id: 2,
      name: 'Principal',
      description: 'School management access',
      userCount: 1,
      isSystem: false
    },
    {
      id: 3,
      name: 'Teacher',
      description: 'Academic and student management',
      userCount: 45,
      isSystem: false
    },
    {
      id: 4,
      name: 'Accountant',
      description: 'Financial management access',
      userCount: 2,
      isSystem: false
    },
    {
      id: 5,
      name: 'Receptionist',
      description: 'Basic student and visitor management',
      userCount: 3,
      isSystem: false
    }
  ];

  // Permission modules
  const permissionModules = {
    dashboard: {
      name: 'Dashboard',
      permissions: ['view']
    },
    students: {
      name: 'Student Management',
      permissions: ['view', 'create', 'edit', 'delete', 'export']
    },
    employees: {
      name: 'Employee Management',
      permissions: ['view', 'create', 'edit', 'delete', 'export']
    },
    academic: {
      name: 'Academic Management',
      permissions: ['view', 'create', 'edit', 'delete']
    },
    exams: {
      name: 'Exam Management',
      permissions: ['view', 'create', 'edit', 'delete', 'publish_results']
    },
    fees: {
      name: 'Fee Management',
      permissions: ['view', 'create', 'edit', 'delete', 'collect', 'export']
    },
    attendance: {
      name: 'Attendance Management',
      permissions: ['view', 'mark', 'edit', 'export']
    },
    reports: {
      name: 'Reports',
      permissions: ['view', 'export']
    },
    settings: {
      name: 'System Settings',
      permissions: ['view', 'edit']
    },
    users: {
      name: 'User Management',
      permissions: ['view', 'create', 'edit', 'delete', 'assign_roles']
    }
  };

  // Mock permissions for selected role
  const mockPermissions = {
    1: { // Super Admin - all permissions
      dashboard: ['view'],
      students: ['view', 'create', 'edit', 'delete', 'export'],
      employees: ['view', 'create', 'edit', 'delete', 'export'],
      academic: ['view', 'create', 'edit', 'delete'],
      exams: ['view', 'create', 'edit', 'delete', 'publish_results'],
      fees: ['view', 'create', 'edit', 'delete', 'collect', 'export'],
      attendance: ['view', 'mark', 'edit', 'export'],
      reports: ['view', 'export'],
      settings: ['view', 'edit'],
      users: ['view', 'create', 'edit', 'delete', 'assign_roles']
    },
    2: { // Principal
      dashboard: ['view'],
      students: ['view', 'create', 'edit', 'export'],
      employees: ['view', 'create', 'edit', 'export'],
      academic: ['view', 'create', 'edit', 'delete'],
      exams: ['view', 'create', 'edit', 'publish_results'],
      fees: ['view', 'export'],
      attendance: ['view', 'export'],
      reports: ['view', 'export'],
      settings: ['view'],
      users: ['view']
    },
    3: { // Teacher
      dashboard: ['view'],
      students: ['view', 'edit'],
      employees: ['view'],
      academic: ['view'],
      exams: ['view', 'create', 'edit'],
      fees: ['view'],
      attendance: ['view', 'mark'],
      reports: ['view'],
      settings: [],
      users: []
    }
  };

  useEffect(() => {
    setRoles(mockRoles);
    if (mockRoles.length > 0) {
      setSelectedRole(mockRoles[0]);
      setPermissions(mockPermissions[mockRoles[0].id] || {});
    }
  }, []);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setPermissions(mockPermissions[role.id] || {});
  };

  const handlePermissionChange = (module, permission, checked) => {
    setPermissions(prev => ({
      ...prev,
      [module]: checked 
        ? [...(prev[module] || []), permission]
        : (prev[module] || []).filter(p => p !== permission)
    }));
  };

  const handleSavePermissions = () => {
    setLoading(true);
    setTimeout(() => {
      console.log('Saving permissions for role:', selectedRole.name, permissions);
      setLoading(false);
      alert('Permissions saved successfully!');
    }, 1000);
  };

  const getPermissionLabel = (permission) => {
    const labels = {
      view: 'View',
      create: 'Create',
      edit: 'Edit',
      delete: 'Delete',
      export: 'Export',
      mark: 'Mark',
      collect: 'Collect',
      publish_results: 'Publish Results',
      assign_roles: 'Assign Roles'
    };
    return labels[permission] || permission;
  };

  return (
    <div className="role-permissions animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Role & Permissions</h1>
        <button className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Role
        </button>
      </div>

      <div className="row">
        {/* Roles List */}
        <div className="col-lg-4 mb-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="bi bi-people me-2"></i>
                Roles
              </h5>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    className={`list-group-item list-group-item-action d-flex justify-content-between align-items-start ${
                      selectedRole?.id === role.id ? 'active' : ''
                    }`}
                    onClick={() => handleRoleSelect(role)}
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold d-flex align-items-center">
                        {role.name}
                        {role.isSystem && (
                          <span className="badge bg-warning ms-2">System</span>
                        )}
                      </div>
                      <small className="text-muted">{role.description}</small>
                    </div>
                    <span className="badge bg-primary rounded-pill">{role.userCount}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Permissions */}
        <div className="col-lg-8">
          {selectedRole ? (
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">
                  <i className="bi bi-shield-check me-2"></i>
                  Permissions for {selectedRole.name}
                </h5>
                <button 
                  className="btn btn-success"
                  onClick={handleSavePermissions}
                  disabled={loading || selectedRole.isSystem}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle me-2"></i>
                      Save Permissions
                    </>
                  )}
                </button>
              </div>
              <div className="card-body">
                {selectedRole.isSystem ? (
                  <div className="alert alert-warning">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    System roles cannot be modified. This role has full access to all features.
                  </div>
                ) : null}

                <div className="row g-4">
                  {Object.entries(permissionModules).map(([moduleKey, module]) => (
                    <div key={moduleKey} className="col-md-6">
                      <div className="card h-100">
                        <div className="card-header">
                          <h6 className="card-title mb-0">{module.name}</h6>
                        </div>
                        <div className="card-body">
                          <div className="row g-2">
                            {module.permissions.map((permission) => (
                              <div key={permission} className="col-6">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`${moduleKey}-${permission}`}
                                    checked={(permissions[moduleKey] || []).includes(permission)}
                                    onChange={(e) => handlePermissionChange(moduleKey, permission, e.target.checked)}
                                    disabled={selectedRole.isSystem}
                                  />
                                  <label 
                                    className="form-check-label" 
                                    htmlFor={`${moduleKey}-${permission}`}
                                  >
                                    {getPermissionLabel(permission)}
                                  </label>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="card-body text-center py-5">
                <i className="bi bi-shield-exclamation display-1 text-muted"></i>
                <h4 className="mt-3">Select a Role</h4>
                <p className="text-muted">Choose a role from the list to view and manage its permissions.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RolePermissions;