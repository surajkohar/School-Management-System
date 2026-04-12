import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ collapsed, mobileOpen, onMobileClose }) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  const toggleSubmenu = (menuKey) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const menuItems = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: 'bi-speedometer2',
      path: '/dashboard'
    },
    {
      key: 'students',
      label: 'Students',
      icon: 'bi-people-fill',
      submenu: [
        { label: 'All Students', path: '/students' },
        { label: 'Add Student', path: '/students/add' },
        { label: 'Student Promotion', path: '/students/promotion' },
        { label: 'Historical Data', path: '/students/historical-data' },
      ]
    },
    {
      key: 'employees',
      label: 'Employees',
      icon: 'bi-person-badge-fill',
      submenu: [
        { label: 'All Employees', path: '/employees' },
        { label: 'Add Employee', path: '/employees/add' },
        { label: 'Employee Payroll', path: '/employees/payroll' },
        { label: 'Employee Leave', path: '/employees/leave' },
      ]
    },
    {
      key: 'exams',
      label: 'Examinations',
      icon: 'bi-clipboard-check-fill',
      submenu: [
        { label: 'Exam List', path: '/exams' },
        { label: 'Create Exam', path: '/exams/create' },
        { label: 'Exam Schedule', path: '/exams/schedule' },
        { label: 'Grade System', path: '/exams/grades' },
        { label: 'Result Cards', path: '/exams/results' },
      ]
    },
    {
      key: 'fees',
      label: 'Fee Management',
      icon: 'bi-currency-dollar',
      submenu: [
        { label: 'Fee Structure', path: '/fees/structure' },
        { label: 'Fee Collection', path: '/fees/collection' },
        { label: 'Fee Reports', path: '/fees/reports' },
        { label: 'Due Fees', path: '/fees' },
        { label: 'Fee Receipts', path: '/fees/receipts' },
      ]
    },
    {
      key: 'transport',
      label: 'Transport',
      icon: 'bi-bus-front-fill',
      submenu: [
        { label: 'Routes', path: '/transport/routes' },
        { label: 'Vehicles', path: '/transport/vehicles' },
        { label: 'Drivers', path: '/transport/drivers' },
        { label: 'Student Transport', path: '/transport/students' },
      ]
    },
    {
      key: 'reports',
      label: 'Reports',
      icon: 'bi-graph-up',
      path: '/reports'
    },
    {
      key: 'announcements',
      label: 'Announcements',
      icon: 'bi-megaphone-fill',
      path: '/announcements'
    },
    {
      key: 'calendar',
      label: 'Calendar',
      icon: 'bi-calendar-event-fill',
      path: '/calendar'
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: 'bi-gear-fill',
      submenu: [
        { label: 'School Settings', path: '/settings' },
        { label: 'Role Permissions', path: '/settings/roles' },
        { label: 'Email Settings', path: '/settings/email' },
        { label: 'User Management', path: '/settings/users' },
        { label: 'Backup & Restore', path: '/settings/backup' },
      ]
    },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const hasActiveSubmenu = (submenu) => {
    return submenu && submenu.some(item => isActive(item.path));
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="position-fixed w-100 h-100 bg-dark bg-opacity-50 d-md-none"
          style={{ zIndex: 999 }}
          onClick={onMobileClose}
        />
      )}
      
      <div className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-show' : ''}`}>
        <div className="sidebar-header">
          <h4>
            <i className="bi bi-mortarboard-fill me-2"></i>
            {!collapsed && 'School MS'}
          </h4>
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <div key={item.key} className="menu-item">
              {item.submenu ? (
                <>
                  <button
                    className={`menu-link ${hasActiveSubmenu(item.submenu) ? 'active' : ''}`}
                    onClick={() => toggleSubmenu(item.key)}
                  >
                    <i className={item.icon}></i>
                    <span>{item.label}</span>
                    {!collapsed && (
                      <i className={`bi bi-chevron-${openMenus[item.key] ? 'down' : 'right'} ms-auto`}></i>
                    )}
                  </button>
                  <div className={`submenu ${openMenus[item.key] ? 'show' : ''}`}>
                    {item.submenu.map((subItem, index) => (
                      <Link
                        key={index}
                        to={subItem.path}
                        className={`submenu-link ${isActive(subItem.path) ? 'active' : ''}`}
                        onClick={onMobileClose}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  to={item.path}
                  className={`menu-link ${isActive(item.path) ? 'active' : ''}`}
                  onClick={onMobileClose}
                >
                  <i className={item.icon}></i>
                  <span>{item.label}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;