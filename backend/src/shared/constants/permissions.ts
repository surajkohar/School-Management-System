import { IPermission } from '../../interfaces/IPermission';

// All available permissions in the system - MATCHED TO YOUR APP.JSX ROUTES
export const SYSTEM_PERMISSIONS: IPermission[] = [
  // Dashboard (No specific permission needed - just login)

  // Student Management - /students/*
  { name: 'STUDENT_CREATE', description: 'Create new student', resource: 'student', action: 'create', isActive: true },
  { name: 'STUDENT_READ', description: 'View student details', resource: 'student', action: 'read', isActive: true },
  { name: 'STUDENT_UPDATE', description: 'Update student information', resource: 'student', action: 'update', isActive: true },
  { name: 'STUDENT_DELETE', description: 'Delete student record', resource: 'student', action: 'delete', isActive: true },
  { name: 'STUDENT_PROMOTION', description: 'Promote students', resource: 'student', action: 'promote', isActive: true },
  { name: 'STUDENT_HISTORY', description: 'View student historical data', resource: 'student', action: 'history', isActive: true },

  // Employee Management - /employees/*
  { name: 'EMPLOYEE_CREATE', description: 'Create new employee', resource: 'employee', action: 'create', isActive: true },
  { name: 'EMPLOYEE_READ', description: 'View employee details', resource: 'employee', action: 'read', isActive: true },
  { name: 'EMPLOYEE_UPDATE', description: 'Update employee information', resource: 'employee', action: 'update', isActive: true },
  { name: 'EMPLOYEE_DELETE', description: 'Delete employee record', resource: 'employee', action: 'delete', isActive: true },

  // Payroll - /employees/payroll
  { name: 'PAYROLL_READ', description: 'View payroll', resource: 'payroll', action: 'read', isActive: true },
  { name: 'PAYROLL_MANAGE', description: 'Manage payroll', resource: 'payroll', action: 'manage', isActive: true },

  // Leave - /employees/leave
  { name: 'LEAVE_READ', description: 'View leave records', resource: 'leave', action: 'read', isActive: true },
  { name: 'LEAVE_MANAGE', description: 'Manage leave', resource: 'leave', action: 'manage', isActive: true },

  // Fee Management - /fees/*
  { name: 'FEE_CREATE', description: 'Create fee structure', resource: 'fee', action: 'create', isActive: true },
  { name: 'FEE_READ', description: 'View fee details', resource: 'fee', action: 'read', isActive: true },
  { name: 'FEE_UPDATE', description: 'Update fee records', resource: 'fee', action: 'update', isActive: true },
  { name: 'FEE_DELETE', description: 'Delete fee records', resource: 'fee', action: 'delete', isActive: true },
  { name: 'FEE_COLLECT', description: 'Collect fees', resource: 'fee', action: 'collect', isActive: true },
  { name: 'FEE_STRUCTURE', description: 'Manage fee structure', resource: 'fee', action: 'structure', isActive: true },
  { name: 'FEE_REPORTS', description: 'View fee reports', resource: 'fee', action: 'reports', isActive: true },

  // Transport Management - /transport/*
  { name: 'TRANSPORT_CREATE', description: 'Create transport records', resource: 'transport', action: 'create', isActive: true },
  { name: 'TRANSPORT_READ', description: 'View transport details', resource: 'transport', action: 'read', isActive: true },
  { name: 'TRANSPORT_UPDATE', description: 'Update transport records', resource: 'transport', action: 'update', isActive: true },
  { name: 'TRANSPORT_DELETE', description: 'Delete transport records', resource: 'transport', action: 'delete', isActive: true },

  // Exam Management - /exams
  { name: 'EXAM_CREATE', description: 'Create exam schedule', resource: 'exam', action: 'create', isActive: true },
  { name: 'EXAM_READ', description: 'View exam details', resource: 'exam', action: 'read', isActive: true },
  { name: 'EXAM_UPDATE', description: 'Update exam schedule', resource: 'exam', action: 'update', isActive: true },
  { name: 'EXAM_DELETE', description: 'Delete exam records', resource: 'exam', action: 'delete', isActive: true },
  { name: 'EXAM_MANAGE', description: 'Manage all exam operations', resource: 'exam', action: 'manage', isActive: true },

  // Reports - /reports
  { name: 'REPORT_READ', description: 'View reports', resource: 'report', action: 'read', isActive: true },
  { name: 'REPORT_EXPORT', description: 'Export reports', resource: 'report', action: 'export', isActive: true },
  { name: 'REPORT_MANAGE', description: 'Manage reports', resource: 'report', action: 'manage', isActive: true },

  // Announcements - /announcements
  { name: 'ANNOUNCEMENT_CREATE', description: 'Create announcements', resource: 'announcement', action: 'create', isActive: true },
  { name: 'ANNOUNCEMENT_READ', description: 'View announcements', resource: 'announcement', action: 'read', isActive: true },
  { name: 'ANNOUNCEMENT_UPDATE', description: 'Update announcements', resource: 'announcement', action: 'update', isActive: true },
  { name: 'ANNOUNCEMENT_DELETE', description: 'Delete announcements', resource: 'announcement', action: 'delete', isActive: true },

  // Calendar - /calendar
  { name: 'CALENDAR_READ', description: 'View calendar', resource: 'calendar', action: 'read', isActive: true },
  { name: 'CALENDAR_MANAGE', description: 'Manage calendar events', resource: 'calendar', action: 'manage', isActive: true },

  // Settings - /settings/*
  { name: 'SETTING_READ', description: 'View settings', resource: 'setting', action: 'read', isActive: true },
  { name: 'SETTING_MANAGE', description: 'Manage system settings', resource: 'setting', action: 'manage', isActive: true },

  // Role & Permission Management - /settings/roles (Admin only)
  { name: 'ROLE_CREATE', description: 'Create new role', resource: 'role', action: 'create', isActive: true },
  { name: 'ROLE_READ', description: 'View roles', resource: 'role', action: 'read', isActive: true },
  { name: 'ROLE_UPDATE', description: 'Update role permissions', resource: 'role', action: 'update', isActive: true },
  { name: 'ROLE_DELETE', description: 'Delete role', resource: 'role', action: 'delete', isActive: true },

  { name: 'PERMISSION_CREATE', description: 'Create permissions', resource: 'permission', action: 'create', isActive: true },
  { name: 'PERMISSION_READ', description: 'View permissions', resource: 'permission', action: 'read', isActive: true },
  { name: 'PERMISSION_UPDATE', description: 'Update permissions', resource: 'permission', action: 'update', isActive: true },
  { name: 'PERMISSION_DELETE', description: 'Delete permissions', resource: 'permission', action: 'delete', isActive: true },

  // User Management (Admin only)
  { name: 'USER_CREATE', description: 'Create new user', resource: 'user', action: 'create', isActive: true },
  { name: 'USER_READ', description: 'View user details', resource: 'user', action: 'read', isActive: true },
  { name: 'USER_UPDATE', description: 'Update user information', resource: 'user', action: 'update', isActive: true },
  { name: 'USER_DELETE', description: 'Delete user account', resource: 'user', action: 'delete', isActive: true }
];

// Permission grouping by resource for UI display (Role Management Page)
export const PERMISSION_GROUPS = {
  student: ['STUDENT_CREATE', 'STUDENT_READ', 'STUDENT_UPDATE', 'STUDENT_DELETE', 'STUDENT_PROMOTION', 'STUDENT_HISTORY'],
  employee: ['EMPLOYEE_CREATE', 'EMPLOYEE_READ', 'EMPLOYEE_UPDATE', 'EMPLOYEE_DELETE'],
  payroll: ['PAYROLL_READ', 'PAYROLL_MANAGE'],
  leave: ['LEAVE_READ', 'LEAVE_MANAGE'],
  fee: ['FEE_CREATE', 'FEE_READ', 'FEE_UPDATE', 'FEE_DELETE', 'FEE_COLLECT', 'FEE_STRUCTURE', 'FEE_REPORTS'],
  transport: ['TRANSPORT_CREATE', 'TRANSPORT_READ', 'TRANSPORT_UPDATE', 'TRANSPORT_DELETE'],
  exam: ['EXAM_CREATE', 'EXAM_READ', 'EXAM_UPDATE', 'EXAM_DELETE', 'EXAM_MANAGE'],
  report: ['REPORT_READ', 'REPORT_EXPORT', 'REPORT_MANAGE'],
  announcement: ['ANNOUNCEMENT_CREATE', 'ANNOUNCEMENT_READ', 'ANNOUNCEMENT_UPDATE', 'ANNOUNCEMENT_DELETE'],
  calendar: ['CALENDAR_READ', 'CALENDAR_MANAGE'],
  setting: ['SETTING_READ', 'SETTING_MANAGE'],
  role: ['ROLE_CREATE', 'ROLE_READ', 'ROLE_UPDATE', 'ROLE_DELETE'],
  permission: ['PERMISSION_CREATE', 'PERMISSION_READ', 'PERMISSION_UPDATE', 'PERMISSION_DELETE'],
  user: ['USER_CREATE', 'USER_READ', 'USER_UPDATE', 'USER_DELETE']
};
