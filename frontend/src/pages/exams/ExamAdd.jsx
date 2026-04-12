import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ExamAdd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    examName: '',
    examType: '',
    class: '',
    subjects: [],
    startDate: '',
    endDate: '',
    totalMarks: '',
    passingMarks: '',
    instructions: '',
    duration: '',
    examCenter: '',
    status: 'Scheduled'
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const examTypes = [
    { value: 'Terminal', label: 'Terminal Exam' },
    { value: 'Unit Test', label: 'Unit Test' },
    { value: 'Annual', label: 'Annual Exam' },
    { value: 'Monthly', label: 'Monthly Test' },
    { value: 'Practical', label: 'Practical Exam' }
  ];

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

  const subjectsByClass = {
    '1-5': ['English', 'Nepali', 'Mathematics', 'Science', 'Social Studies'],
    '6-8': ['English', 'Nepali', 'Mathematics', 'Science', 'Social Studies', 'Computer Science'],
    '9-10': ['English', 'Nepali', 'Mathematics', 'Science', 'Social Studies', 'Computer Science', 'Optional Mathematics'],
    '11-12': ['English', 'Nepali', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science']
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
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.examName.trim()) newErrors.examName = 'Exam name is required';
    if (!formData.examType) newErrors.examType = 'Exam type is required';
    if (!formData.class) newErrors.class = 'Class is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (!formData.totalMarks) newErrors.totalMarks = 'Total marks is required';
    if (!formData.passingMarks) newErrors.passingMarks = 'Passing marks is required';
    if (formData.subjects.length === 0) newErrors.subjects = 'At least one subject is required';
    
    if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
      newErrors.endDate = 'End date must be after start date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    setTimeout(() => {
      console.log('Exam created:', formData);
      setLoading(false);
      navigate('/exams');
    }, 1000);
  };

  const availableSubjects = getSubjectsForClass(parseInt(formData.class));

  return (
    <div className="exam-add animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Create New Exam</h1>
        <button 
          className="btn btn-outline-secondary"
          onClick={() => navigate('/exams')}
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
                  <i className="bi bi-clipboard-check me-2"></i>
                  Exam Information
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Exam Name <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className={`form-control ${errors.examName ? 'is-invalid' : ''}`}
                      name="examName"
                      value={formData.examName}
                      onChange={handleChange}
                      placeholder="e.g., First Terminal Exam"
                      required
                    />
                    {errors.examName && <div className="invalid-feedback">{errors.examName}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Exam Type <span className="text-danger">*</span></label>
                    <select
                      className={`form-select ${errors.examType ? 'is-invalid' : ''}`}
                      name="examType"
                      value={formData.examType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Exam Type</option>
                      {examTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                    {errors.examType && <div className="invalid-feedback">{errors.examType}</div>}
                  </div>

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
                    <label className="form-label">Exam Center</label>
                    <input
                      type="text"
                      className="form-control"
                      name="examCenter"
                      value={formData.examCenter}
                      onChange={handleChange}
                      placeholder="e.g., Main Building"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Start Date <span className="text-danger">*</span></label>
                    <input
                      type="date"
                      className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                    />
                    {errors.startDate && <div className="invalid-feedback">{errors.startDate}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">End Date <span className="text-danger">*</span></label>
                    <input
                      type="date"
                      className={`form-control ${errors.endDate ? 'is-invalid' : ''}`}
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      required
                    />
                    {errors.endDate && <div className="invalid-feedback">{errors.endDate}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Total Marks <span className="text-danger">*</span></label>
                    <input
                      type="number"
                      className={`form-control ${errors.totalMarks ? 'is-invalid' : ''}`}
                      name="totalMarks"
                      value={formData.totalMarks}
                      onChange={handleChange}
                      min="1"
                      required
                    />
                    {errors.totalMarks && <div className="invalid-feedback">{errors.totalMarks}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Passing Marks <span className="text-danger">*</span></label>
                    <input
                      type="number"
                      className={`form-control ${errors.passingMarks ? 'is-invalid' : ''}`}
                      name="passingMarks"
                      value={formData.passingMarks}
                      onChange={handleChange}
                      min="1"
                      required
                    />
                    {errors.passingMarks && <div className="invalid-feedback">{errors.passingMarks}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Duration (minutes)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      min="1"
                      placeholder="e.g., 180"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Status</label>
                    <select
                      className="form-select"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="Scheduled">Scheduled</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  {formData.class && (
                    <div className="col-12">
                      <label className="form-label">Subjects <span className="text-danger">*</span></label>
                      <div className={`row ${errors.subjects ? 'is-invalid' : ''}`}>
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
                      {errors.subjects && <div className="invalid-feedback d-block">{errors.subjects}</div>}
                    </div>
                  )}

                  <div className="col-12">
                    <label className="form-label">Instructions</label>
                    <textarea
                      className="form-control"
                      name="instructions"
                      rows="4"
                      value={formData.instructions}
                      onChange={handleChange}
                      placeholder="Enter exam instructions for students..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card">
              <div className="card-header">
                <h6 className="card-title mb-0">
                  <i className="bi bi-info-circle me-2"></i>
                  Exam Summary
                </h6>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <strong>Exam Name:</strong>
                  <p className="text-muted">{formData.examName || 'Not specified'}</p>
                </div>
                <div className="mb-3">
                  <strong>Type:</strong>
                  <p className="text-muted">{formData.examType || 'Not selected'}</p>
                </div>
                <div className="mb-3">
                  <strong>Class:</strong>
                  <p className="text-muted">{formData.class ? `Class ${formData.class}` : 'Not selected'}</p>
                </div>
                <div className="mb-3">
                  <strong>Duration:</strong>
                  <p className="text-muted">
                    {formData.startDate && formData.endDate 
                      ? `${formData.startDate} to ${formData.endDate}`
                      : 'Not specified'
                    }
                  </p>
                </div>
                <div className="mb-3">
                  <strong>Subjects:</strong>
                  <p className="text-muted">
                    {formData.subjects.length > 0 
                      ? `${formData.subjects.length} subjects selected`
                      : 'No subjects selected'
                    }
                  </p>
                </div>
                <div className="mb-3">
                  <strong>Marks:</strong>
                  <p className="text-muted">
                    {formData.totalMarks 
                      ? `Total: ${formData.totalMarks}, Passing: ${formData.passingMarks}`
                      : 'Not specified'
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="card mt-4">
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
                        Creating...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Create Exam
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/exams')}
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

export default ExamAdd;