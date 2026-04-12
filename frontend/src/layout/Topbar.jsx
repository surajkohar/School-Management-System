import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice.js';
import { setTheme } from '../store/slices/settingsSlice.js';

const Topbar = ({ sidebarCollapsed, onToggleSidebar, onToggleMobileMenu }) => {
  const { user } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Admin User',
    email: user?.email || 'admin@school.com',
    phone: '+977-9841234567',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Mock search data
  const searchData = [
    { type: 'Student', name: 'John Doe', id: 'ST001', url: '/students/view/1' },
    { type: 'Student', name: 'Jane Smith', id: 'ST002', url: '/students/view/2' },
    { type: 'Student', name: 'Mike Johnson', id: 'ST003', url: '/students/view/3' },
    { type: 'Employee', name: 'Dr. Sarah Johnson', id: 'EMP001', url: '/employees/view/1' },
    { type: 'Employee', name: 'Mr. John Smith', id: 'EMP002', url: '/employees/view/2' },
    { type: 'Book', name: 'Introduction to Computer Science', id: 'B001', url: '/library/books' },
    { type: 'Route', name: 'Kathmandu - Bhaktapur', id: 'RT001', url: '/transport/routes' },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
  };

  const handleGlobalSearch = (query) => {
    setGlobalSearchQuery(query);
    if (query.length > 2) {
      const results = searchData.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.id.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const handleSearchResultClick = (result) => {
    setShowSearchResults(false);
    setGlobalSearchQuery('');
    window.location.href = result.url;
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    console.log('Profile updated:', profileData);
    setShowProfileModal(false);
    alert('Profile updated successfully!');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (profileData.newPassword !== profileData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    console.log('Password changed');
    setProfileData({
      ...profileData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowProfileModal(false);
    alert('Password changed successfully!');
  };

  return (
    <>
      <div className={`topbar d-flex align-items-center justify-content-between px-3 ${
        sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'
      }`}>
        <div className="d-flex align-items-center">
          {/* Desktop Sidebar Toggle */}
          <button 
            className="btn btn-link d-none d-md-block p-1 me-2"
            onClick={onToggleSidebar}
          >
            <i className="bi bi-list fs-4"></i>
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="btn btn-link d-md-none p-1 me-2"
            onClick={onToggleMobileMenu}
          >
            <i className="bi bi-list fs-4"></i>
          </button>

          {/* Global Search */}
          <div className="search-box d-none d-lg-block position-relative">
            <div className="input-group">
              <input 
                type="text" 
                className="form-control border-0 bg-light" 
                placeholder="Search students, employees, books..."
                style={{ minWidth: '350px' }}
                value={globalSearchQuery}
                onChange={(e) => handleGlobalSearch(e.target.value)}
                onFocus={() => globalSearchQuery.length > 2 && setShowSearchResults(true)}
              />
              <button className="btn btn-light border-0" type="button">
                <i className="bi bi-search"></i>
              </button>
            </div>
            
            {/* Search Results Dropdown */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="position-absolute w-100 bg-white border rounded shadow-lg mt-1" style={{ zIndex: 1050 }}>
                <div className="p-2">
                  <small className="text-muted fw-bold">Search Results</small>
                </div>
                {searchResults.map((result, index) => (
                  <div 
                    key={index}
                    className="p-3 border-bottom cursor-pointer hover-bg-light"
                    onClick={() => handleSearchResultClick(result)}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    <div className="d-flex align-items-center">
                      <div className={`badge bg-${
                        result.type === 'Student' ? 'primary' : 
                        result.type === 'Employee' ? 'success' : 
                        result.type === 'Book' ? 'info' : 'warning'
                      } me-3`}>
                        {result.type}
                      </div>
                      <div>
                        <div className="fw-semibold">{result.name}</div>
                        <small className="text-muted">ID: {result.id}</small>
                      </div>
                    </div>
                  </div>
                ))}
                {searchResults.length === 0 && globalSearchQuery.length > 2 && (
                  <div className="p-3 text-center text-muted">
                    <i className="bi bi-search me-2"></i>
                    No results found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="d-flex align-items-center">
          {/* Theme Toggle */}
          <button 
            className="theme-toggle me-3"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            <i className={`bi ${theme === 'light' ? 'bi-moon-fill' : 'bi-sun-fill'}`}></i>
          </button>

          {/* Notifications */}
          <div className="dropdown me-3">
            <button 
              className="btn btn-link position-relative p-2"
              data-bs-toggle="dropdown"
            >
              <i className="bi bi-bell fs-5"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3
              </span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li><h6 className="dropdown-header">Notifications</h6></li>
              <li><a className="dropdown-item" href="#">New student admission</a></li>
              <li><a className="dropdown-item" href="#">Fee payment received</a></li>
              <li><a className="dropdown-item" href="#">Exam results published</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item text-center" href="#">View all</a></li>
            </ul>
          </div>

          {/* User Profile */}
          <div className="dropdown">
            <button 
              className="btn btn-link d-flex align-items-center p-2"
              data-bs-toggle="dropdown"
            >
              <div className="me-2 d-none d-sm-block text-end">
                <div className="fw-semibold">{user?.name || 'Admin User'}</div>
                <small className="text-muted">{user?.role || 'Super Admin'}</small>
              </div>
              <div className="avatar bg-primary rounded-circle d-flex align-items-center justify-content-center"
                   style={{ width: '40px', height: '40px' }}>
                <i className="bi bi-person-fill text-white"></i>
              </div>
            </button>
            <ul className="dropdown-menu dropdown-menu-end profile-dropdown">
              <li className="profile-header">
                <div className="avatar bg-primary rounded-circle d-flex align-items-center justify-content-center profile-avatar mx-auto">
                  <i className="bi bi-person-fill text-white fs-3"></i>
                </div>
                <div className="fw-semibold">{user?.name || 'Admin User'}</div>
                <small className="text-muted">{user?.email || 'admin@school.com'}</small>
              </li>
              <li className="profile-menu">
                <button 
                  className="dropdown-item"
                  onClick={() => setShowProfileModal(true)}
                >
                  <i className="bi bi-person-circle"></i>
                  <span>My Profile</span>
                </button>
                <button 
                  className="dropdown-item"
                  onClick={() => setShowProfileModal(true)}
                >
                  <i className="bi bi-key"></i>
                  <span>Change Password</span>
                </button>
                <a className="dropdown-item" href="#">
                  <i className="bi bi-gear"></i>
                  <span>Settings</span>
                </a>
                <a className="dropdown-item" href="#">
                  <i className="bi bi-question-circle"></i>
                  <span>Help</span>
                </a>
                <hr className="dropdown-divider" />
                <button className="dropdown-item text-danger" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-person-circle me-2"></i>
                  Profile Settings
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowProfileModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  {/* Profile Information */}
                  <div className="col-md-6">
                    <div className="card h-100">
                      <div className="card-header">
                        <h6 className="card-title mb-0">
                          <i className="bi bi-person me-2"></i>
                          Profile Information
                        </h6>
                      </div>
                      <div className="card-body">
                        <form onSubmit={handleProfileUpdate}>
                          <div className="text-center mb-4">
                            <div className="avatar bg-primary rounded-circle d-flex align-items-center justify-content-center mx-auto"
                                 style={{ width: '80px', height: '80px' }}>
                              <i className="bi bi-person-fill text-white fs-2"></i>
                            </div>
                            <button type="button" className="btn btn-sm btn-outline-primary mt-2">
                              <i className="bi bi-camera me-1"></i>
                              Change Photo
                            </button>
                          </div>
                          
                          <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input
                              type="text"
                              className="form-control"
                              value={profileData.name}
                              onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                            />
                          </div>
                          
                          <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              value={profileData.email}
                              onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                            />
                          </div>
                          
                          <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <input
                              type="tel"
                              className="form-control"
                              value={profileData.phone}
                              onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                            />
                          </div>
                          
                          <button type="submit" className="btn btn-primary w-100">
                            <i className="bi bi-check-circle me-2"></i>
                            Update Profile
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>

                  {/* Change Password */}
                  <div className="col-md-6">
                    <div className="card h-100">
                      <div className="card-header">
                        <h6 className="card-title mb-0">
                          <i className="bi bi-key me-2"></i>
                          Change Password
                        </h6>
                      </div>
                      <div className="card-body">
                        <form onSubmit={handlePasswordChange}>
                          <div className="mb-3">
                            <label className="form-label">Current Password</label>
                            <input
                              type="password"
                              className="form-control"
                              value={profileData.currentPassword}
                              onChange={(e) => setProfileData({...profileData, currentPassword: e.target.value})}
                              required
                            />
                          </div>
                          
                          <div className="mb-3">
                            <label className="form-label">New Password</label>
                            <input
                              type="password"
                              className="form-control"
                              value={profileData.newPassword}
                              onChange={(e) => setProfileData({...profileData, newPassword: e.target.value})}
                              required
                            />
                          </div>
                          
                          <div className="mb-3">
                            <label className="form-label">Confirm New Password</label>
                            <input
                              type="password"
                              className="form-control"
                              value={profileData.confirmPassword}
                              onChange={(e) => setProfileData({...profileData, confirmPassword: e.target.value})}
                              required
                            />
                          </div>
                          
                          <div className="alert alert-info">
                            <i className="bi bi-info-circle me-2"></i>
                            <small>Password must be at least 8 characters long and contain uppercase, lowercase, and numbers.</small>
                          </div>
                          
                          <button type="submit" className="btn btn-warning w-100">
                            <i className="bi bi-shield-check me-2"></i>
                            Change Password
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowProfileModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Topbar;