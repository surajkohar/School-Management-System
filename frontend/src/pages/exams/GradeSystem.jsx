import React, { useState, useEffect } from 'react';
import DataTable from '../../components/DataTable.jsx';

const GradeSystem = () => {
  const [gradeSystem, setGradeSystem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingGrade, setEditingGrade] = useState(null);
  const [formData, setFormData] = useState({
    grade: '',
    minMarks: '',
    maxMarks: '',
    gpa: '',
    description: ''
  });

  // Mock data
  const mockGradeSystem = [
    {
      id: 1,
      grade: 'A+',
      minMarks: 90,
      maxMarks: 100,
      gpa: 4.0,
      description: 'Outstanding',
      color: 'success'
    },
    {
      id: 2,
      grade: 'A',
      minMarks: 80,
      maxMarks: 89,
      gpa: 3.6,
      description: 'Excellent',
      color: 'primary'
    },
    {
      id: 3,
      grade: 'A-',
      minMarks: 70,
      maxMarks: 79,
      gpa: 3.2,
      description: 'Very Good',
      color: 'info'
    },
    {
      id: 4,
      grade: 'B+',
      minMarks: 65,
      maxMarks: 69,
      gpa: 2.8,
      description: 'Good',
      color: 'warning'
    },
    {
      id: 5,
      grade: 'B',
      minMarks: 60,
      maxMarks: 64,
      gpa: 2.4,
      description: 'Above Average',
      color: 'warning'
    },
    {
      id: 6,
      grade: 'B-',
      minMarks: 55,
      maxMarks: 59,
      gpa: 2.0,
      description: 'Average',
      color: 'secondary'
    },
    {
      id: 7,
      grade: 'C+',
      minMarks: 50,
      maxMarks: 54,
      gpa: 1.6,
      description: 'Below Average',
      color: 'secondary'
    },
    {
      id: 8,
      grade: 'C',
      minMarks: 45,
      maxMarks: 49,
      gpa: 1.2,
      description: 'Acceptable',
      color: 'secondary'
    },
    {
      id: 9,
      grade: 'D',
      minMarks: 40,
      maxMarks: 44,
      gpa: 0.8,
      description: 'Partially Acceptable',
      color: 'danger'
    },
    {
      id: 10,
      grade: 'F',
      minMarks: 0,
      maxMarks: 39,
      gpa: 0.0,
      description: 'Insufficient',
      color: 'danger'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setGradeSystem(mockGradeSystem);
      setLoading(false);
    }, 500);
  }, []);

  const columns = [
    {
      key: 'grade',
      title: 'Grade',
      render: (value, row) => (
        <span className={`badge bg-${row.color} fs-6`}>
          {value}
        </span>
      )
    },
    {
      key: 'minMarks',
      title: 'Min Marks (%)',
      sortable: true
    },
    {
      key: 'maxMarks',
      title: 'Max Marks (%)',
      sortable: true
    },
    {
      key: 'gpa',
      title: 'GPA',
      render: (value) => (
        <span className="fw-bold">{value.toFixed(1)}</span>
      ),
      sortable: true
    },
    {
      key: 'description',
      title: 'Description'
    }
  ];

  const handleAdd = () => {
    setEditingGrade(null);
    setFormData({
      grade: '',
      minMarks: '',
      maxMarks: '',
      gpa: '',
      description: ''
    });
    setShowAddModal(true);
  };

  const handleEdit = (grade) => {
    setEditingGrade(grade);
    setFormData({
      grade: grade.grade,
      minMarks: grade.minMarks.toString(),
      maxMarks: grade.maxMarks.toString(),
      gpa: grade.gpa.toString(),
      description: grade.description
    });
    setShowAddModal(true);
  };

  const handleDelete = (grade) => {
    if (window.confirm(`Are you sure you want to delete grade "${grade.grade}"?`)) {
      const updatedGrades = gradeSystem.filter(g => g.id !== grade.id);
      setGradeSystem(updatedGrades);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newGrade = {
      id: editingGrade ? editingGrade.id : Date.now(),
      grade: formData.grade,
      minMarks: parseInt(formData.minMarks),
      maxMarks: parseInt(formData.maxMarks),
      gpa: parseFloat(formData.gpa),
      description: formData.description,
      color: getGradeColor(formData.grade)
    };

    if (editingGrade) {
      const updatedGrades = gradeSystem.map(g => 
        g.id === editingGrade.id ? newGrade : g
      );
      setGradeSystem(updatedGrades);
    } else {
      setGradeSystem([...gradeSystem, newGrade]);
    }

    setShowAddModal(false);
  };

  const getGradeColor = (grade) => {
    if (grade.includes('A')) return 'success';
    if (grade.includes('B')) return 'primary';
    if (grade.includes('C')) return 'warning';
    if (grade === 'D') return 'secondary';
    return 'danger';
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="grade-system animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Grade System Management</h1>
        <button className="btn btn-primary" onClick={handleAdd}>
          <i className="bi bi-plus-circle me-2"></i>
          Add Grade
        </button>
      </div>

      <div className="row mb-4">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="bi bi-award me-2"></i>
                Grade Scale
              </h5>
            </div>
            <div className="card-body p-0">
              <DataTable
                columns={columns}
                data={gradeSystem}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                actions={true}
              />
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h6 className="card-title mb-0">Grade Distribution</h6>
            </div>
            <div className="card-body">
              <div className="d-flex flex-column gap-3">
                {gradeSystem.slice(0, 5).map((grade) => (
                  <div key={grade.id} className="d-flex justify-content-between align-items-center">
                    <span className={`badge bg-${grade.color}`}>{grade.grade}</span>
                    <span className="text-muted">{grade.minMarks}% - {grade.maxMarks}%</span>
                    <span className="fw-bold">{grade.gpa}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-header">
              <h6 className="card-title mb-0">Grade Statistics</h6>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-6">
                  <div className="border-end">
                    <h4 className="text-primary">{gradeSystem.length}</h4>
                    <small className="text-muted">Total Grades</small>
                  </div>
                </div>
                <div className="col-6">
                  <h4 className="text-success">4.0</h4>
                  <small className="text-muted">Max GPA</small>
                </div>
              </div>
              <hr />
              <div className="row text-center">
                <div className="col-6">
                  <div className="border-end">
                    <h4 className="text-warning">40%</h4>
                    <small className="text-muted">Pass Mark</small>
                  </div>
                </div>
                <div className="col-6">
                  <h4 className="text-info">90%</h4>
                  <small className="text-muted">Excellence</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Grade Modal */}
      {showAddModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingGrade ? 'Edit Grade' : 'Add New Grade'}
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowAddModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Grade</label>
                      <input
                        type="text"
                        className="form-control"
                        name="grade"
                        value={formData.grade}
                        onChange={handleChange}
                        placeholder="e.g., A+"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">GPA</label>
                      <input
                        type="number"
                        className="form-control"
                        name="gpa"
                        value={formData.gpa}
                        onChange={handleChange}
                        step="0.1"
                        min="0"
                        max="4"
                        placeholder="e.g., 4.0"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Min Marks (%)</label>
                      <input
                        type="number"
                        className="form-control"
                        name="minMarks"
                        value={formData.minMarks}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Max Marks (%)</label>
                      <input
                        type="number"
                        className="form-control"
                        name="maxMarks"
                        value={formData.maxMarks}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Description</label>
                      <input
                        type="text"
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="e.g., Outstanding"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingGrade ? 'Update Grade' : 'Add Grade'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GradeSystem;