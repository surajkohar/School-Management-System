import { IPermission } from '../../interfaces/IPermission';

// All available permissions in the system
export const SYSTEM_PERMISSIONS: IPermission[] = [
  // Student Management
  { name: 'STUDENT_CREATE', description: 'Create new student', resource: 'student', action: 'create', isActive: true },
  { name: 'STUDENT_READ', description: 'View student details', resource: 'student', action: 'read', isActive: true },
  { name: 'STUDENT_UPDATE', description: 'Update student information', resource: 'student', action: 'update', isActive: true },
  { name: 'STUDENT_DELETE', description: 'Delete student record', resource: 'student', action: 'delete', isActive: true },
  { name: 'STUDENT_EXPORT', description: 'Export student data', resource: 'student', action: 'export', isActive: true },

  // Teacher Management
  { name: 'TEACHER_CREATE', description: 'Create new teacher', resource: 'teacher', action: 'create', isActive: true },
  { name: 'TEACHER_READ', description: 'View teacher details', resource: 'teacher', action: 'read', isActive: true },
  { name: 'TEACHER_UPDATE', description: 'Update teacher information', resource: 'teacher', action: 'update', isActive: true },
  { name: 'TEACHER_DELETE', description: 'Delete teacher record', resource: 'teacher', action: 'delete', isActive: true },

  // Grade Management
  { name: 'GRADE_CREATE', description: 'Create grade entry', resource: 'grade', action: 'create', isActive: true },
  { name: 'GRADE_READ', description: 'View grades', resource: 'grade', action: 'read', isActive: true },
  { name: 'GRADE_UPDATE', description: 'Update grades', resource: 'grade', action: 'update', isActive: true },
  { name: 'GRADE_APPROVE', description: 'Approve grade changes', resource: 'grade', action: 'approve', isActive: true },

  // Attendance Management
  { name: 'ATTENDANCE_CREATE', description: 'Mark attendance', resource: 'attendance', action: 'create', isActive: true },
  { name: 'ATTENDANCE_READ', description: 'View attendance records', resource: 'attendance', action: 'read', isActive: true },
  { name: 'ATTENDANCE_UPDATE', description: 'Update attendance', resource: 'attendance', action: 'update', isActive: true },

  // Fee Management
  { name: 'FEE_CREATE', description: 'Create fee structure', resource: 'fee', action: 'create', isActive: true },
  { name: 'FEE_READ', description: 'View fee details', resource: 'fee', action: 'read', isActive: true },
  { name: 'FEE_UPDATE', description: 'Update fee records', resource: 'fee', action: 'update', isActive: true },
  { name: 'FEE_MANAGE', description: 'Manage all fee operations', resource: 'fee', action: 'manage', isActive: true },

  // Exam Management
  { name: 'EXAM_CREATE', description: 'Create exam schedule', resource: 'exam', action: 'create', isActive: true },
  { name: 'EXAM_READ', description: 'View exam details', resource: 'exam', action: 'read', isActive: true },
  { name: 'EXAM_UPDATE', description: 'Update exam schedule', resource: 'exam', action: 'update', isActive: true },
  { name: 'EXAM_MANAGE', description: 'Manage all exam operations', resource: 'exam', action: 'manage', isActive: true },

  // Timetable Management
  { name: 'TIMETABLE_CREATE', description: 'Create timetable', resource: 'timetable', action: 'create', isActive: true },
  { name: 'TIMETABLE_READ', description: 'View timetable', resource: 'timetable', action: 'read', isActive: true },
  { name: 'TIMETABLE_UPDATE', description: 'Update timetable', resource: 'timetable', action: 'update', isActive: true },

  // Library Management
  { name: 'LIBRARY_MANAGE', description: 'Manage library', resource: 'library', action: 'manage', isActive: true },
  { name: 'LIBRARY_READ', description: 'View library records', resource: 'library', action: 'read', isActive: true },

  // Transport Management
  { name: 'TRANSPORT_MANAGE', description: 'Manage transport', resource: 'transport', action: 'manage', isActive: true },
  { name: 'TRANSPORT_READ', description: 'View transport details', resource: 'transport', action: 'read', isActive: true },

  // User & Role Management (Admin only)
  { name: 'USER_CREATE', description: 'Create new user', resource: 'user', action: 'create', isActive: true },
  { name: 'USER_READ', description: 'View user details', resource: 'user', action: 'read', isActive: true },
  { name: 'USER_UPDATE', description: 'Update user information', resource: 'user', action: 'update', isActive: true },
  { name: 'USER_DELETE', description: 'Delete user account', resource: 'user', action: 'delete', isActive: true },
  
  { name: 'ROLE_CREATE', description: 'Create new role', resource: 'role', action: 'create', isActive: true },
  { name: 'ROLE_READ', description: 'View roles', resource: 'role', action: 'read', isActive: true },
  { name: 'ROLE_UPDATE', description: 'Update role permissions', resource: 'role', action: 'update', isActive: true },
  { name: 'ROLE_DELETE', description: 'Delete role', resource: 'role', action: 'delete', isActive: true },

  { name: 'PERMISSION_MANAGE', description: 'Manage permissions', resource: 'permission', action: 'manage', isActive: true },

  // Reports
  { name: 'REPORT_READ', description: 'View reports', resource: 'report', action: 'read', isActive: true },
  { name: 'REPORT_EXPORT', description: 'Export reports', resource: 'report', action: 'export', isActive: true },

  // Settings (Admin only)
  { name: 'SETTING_MANAGE', description: 'Manage system settings', resource: 'setting', action: 'manage', isActive: true }
];

// Permission grouping by resource for UI display
export const PERMISSION_GROUPS = {
  student: ['STUDENT_CREATE', 'STUDENT_READ', 'STUDENT_UPDATE', 'STUDENT_DELETE', 'STUDENT_EXPORT'],
  teacher: ['TEACHER_CREATE', 'TEACHER_READ', 'TEACHER_UPDATE', 'TEACHER_DELETE'],
  grade: ['GRADE_CREATE', 'GRADE_READ', 'GRADE_UPDATE', 'GRADE_APPROVE'],
  attendance: ['ATTENDANCE_CREATE', 'ATTENDANCE_READ', 'ATTENDANCE_UPDATE'],
  fee: ['FEE_CREATE', 'FEE_READ', 'FEE_UPDATE', 'FEE_MANAGE'],
  exam: ['EXAM_CREATE', 'EXAM_READ', 'EXAM_UPDATE', 'EXAM_MANAGE'],
  timetable: ['TIMETABLE_CREATE', 'TIMETABLE_READ', 'TIMETABLE_UPDATE'],
  library: ['LIBRARY_MANAGE', 'LIBRARY_READ'],
  transport: ['TRANSPORT_MANAGE', 'TRANSPORT_READ'],
  user: ['USER_CREATE', 'USER_READ', 'USER_UPDATE', 'USER_DELETE'],
  role: ['ROLE_CREATE', 'ROLE_READ', 'ROLE_UPDATE', 'ROLE_DELETE'],
  permission: ['PERMISSION_MANAGE'],
  report: ['REPORT_READ', 'REPORT_EXPORT'],
  setting: ['SETTING_MANAGE']
};