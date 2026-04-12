import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateStudent, setCurrentStudent } from '../../store/slices/studentSlice.js';

const StudentEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentStudent } = useSelector((state) => state.students);
  
  const [activeTab, setActiveTab] = useState('personal');
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
    admissionDate: '',
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
    photo: null,
    documents: {
      birthCertificate: null,
      transferCertificate: null,
      characterCertificate: null,
      marksheet: null
    }
  });

  // Year-wise academic and fee data
  const [yearWiseData, setYearWiseData] = useState({});
  const [selectedYear, setSelectedYear] = useState('2024');
  const [showAddYearModal, setShowAddYearModal] = useState(false);
  const [newYearData, setNewYearData] = useState({
    academicYear: '',
    class: '',
    section: '',
    subjects: [],
    feeStructure: {
      monthlyFee: '',
      examFee: '',
      transportFee: '',
      libraryFee: '',
      discount: '',
      discountType: 'percentage'
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

  useEffect(() => {
    // Mock data for editing - in real app, fetch from API
    const mockStudent = {
      id: parseInt(id),
      rollNumber: 'ST001',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '2005-05-15',
      gender: 'Male',
      email: 'john.doe@email.com',
      phone: '+977-9841234567',
      address: 'Kathmandu, Nepal',
      class: '10',
      section: 'A',
      admissionDate: '2024-01-15',
      bloodGroup: 'O+',
      religion: 'Hindu',
      caste: 'Brahmin',
      fatherName: 'Ram Doe',
      fatherPhone: '+977-9841234568',
      fatherOccupation: 'Engineer',
      motherName: 'Sita Doe',
      motherPhone: '+977-9841234569',
      motherOccupation: 'Teacher',
      guardianName: '',
      guardianPhone: '',
      guardianRelation: '',
      previousSchool: 'ABC School',
      photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    };

    // Mock year-wise data
    const mockYearWiseData = {
      '2022': {
        class: '8',
        section: 'A',
        subjects: ['English', 'Nepali', 'Mathematics', 'Science', 'Social Studies', 'Health Education', 'Computer Science'],
        feeStructure: {
          monthlyFee: 2200,
          examFee: 1200,
          transportFee: 1100,
          libraryFee: 350,
          discount: 10,
          discountType: 'percentage'
        },
        status: 'Completed',
        isLocked: true
      },
      '2023': {
        class: '9',
        section: 'A',
        subjects: ['English', 'Nepali', 'Mathematics', 'Science', 'Social Studies', 'Health Education', 'Computer Science', 'Optional Mathematics'],
        feeStructure: {
          monthlyFee: 2300,
          examFee: 1300,
          transportFee: 1200,
          libraryFee: 400,
          discount: 10,
          discountType: 'percentage'
        },
        status: 'Completed',
        isLocked: true
      },
      '2024': {
        class: '10',
        section: 'A',
        subjects: ['English', 'Nepali', 'Mathematics', 'Science', 'Social Studies', 'Health Education', 'Computer Science', 'Optional Mathematics'],
        feeStructure: {
          monthlyFee: 2500,
          examFee: 1500,
          transportFee: 1200,
          libraryFee: 400,
          discount: 10,
          discountType: 'percentage'
        },
        status: 'Active',
        isLocked: false
      }
    };

    setFormData(mockStudent);
    setYearWiseData(mockYearWiseData);
    dispatch(setCurrentStudent(mockStudent));
  }, [id, dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'subjects') {
        const currentYearData = yearWiseData[selectedYear] || {};
        const currentSubjects = currentYearData.subjects || [];
        
        const updatedSubjects = checked 
          ? [...currentSubjects, value]
          : currentSubjects.filter(subject => subject !== value);
        
        setYearWiseData(prev => ({
          ...prev,
          [selectedYear]: {
            ...prev[selectedYear],
            subjects: updatedSubjects
          }
        }));
      }
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

  const handleYearWiseChange = (field, value) => {
    if (yearWiseData[selectedYear]?.isLocked) {
      alert('This academic year is completed and cannot be modified.');
      return;
    }

    setYearWiseData(prev => ({
      ...prev,
      [selectedYear]: {
        ...prev[selectedYear],
        [field]: value
      }
    }));
  };

  const handleFeeStructureChange = (field, value) => {
    if (yearWiseData[selectedYear]?.isLocked) {
      alert('This academic year is completed and cannot be modified.');
      return;
    }

    setYearWiseData(prev => ({
      ...prev,
      [selectedYear]: {
        ...prev[selectedYear],
        feeStructure: {
          ...prev[selectedYear]?.feeStructure,
          [field]: value
        }
      }
    }));
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

  const handleAddNewYear = () => {
    if (!newYearData.academicYear || !newYearData.class) {
      alert('Please fill in academic year and class');
      return;
    }

    if (yearWiseData[newYearData.academicYear]) {
      alert('Data for this academic year already exists');
      return;
    }

    const defaultSubjects = getSubjectsForClass(parseInt(newYearData.class));
    
    setYearWiseData(prev => ({
      ...prev,
      [newYearData.academicYear]: {
        class: newYearData.class,
        section: newYearData.section,
        subjects: newYearData.subjects.length > 0 ? newYearData.subjects : defaultSubjects,
        feeStructure: newYearData.feeStructure,
        status: 'Active',
        isLocked: false
      }
    }));

    setSelectedYear(newYearData.academicYear);
    setShowAddYearModal(false);
    setNewYearData({
      academicYear: '',
      class: '',
      section: '',
      subjects: [],
      feeStructure: {
        monthlyFee: '',
        examFee: '',
        transportFee: '',
        libraryFee: '',
        discount: '',
        discountType: 'percentage'
      }
    });
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
    if (!formData.fatherName.trim()) newErrors.fatherName = 'Father name is required';
    if (!formData.fatherPhone.trim()) newErrors.fatherPhone = 'Father phone is required';
    
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
      const updatedStudent = {
        ...formData,
        id: parseInt(id),
        name: `${formData.firstName} ${formData.lastName}`,
        yearWiseData: yearWiseData,
        photo: typeof formData.photo === 'string' ? formData.photo : 
               formData.photo ? URL.createObjectURL(formData.photo) : 
               'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
      };
      
      dispatch(updateStudent(updatedStudent));
      setLoading(false);
      navigate('/students');
    }, 1000);
  };

  const getCurrentYearData = () => {
    return yearWiseData[selectedYear] || {};
  };

  const availableSubjects = getSubjectsForClass(parseInt(getCurrentYearData().class || formData.class));

  return (
    <div className="student-edit animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Edit Student</h1>
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
          <div className="col-lg-8">
            <div className="card">
              <div className="card-header">
                <ul className="nav nav-tabs card-header-tabs" role="tablist">
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${activeTab === 'personal' ? 'active' : ''}`}
                      type="button"
                      onClick={() => setActiveTab('personal')}
                    >
                      <i className="bi bi-person-circle me-2"></i>Personal Info
                    </button>
                  </li>
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${activeTab === 'academic' ? 'active' : ''}`}
                      type="button"
                      onClick={() => setActiveTab('academic')}
                    >
                      <i className="bi bi-book me-2"></i>Academic Info
                    </button>
                  </li>
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${activeTab === 'parent' ? 'active' : ''}`}
                      type="button"
                      onClick={() => setActiveTab('parent')}
                    >
                      <i className="bi bi-people me-2"></i>Parent Info
                    </button>
                  </li>
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${activeTab === 'fees' ? 'active' : ''}`}
                      type="button"
                      onClick={() => setActiveTab('fees')}
                    >
                      <i className="bi bi-cash-coin me-2"></i>Fee Info
                    </button>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                {/* Personal Information Tab */}
                {activeTab === 'personal' && (
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Roll Number</label>
                      <input
                        type="text"
                        className="form-control"
                        name="rollNumber"
                        value={formData.rollNumber}
                        onChange={handleChange}
                        readOnly
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
                )}

                {/* Academic Information Tab - Year-wise */}
                {activeTab === 'academic' && (
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div className="d-flex align-items-center gap-3">
                        <h6 className="mb-0">Academic Year:</h6>
                        <select 
                          className="form-select"
                          style={{ width: 'auto' }}
                          value={selectedYear}
                          onChange={(e) => setSelectedYear(e.target.value)}
                        >
                          {Object.keys(yearWiseData).map(year => (
                            <option key={year} value={year}>
                              {year} {yearWiseData[year]?.isLocked && '(Completed)'}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button 
                        type="button"
                        className="btn btn-success btn-sm"
                        onClick={() => setShowAddYearModal(true)}
                      >
                        <i className="bi bi-plus-circle me-2"></i>
                        Add New Year
                      </button>
                    </div>

                    {getCurrentYearData().isLocked && (
                      <div className="alert alert-warning">
                        <i className="bi bi-lock me-2"></i>
                        This academic year is completed and cannot be modified.
                      </div>
                    )}

                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Class</label>
                        <select
                          className="form-select"
                          value={getCurrentYearData().class || ''}
                          onChange={(e) => handleYearWiseChange('class', e.target.value)}
                          disabled={getCurrentYearData().isLocked}
                        >
                          <option value="">Select Class</option>
                          {classes.map(cls => (
                            <option key={cls.value} value={cls.value}>{cls.label}</option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Section</label>
                        <select
                          className="form-select"
                          value={getCurrentYearData().section || ''}
                          onChange={(e) => handleYearWiseChange('section', e.target.value)}
                          disabled={getCurrentYearData().isLocked}
                        >
                          <option value="">Select Section</option>
                          {sections.map(section => (
                            <option key={section} value={section}>Section {section}</option>
                          ))}
                        </select>
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

                      {getCurrentYearData().class && (
                        <div className="col-12">
                          <label className="form-label">Subjects for {selectedYear}</label>
                          <div className="row">
                            {availableSubjects.map(subject => (
                              <div key={subject} className="col-md-4 col-sm-6">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="subjects"
                                    value={subject}
                                    checked={(getCurrentYearData().subjects || []).includes(subject)}
                                    onChange={handleChange}
                                    id={`subject-${subject}`}
                                    disabled={getCurrentYearData().isLocked}
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
                )}

                {/* Parent Information Tab */}
                {activeTab === 'parent' && (
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
                )}

                {/* Fee Information Tab - Year-wise */}
                {activeTab === 'fees' && (
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div className="d-flex align-items-center gap-3">
                        <h6 className="mb-0">Fee Structure for:</h6>
                        <select 
                          className="form-select"
                          style={{ width: 'auto' }}
                          value={selectedYear}
                          onChange={(e) => setSelectedYear(e.target.value)}
                        >
                          {Object.keys(yearWiseData).map(year => (
                            <option key={year} value={year}>
                              {year} {yearWiseData[year]?.isLocked && '(Completed)'}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {getCurrentYearData().isLocked && (
                      <div className="alert alert-warning">
                        <i className="bi bi-lock me-2"></i>
                        This academic year is completed and fee structure cannot be modified.
                      </div>
                    )}

                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Monthly Fee (NPR)</label>
                        <input
                          type="number"
                          className="form-control"
                          value={getCurrentYearData().feeStructure?.monthlyFee || ''}
                          onChange={(e) => handleFeeStructureChange('monthlyFee', e.target.value)}
                          min="0"
                          step="0.01"
                          disabled={getCurrentYearData().isLocked}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Exam Fee (NPR)</label>
                        <input
                          type="number"
                          className="form-control"
                          value={getCurrentYearData().feeStructure?.examFee || ''}
                          onChange={(e) => handleFeeStructureChange('examFee', e.target.value)}
                          min="0"
                          step="0.01"
                          disabled={getCurrentYearData().isLocked}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Transport Fee (NPR)</label>
                        <input
                          type="number"
                          className="form-control"
                          value={getCurrentYearData().feeStructure?.transportFee || ''}
                          onChange={(e) => handleFeeStructureChange('transportFee', e.target.value)}
                          min="0"
                          step="0.01"
                          disabled={getCurrentYearData().isLocked}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Library Fee (NPR)</label>
                        <input
                          type="number"
                          className="form-control"
                          value={getCurrentYearData().feeStructure?.libraryFee || ''}
                          onChange={(e) => handleFeeStructureChange('libraryFee', e.target.value)}
                          min="0"
                          step="0.01"
                          disabled={getCurrentYearData().isLocked}
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">Discount Type</label>
                        <select
                          className="form-select"
                          value={getCurrentYearData().feeStructure?.discountType || 'percentage'}
                          onChange={(e) => handleFeeStructureChange('discountType', e.target.value)}
                          disabled={getCurrentYearData().isLocked}
                        >
                          <option value="percentage">Percentage (%)</option>
                          <option value="amount">Amount (NPR)</option>
                        </select>
                      </div>

                      <div className="col-md-8">
                        <label className="form-label">
                          Discount ({getCurrentYearData().feeStructure?.discountType === 'percentage' ? '%' : 'NPR'})
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          value={getCurrentYearData().feeStructure?.discount || ''}
                          onChange={(e) => handleFeeStructureChange('discount', e.target.value)}
                          min="0"
                          max={getCurrentYearData().feeStructure?.discountType === 'percentage' ? '100' : ''}
                          step="0.01"
                          disabled={getCurrentYearData().isLocked}
                        />
                      </div>

                      <div className="col-12">
                        <div className="alert alert-info">
                          <h6 className="alert-heading">Fee Summary for {selectedYear}</h6>
                          <div className="row">
                            <div className="col-md-6">
                              <strong>Total Monthly Fee:</strong> NPR {(
                                (parseFloat(getCurrentYearData().feeStructure?.monthlyFee) || 0) +
                                (parseFloat(getCurrentYearData().feeStructure?.transportFee) || 0) +
                                (parseFloat(getCurrentYearData().feeStructure?.libraryFee) || 0)
                              ).toLocaleString()}
                            </div>
                            <div className="col-md-6">
                              <strong>Net Monthly Fee:</strong> NPR {(() => {
                                const total = (parseFloat(getCurrentYearData().feeStructure?.monthlyFee) || 0) +
                                             (parseFloat(getCurrentYearData().feeStructure?.transportFee) || 0) +
                                             (parseFloat(getCurrentYearData().feeStructure?.libraryFee) || 0);
                                const discount = parseFloat(getCurrentYearData().feeStructure?.discount) || 0;
                                const discountType = getCurrentYearData().feeStructure?.discountType;
                                
                                if (discountType === 'percentage') {
                                  return (total - (total * discount / 100)).toLocaleString();
                                } else {
                                  return (total - discount).toLocaleString();
                                }
                              })()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
                      src={typeof formData.photo === 'string' ? formData.photo : URL.createObjectURL(formData.photo)}
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
                        Updating...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Update Student
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

      {/* Add New Year Modal */}
      {showAddYearModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Academic Year</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowAddYearModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Academic Year</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g., 2025"
                      value={newYearData.academicYear}
                      onChange={(e) => setNewYearData({...newYearData, academicYear: e.target.value})}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Class</label>
                    <select
                      className="form-select"
                      value={newYearData.class}
                      onChange={(e) => setNewYearData({...newYearData, class: e.target.value})}
                    >
                      <option value="">Select Class</option>
                      {classes.map(cls => (
                        <option key={cls.value} value={cls.value}>{cls.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Section</label>
                    <select
                      className="form-select"
                      value={newYearData.section}
                      onChange={(e) => setNewYearData({...newYearData, section: e.target.value})}
                    >
                      <option value="">Select Section</option>
                      {sections.map(section => (
                        <option key={section} value={section}>Section {section}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Monthly Fee (NPR)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newYearData.feeStructure.monthlyFee}
                      onChange={(e) => setNewYearData({
                        ...newYearData, 
                        feeStructure: {...newYearData.feeStructure, monthlyFee: e.target.value}
                      })}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowAddYearModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={handleAddNewYear}
                >
                  Add Academic Year
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentEdit;