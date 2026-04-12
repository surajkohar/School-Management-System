import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addStudent } from '../../store/slices/studentSlice.js';

const StudentAdd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    rollNumber: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phone: '',
    address: '',
    class: '',
    section: '',
    admissionDate: new Date().toISOString().split('T')[0],
    bloodGroup: '',
    religion: '',
    caste: '',
    fatherName: '',
    fatherPhone: '',
    fatherOccupation: '',
    motherName: '',
    motherPhone: '',
    motherOccupation: '',
    guardianName: '',
    guardianPhone: '',
    guardianRelation: '',
    previousSchool: '',
    transferCertificate: '',
    admissionFee: '',
    monthlyFee: '',
    discount: '',
    discountType: 'percentage', // percentage or amount
    subjects: [],
    photo: null,
    documents: {
      birthCertificate: null,
      transferCertificate: null,
      characterCertificate: null,
      marksheet: null
    }
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const classes = [
    { value: '1', label: 'Class 1' },
    { value: '2', label: 'Class 2' },
    { value: '3', label: 'Class 3' },
    { value: '4', label: 'Class 4' },
    { value: '5', label: 'Class 5' },
    { value: '6', label: 'Class 6' },
    { value: '7', label: 'Class 7' },
    { value: '8', label: 'Class 8' },
    { value: '9', label: 'Class 9' },
    { value: '10', label: 'Class 10' },
    { value: '11', label: 'Class 11' },
    { value: '12', label: 'Class 12' }
  ];

  const sections = ['A', 'B', 'C', 'D', 'E'];

  const subjectsByClass = {
    '1-5': ['English', 'Nepali', 'Mathematics', 'Science', 'Social Studies', 'Health Education'],
    '6-8': ['English', 'Nepali', 'Mathematics', 'Science', 'Social Studies', 'Health Education', 'Computer Science'],
    '9-10': ['English', 'Nepali', 'Mathematics', 'Science', 'Social Studies', 'Health Education', 'Computer Science', 'Optional Mathematics'],
    '11-12': ['English', 'Nepali', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Economics', 'Accountancy']
  };

  const getSubjectsForClass = (classValue) => {
    if (classValue >= 1 && classValue <= 5) return subjectsByClass['1-5'];
    if (classValue >= 6 && classValue <= 8) return subjectsByClass['6-8'];
    if (classValue >= 9 && classValue <= 10) return subjectsByClass['9-10'];
    if (classValue >= 11 && classValue <= 12) return subjectsByClass['11-12'];
    return [];
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'subjects') {
        setFormData(prev => ({
          ...prev,
          subjects: checked 
            ? [...prev.subjects, value]
            : prev.subjects.filter(subject => subject !== value)
        }));
      }
    } else if (name === 'class') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        subjects: [] // Reset subjects when class changes
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
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
    if (!formData.class) newErrors.class = 'Class is required';
    if (!formData.section) newErrors.section = 'Section is required';
    if (!formData.fatherName.trim()) newErrors.fatherName = 'Father name is required';
    if (!formData.fatherPhone.trim()) newErrors.fatherPhone = 'Father phone is required';
    if (!formData.admissionFee) newErrors.admissionFee = 'Admission fee is required';
    if (!formData.monthlyFee) newErrors.monthlyFee = 'Monthly fee is required';
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Phone validation
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
    
    // Simulate API call
    setTimeout(() => {
      const newStudent = {
        id: Date.now(),
        rollNumber: formData.rollNumber || `ST${Date.now()}`,
        name: `${formData.firstName} ${formData.lastName}`,
        class: formData.class,
        section: formData.section,
        phone: formData.phone,
        email: formData.email,
        status: 'Active',
        admissionDate: formData.admissionDate,
        feeStatus: 'Paid',
        photo: formData.photo ? URL.createObjectURL(formData.photo) : 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
      };
      
      dispatch(addStudent(newStudent));
      setLoading(false);
      navigate('/students');
    }, 1000);
  };

  const availableSubjects = getSubjectsForClass(parseInt(formData.class));

  return (
    <div className="student-add animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Add New Student</h1>
        <button 
          className="btn btn-outline-secondary"
          onClick={() => navigate('/students')}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back to List
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Personal Information */}
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
                    <label className="form-label">Roll Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="rollNumber"
                      value={formData.rollNumber}
                      onChange={handleChange}
                      placeholder="Auto-generated if empty"
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label">Admission Date <span className="text-danger">*</span></label>
                    <input
                      type="date"
                      className="form-control"
                      name="admissionDate"
                      value={formData.admissionDate}
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

            {/* Academic Information */}
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  <i className="bi bi-book me-2"></i>
                  Academic Information
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Class <span className="text-danger">*</span></label>
                    <select
                      className={`form-select ${errors.class ? 'is-invalid' : ''}`}
                      name="class"
                      value={formData.class}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Class</option>
                      {classes.map(cls => (
                        <option key={cls.value} value={cls.value}>{cls.label}</option>
                      ))}
                    </select>
                    {errors.class && <div className="invalid-feedback">{errors.class}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Section <span className="text-danger">*</span></label>
                    <select
                      className={`form-select ${errors.section ? 'is-invalid' : ''}`}
                      name="section"
                      value={formData.section}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Section</option>
                      {sections.map(section => (
                        <option key={section} value={section}>Section {section}</option>
                      ))}
                    </select>
                    {errors.section && <div className="invalid-feedback">{errors.section}</div>}
                  </div>

                  <div className="col-12">
                    <label className="form-label">Previous School</label>
                    <input
                      type="text"
                      className="form-control"
                      name="previousSchool"
                      value={formData.previousSchool}
                      onChange={handleChange}
                    />
                  </div>

                  {formData.class && (
                    <div className="col-12">
                      <label className="form-label">Subjects</label>
                      <div className="row">
                        {availableSubjects.map(subject => (
                          <div key={subject} className="col-md-4 col-sm-6">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="subjects"
                                value={subject}
                                checked={formData.subjects.includes(subject)}
                                onChange={handleChange}
                                id={`subject-${subject}`}
                              />
                              <label className="form-check-label" htmlFor={`subject-${subject}`}>
                                {subject}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Parent Information */}
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  <i className="bi bi-people me-2"></i>
                  Parent/Guardian Information
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Father's Name <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className={`form-control ${errors.fatherName ? 'is-invalid' : ''}`}
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleChange}
                      required
                    />
                    {errors.fatherName && <div className="invalid-feedback">{errors.fatherName}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Father's Phone <span className="text-danger">*</span></label>
                    <input
                      type="tel"
                      className={`form-control ${errors.fatherPhone ? 'is-invalid' : ''}`}
                      name="fatherPhone"
                      value={formData.fatherPhone}
                      onChange={handleChange}
                      required
                    />
                    {errors.fatherPhone && <div className="invalid-feedback">{errors.fatherPhone}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Father's Occupation</label>
                    <input
                      type="text"
                      className="form-control"
                      name="fatherOccupation"
                      value={formData.fatherOccupation}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Mother's Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="motherName"
                      value={formData.motherName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Mother's Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="motherPhone"
                      value={formData.motherPhone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Mother's Occupation</label>
                    <input
                      type="text"
                      className="form-control"
                      name="motherOccupation"
                      value={formData.motherOccupation}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Guardian Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="guardianName"
                      value={formData.guardianName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Guardian Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="guardianPhone"
                      value={formData.guardianPhone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Guardian Relation</label>
                    <input
                      type="text"
                      className="form-control"
                      name="guardianRelation"
                      value={formData.guardianRelation}
                      onChange={handleChange}
                      placeholder="e.g., Uncle, Aunt, Grandfather"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Fee Information */}
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  <i className="bi bi-cash-coin me-2"></i>
                  Fee Information
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Admission Fee (NPR) <span className="text-danger">*</span></label>
                    <input
                      type="number"
                      className={`form-control ${errors.admissionFee ? 'is-invalid' : ''}`}
                      name="admissionFee"
                      value={formData.admissionFee}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      required
                    />
                    {errors.admissionFee && <div className="invalid-feedback">{errors.admissionFee}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Monthly Fee (NPR) <span className="text-danger">*</span></label>
                    <input
                      type="number"
                      className={`form-control ${errors.monthlyFee ? 'is-invalid' : ''}`}
                      name="monthlyFee"
                      value={formData.monthlyFee}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      required
                    />
                    {errors.monthlyFee && <div className="invalid-feedback">{errors.monthlyFee}</div>}
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Discount Type</label>
                    <select
                      className="form-select"
                      name="discountType"
                      value={formData.discountType}
                      onChange={handleChange}
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="amount">Amount (NPR)</option>
                    </select>
                  </div>

                  <div className="col-md-8">
                    <label className="form-label">
                      Monthly Discount ({formData.discountType === 'percentage' ? '%' : 'NPR'})
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="discount"
                      value={formData.discount}
                      onChange={handleChange}
                      min="0"
                      max={formData.discountType === 'percentage' ? '100' : ''}
                      step={formData.discountType === 'percentage' ? '0.01' : '0.01'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Photo and Documents */}
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
                      alt="Student"
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
                <small className="text-muted">Upload student photo (JPG, PNG)</small>
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
                  <label className="form-label">Birth Certificate</label>
                  <input
                    type="file"
                    className="form-control"
                    name="birthCertificate"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Transfer Certificate</label>
                  <input
                    type="file"
                    className="form-control"
                    name="transferCertificate"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Character Certificate</label>
                  <input
                    type="file"
                    className="form-control"
                    name="characterCertificate"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Previous Marksheet</label>
                  <input
                    type="file"
                    className="form-control"
                    name="marksheet"
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
                        Save Student
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/students')}
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

export default StudentAdd;