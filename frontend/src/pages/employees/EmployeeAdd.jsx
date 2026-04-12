import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../../store/slices/employeeSlice.js';

const EmployeeAdd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    employeeId: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phone: '',
    address: '',
    department: '',
    position: '',
    joinDate: new Date().toISOString().split('T')[0],
    salary: '',
    bloodGroup: '',
    religion: '',
    caste: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelation: '',
    qualification: '',
    experience: '',
    previousEmployer: '',
    bankName: '',
    bankAccount: '',
    panNumber: '',
    photo: null,
    documents: {
      resume: null,
      certificates: null,
      idProof: null,
      addressProof: null
    }
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const departments = [
    { value: 'Academic', label: 'Academic' },
    { value: 'Administration', label: 'Administration' },
    { value: 'Support', label: 'Support' },
    { value: 'Maintenance', label: 'Maintenance' },
    { value: 'Transport', label: 'Transport' }
  ];

  const positions = {
    Academic: ['Principal', 'Vice Principal', 'Teacher', 'Head Teacher', 'Lab Assistant'],
    Administration: ['Admin Manager', 'Accountant', 'HR Manager', 'Office Assistant', 'Receptionist'],
    Support: ['Librarian', 'Counselor', 'Nurse', 'Security Guard', 'Cleaner'],
    Maintenance: ['Maintenance Manager', 'Electrician', 'Plumber', 'Gardener'],
    Transport: ['Driver', 'Transport Supervisor', 'Mechanic']
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'department') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        position: '' // Reset position when department changes
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    
    if (name === 'photo') {
      setFormData(prev => ({
        ...prev,
        photo: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [name]: files[0]
        }
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.position) newErrors.position = 'Position is required';
    if (!formData.salary) newErrors.salary = 'Salary is required';
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (formData.phone && !/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    setTimeout(() => {
      const newEmployee = {
        id: Date.now(),
        employeeId: formData.employeeId || `EMP${Date.now()}`,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        department: formData.department,
        position: formData.position,
        salary: parseFloat(formData.salary),
        joinDate: formData.joinDate,
        status: 'Active',
        photo: formData.photo ? URL.createObjectURL(formData.photo) : 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
      };
      
      dispatch(addEmployee(newEmployee));
      setLoading(false);
      navigate('/employees');
    }, 1000);
  };

  const availablePositions = formData.department ? positions[formData.department] || [] : [];

  return (
    <div className="employee-add animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Add New Employee</h1>
        <button 
          className="btn btn-outline-secondary"
          onClick={() => navigate('/employees')}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back to List
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  <i className="bi bi-person-circle me-2"></i>
                  Personal Information
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Employee ID</label>
                    <input
                      type="text"
                      className="form-control"
                      name="employeeId"
                      value={formData.employeeId}
                      onChange={handleChange}
                      placeholder="Auto-generated if empty"
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label">Join Date <span className="text-danger">*</span></label>
                    <input
                      type="date"
                      className="form-control"
                      name="joinDate"
                      value={formData.joinDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">First Name <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                    {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Last Name <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                    {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Date of Birth <span className="text-danger">*</span></label>
                    <input
                      type="date"
                      className={`form-control ${errors.dateOfBirth ? 'is-invalid' : ''}`}
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                    />
                    {errors.dateOfBirth && <div className="invalid-feedback">{errors.dateOfBirth}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Gender <span className="text-danger">*</span></label>
                    <select
                      className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Email <span className="text-danger">*</span></label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Phone <span className="text-danger">*</span></label>
                    <input
                      type="tel"
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>

                  <div className="col-12">
                    <label className="form-label">Address <span className="text-danger">*</span></label>
                    <textarea
                      className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                      name="address"
                      rows="3"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Blood Group</label>
                    <select
                      className="form-select"
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Religion</label>
                    <input
                      type="text"
                      className="form-control"
                      name="religion"
                      value={formData.religion}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Caste</label>
                    <input
                      type="text"
                      className="form-control"
                      name="caste"
                      value={formData.caste}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  <i className="bi bi-briefcase me-2"></i>
                  Employment Information
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Department <span className="text-danger">*</span></label>
                    <select
                      className={`form-select ${errors.department ? 'is-invalid' : ''}`}
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Department</option>
                      {departments.map(dept => (
                        <option key={dept.value} value={dept.value}>{dept.label}</option>
                      ))}
                    </select>
                    {errors.department && <div className="invalid-feedback">{errors.department}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Position <span className="text-danger">*</span></label>
                    <select
                      className={`form-select ${errors.position ? 'is-invalid' : ''}`}
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      required
                      disabled={!formData.department}
                    >
                      <option value="">Select Position</option>
                      {availablePositions.map(position => (
                        <option key={position} value={position}>{position}</option>
                      ))}
                    </select>
                    {errors.position && <div className="invalid-feedback">{errors.position}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Monthly Salary (NPR) <span className="text-danger">*</span></label>
                    <input
                      type="number"
                      className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      required
                    />
                    {errors.salary && <div className="invalid-feedback">{errors.salary}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Qualification</label>
                    <input
                      type="text"
                      className="form-control"
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      placeholder="e.g., Bachelor's in Education"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Experience (Years)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      min="0"
                      step="0.5"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Previous Employer</label>
                    <input
                      type="text"
                      className="form-control"
                      name="previousEmployer"
                      value={formData.previousEmployer}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  <i className="bi bi-person-lines-fill me-2"></i>
                  Emergency Contact & Bank Details
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Emergency Contact Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="emergencyContactName"
                      value={formData.emergencyContactName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Emergency Contact Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="emergencyContactPhone"
                      value={formData.emergencyContactPhone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Emergency Contact Relation</label>
                    <input
                      type="text"
                      className="form-control"
                      name="emergencyContactRelation"
                      value={formData.emergencyContactRelation}
                      onChange={handleChange}
                      placeholder="e.g., Spouse, Parent, Sibling"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">PAN Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Bank Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Bank Account Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="bankAccount"
                      value={formData.bankAccount}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  <i className="bi bi-camera me-2"></i>
                  Photo
                </h5>
              </div>
              <div className="card-body text-center">
                <div className="mb-3">
                  {formData.photo ? (
                    <img
                      src={URL.createObjectURL(formData.photo)}
                      alt="Employee"
                      className="img-fluid rounded"
                      style={{ maxWidth: '200px', maxHeight: '200px' }}
                    />
                  ) : (
                    <div className="bg-light rounded d-flex align-items-center justify-content-center" 
                         style={{ width: '200px', height: '200px', margin: '0 auto' }}>
                      <i className="bi bi-person-circle display-1 text-muted"></i>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  className="form-control"
                  name="photo"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <small className="text-muted">Upload employee photo (JPG, PNG)</small>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  <i className="bi bi-file-earmark-text me-2"></i>
                  Documents
                </h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Resume/CV</label>
                  <input
                    type="file"
                    className="form-control"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Certificates</label>
                  <input
                    type="file"
                    className="form-control"
                    name="certificates"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">ID Proof</label>
                  <input
                    type="file"
                    className="form-control"
                    name="idProof"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Address Proof</label>
                  <input
                    type="file"
                    className="form-control"
                    name="addressProof"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
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
                        Save Employee
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/employees')}
                  >
                    <i className="bi bi-x-circle me-2"></i>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmployeeAdd;