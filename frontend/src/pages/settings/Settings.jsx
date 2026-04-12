import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSchoolInfo, setEmailSettings, setAcademicYear, setCalendarType } from '../../store/slices/settingsSlice.js';

const Settings = () => {
  const dispatch = useDispatch();
  const { schoolInfo, emailSettings, academicYear, calendarType } = useSelector((state) => state.settings);
  
  const [activeTab, setActiveTab] = useState('school');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    school: { ...schoolInfo },
    email: { ...emailSettings },
    academic: { academicYear, calendarType }
  });

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        school: {
          ...prev.school,
          logo: URL.createObjectURL(file)
        }
      }));
    }
  };

  const handleSave = (section) => {
    setLoading(true);
    
    setTimeout(() => {
      switch (section) {
        case 'school':
          dispatch(setSchoolInfo(formData.school));
          break;
        case 'email':
          dispatch(setEmailSettings(formData.email));
          break;
        case 'academic':
          dispatch(setAcademicYear(formData.academic.academicYear));
          dispatch(setCalendarType(formData.academic.calendarType));
          break;
      }
      setLoading(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  const settingsTabs = [
    { id: 'school', label: 'School Information', icon: 'bi-building' },
    { id: 'email', label: 'Email Settings', icon: 'bi-envelope-at' },
    { id: 'academic', label: 'Academic Settings', icon: 'bi-calendar-event' },
    { id: 'users', label: 'User Management', icon: 'bi-people' },
    { id: 'permissions', label: 'Permissions', icon: 'bi-shield-check' },
    { id: 'backup', label: 'Backup & Restore', icon: 'bi-cloud-download' },
    { id: 'system', label: 'System Settings', icon: 'bi-gear' }
  ];

  return (
    <div className="settings animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Settings</h1>
        <button 
          className="btn btn-primary"
          onClick={() => handleSave(activeTab)}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Saving...
            </>
          ) : (
            <>
              <i className="bi bi-check-circle me-2"></i>
              Save Changes
            </>
          )}
        </button>
      </div>

      <div className="row">
        {/* Settings Navigation */}
        <div className="col-lg-3 mb-4">
          <div className="card">
            <div className="card-header">
              <h6 className="card-title mb-0">Settings Categories</h6>
            </div>
            <div className="list-group list-group-flush">
              {settingsTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`list-group-item list-group-item-action d-flex align-items-center ${
                    activeTab === tab.id ? 'active' : ''
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <i className={`${tab.icon} me-3`}></i>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="col-lg-9">
          {/* School Information */}
          {activeTab === 'school' && (
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  <i className="bi bi-building me-2"></i>
                  School Information
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-12 text-center mb-4">
                    <div className="mb-3">
                      {formData.school.logo ? (
                        <img
                          src={formData.school.logo}
                          alt="School Logo"
                          className="img-fluid rounded"
                          style={{ maxWidth: '200px', maxHeight: '200px' }}
                        />
                      ) : (
                        <div className="bg-light rounded d-flex align-items-center justify-content-center mx-auto" 
                             style={{ width: '200px', height: '200px' }}>
                          <i className="bi bi-building display-1 text-muted"></i>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ maxWidth: '300px', margin: '0 auto' }}
                    />
                    <small className="text-muted">Upload school logo (JPG, PNG)</small>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">School Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.school.name}
                      onChange={(e) => handleInputChange('school', 'name', e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={formData.school.email}
                      onChange={(e) => handleInputChange('school', 'email', e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={formData.school.phone}
                      onChange={(e) => handleInputChange('school', 'phone', e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Website</label>
                    <input
                      type="url"
                      className="form-control"
                      placeholder="https://www.schoolname.edu.np"
                      onChange={(e) => handleInputChange('school', 'website', e.target.value)}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Address</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={formData.school.address}
                      onChange={(e) => handleInputChange('school', 'address', e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Established Year</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="2000"
                      onChange={(e) => handleInputChange('school', 'establishedYear', e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">School Type</label>
                    <select 
                      className="form-select"
                      onChange={(e) => handleInputChange('school', 'type', e.target.value)}
                    >
                      <option value="">Select Type</option>
                      <option value="Public">Public</option>
                      <option value="Private">Private</option>
                      <option value="Semi-Government">Semi-Government</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Email Settings */}
          {activeTab === 'email' && (
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  <i className="bi bi-envelope-at me-2"></i>
                  Email Configuration
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">SMTP Host</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="smtp.gmail.com"
                      value={formData.email.smtp_host}
                      onChange={(e) => handleInputChange('email', 'smtp_host', e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">SMTP Port</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="587"
                      value={formData.email.smtp_port}
                      onChange={(e) => handleInputChange('email', 'smtp_port', e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="your-email@gmail.com"
                      value={formData.email.smtp_username}
                      onChange={(e) => handleInputChange('email', 'smtp_username', e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="App Password"
                      value={formData.email.smtp_password}
                      onChange={(e) => handleInputChange('email', 'smtp_password', e.target.value)}
                    />
                  </div>

                  <div className="col-12">
                    <div className="alert alert-info">
                      <i className="bi bi-info-circle me-2"></i>
                      <strong>Note:</strong> For Gmail, use App Password instead of your regular password. 
                      Enable 2-factor authentication and generate an app password from your Google Account settings.
                    </div>
                  </div>

                  <div className="col-12">
                    <button className="btn btn-outline-primary">
                      <i className="bi bi-envelope-check me-2"></i>
                      Test Email Configuration
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Academic Settings */}
          {activeTab === 'academic' && (
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  <i className="bi bi-calendar-event me-2"></i>
                  Academic Configuration
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Academic Year</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="2024-2025"
                      value={formData.academic.academicYear}
                      onChange={(e) => handleInputChange('academic', 'academicYear', e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Calendar Type</label>
                    <select 
                      className="form-select"
                      value={formData.academic.calendarType}
                      onChange={(e) => handleInputChange('academic', 'calendarType', e.target.value)}
                    >
                      <option value="nepal">Nepali Calendar (BS)</option>
                      <option value="india">Indian Calendar</option>
                      <option value="gregorian">Gregorian Calendar</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Session Start Month</label>
                    <select className="form-select">
                      <option value="4">April (Baisakh)</option>
                      <option value="1">January</option>
                      <option value="6">June</option>
                      <option value="7">July</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Session End Month</label>
                    <select className="form-select">
                      <option value="3">March (Chaitra)</option>
                      <option value="12">December</option>
                      <option value="5">May</option>
                      <option value="6">June</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Working Days per Week</label>
                    <select className="form-select">
                      <option value="6">6 Days (Sunday to Friday)</option>
                      <option value="5">5 Days (Monday to Friday)</option>
                      <option value="7">7 Days</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Grading System</label>
                    <select className="form-select">
                      <option value="gpa">GPA (4.0 Scale)</option>
                      <option value="percentage">Percentage</option>
                      <option value="letter">Letter Grades (A, B, C, D, F)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* User Management */}
          {activeTab === 'users' && (
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  <i className="bi bi-people me-2"></i>
                  User Management
                </h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6>System Users</h6>
                  <button className="btn btn-primary btn-sm">
                    <i className="bi bi-plus-circle me-2"></i>
                    Add User
                  </button>
                </div>
                
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Last Login</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Super Admin</td>
                        <td>admin@school.com</td>
                        <td><span className="badge bg-danger">Super Admin</span></td>
                        <td><span className="badge bg-success">Active</span></td>
                        <td>2024-04-01 10:30 AM</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-1">
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button className="btn btn-sm btn-outline-danger">
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs can be implemented similarly */}
          {activeTab === 'permissions' && (
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  <i className="bi bi-shield-check me-2"></i>
                  Role Permissions
                </h5>
              </div>
              <div className="card-body">
                <p className="text-muted">Configure role-based permissions for different user types.</p>
                <div className="alert alert-info">
                  <i className="bi bi-info-circle me-2"></i>
                  This feature is under development.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'backup' && (
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  <i className="bi bi-cloud-download me-2"></i>
                  Backup & Restore
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="card bg-light">
                      <div className="card-body text-center">
                        <i className="bi bi-download display-4 text-primary"></i>
                        <h6 className="mt-3">Create Backup</h6>
                        <p className="text-muted">Download a complete backup of your data</p>
                        <button className="btn btn-primary">
                          <i className="bi bi-download me-2"></i>
                          Create Backup
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card bg-light">
                      <div className="card-body text-center">
                        <i className="bi bi-upload display-4 text-success"></i>
                        <h6 className="mt-3">Restore Data</h6>
                        <p className="text-muted">Restore data from a backup file</p>
                        <button className="btn btn-success">
                          <i className="bi bi-upload me-2"></i>
                          Restore Backup
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  <i className="bi bi-gear me-2"></i>
                  System Settings
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">System Language</label>
                    <select className="form-select">
                      <option value="en">English</option>
                      <option value="ne">Nepali</option>
                      <option value="hi">Hindi</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Date Format</label>
                    <select className="form-select">
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Currency</label>
                    <select className="form-select">
                      <option value="NPR">Nepali Rupee (NPR)</option>
                      <option value="INR">Indian Rupee (INR)</option>
                      <option value="USD">US Dollar (USD)</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Timezone</label>
                    <select className="form-select">
                      <option value="Asia/Kathmandu">Asia/Kathmandu</option>
                      <option value="Asia/Kolkata">Asia/Kolkata</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;