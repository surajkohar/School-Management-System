import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/DataTable.jsx';
import Pagination from '../../components/Pagination.jsx';

const SubjectList = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const pageSize = 10;

  // Mock data
  const mockSubjects = [
    {
      id: 1,
      name: 'Mathematics',
      code: 'MATH',
      classes: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      teacher: 'Mr. John Smith',
      type: 'Core',
      status: 'Active'
    },
    {
      id: 2,
      name: 'English',
      code: 'ENG',
      classes: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      teacher: 'Ms. Sarah Johnson',
      type: 'Core',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Science',
      code: 'SCI',
      classes: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      teacher: 'Dr. Emily Davis',
      type: 'Core',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Computer Science',
      code: 'CS',
      classes: ['6', '7', '8', '9', '10', '11', '12'],
      teacher: 'Mr. Michael Brown',
      type: 'Optional',
      status: 'Active'
    },
    {
      id: 5,
      name: 'Physics',
      code: 'PHY',
      classes: ['11', '12'],
      teacher: 'Dr. Lisa Wilson',
      type: 'Core',
      status: 'Active'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setSubjects(mockSubjects);
      setTotalCount(mockSubjects.length);
      setLoading(false);
    }, 500);
  }, []);

  const columns = [
    {
      key: 'name',
      title: 'Subject Name',
      sortable: true
    },
    {
      key: 'code',
      title: 'Subject Code',
      sortable: true
    },
    {
      key: 'classes',
      title: 'Classes',
      render: (value) => `Class ${value.join(', ')}`
    },
    {
      key: 'teacher',
      title: 'Teacher',
      sortable: true
    },
    {
      key: 'type',
      title: 'Type',
      render: (value) => (
        <span className={`badge bg-${value === 'Core' ? 'primary' : 'info'}`}>
          {value}
        </span>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (value) => (
        <span className={`badge bg-${value === 'Active' ? 'success' : 'secondary'}`}>
          {value}
        </span>
      )
    }
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (field, order) => {
    setSortField(field);
    setSortOrder(order);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleView = (subject) => {
    console.log('View subject:', subject.id);
  };

  const handleEdit = (subject) => {
    console.log('Edit subject:', subject.id);
  };

  const handleDelete = (subject) => {
    if (window.confirm(`Are you sure you want to delete ${subject.name}?`)) {
      console.log('Delete subject:', subject.id);
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="subject-list animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Subject Management</h1>
        <button className="btn btn-primary btn-custom">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Subject
        </button>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search subjects..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="d-flex gap-2 justify-content-end">
                <button className="btn btn-outline-secondary">
                  <i className="bi bi-funnel me-1"></i>
                  Filters
                </button>
                <button className="btn btn-outline-success">
                  <i className="bi bi-download me-1"></i>
                  Export
                </button>
                <button className="btn btn-outline-info">
                  <i className="bi bi-printer me-1"></i>
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={subjects}
        loading={loading}
        onSort={handleSort}
        sortField={sortField}
        sortOrder={sortOrder}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={totalCount}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default SubjectList;