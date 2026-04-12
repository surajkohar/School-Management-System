import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DataTable from '../../components/DataTable.jsx';
import Pagination from '../../components/Pagination.jsx';
import { setExams, setCurrentPage } from '../../store/slices/examSlice.js';

const ExamList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { 
    exams, 
    loading, 
    totalCount, 
    currentPage, 
    pageSize 
  } = useSelector((state) => state.exams);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Mock data
  const mockExams = [
    {
      id: 1,
      name: 'First Terminal Exam',
      type: 'Terminal',
      class: '10',
      subjects: ['English', 'Nepali', 'Mathematics', 'Science'],
      startDate: '2024-04-15',
      endDate: '2024-04-25',
      totalMarks: 400,
      status: 'Completed'
    },
    {
      id: 2,
      name: 'Second Terminal Exam',
      type: 'Terminal',
      class: '9',
      subjects: ['English', 'Nepali', 'Mathematics', 'Science'],
      startDate: '2024-05-01',
      endDate: '2024-05-10',
      totalMarks: 400,
      status: 'Upcoming'
    },
    {
      id: 3,
      name: 'Unit Test 1',
      type: 'Unit Test',
      class: '8',
      subjects: ['Mathematics', 'Science'],
      startDate: '2024-03-20',
      endDate: '2024-03-22',
      totalMarks: 100,
      status: 'Completed'
    },
    {
      id: 4,
      name: 'Annual Exam',
      type: 'Annual',
      class: '12',
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'English'],
      startDate: '2024-06-01',
      endDate: '2024-06-15',
      totalMarks: 500,
      status: 'Scheduled'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      dispatch(setExams({ exams: mockExams, totalCount: mockExams.length }));
    }, 500);
  }, [dispatch]);

  const columns = [
    {
      key: 'name',
      title: 'Exam Name',
      sortable: true
    },
    {
      key: 'type',
      title: 'Type',
      render: (value) => (
        <span className={`badge bg-${
          value === 'Terminal' ? 'primary' : 
          value === 'Annual' ? 'success' : 'info'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'class',
      title: 'Class',
      sortable: true
    },
    {
      key: 'subjects',
      title: 'Subjects',
      render: (value) => `${value.length} subjects`
    },
    {
      key: 'startDate',
      title: 'Start Date',
      render: (value) => new Date(value).toLocaleDateString()
    },
    {
      key: 'endDate',
      title: 'End Date',
      render: (value) => new Date(value).toLocaleDateString()
    },
    {
      key: 'totalMarks',
      title: 'Total Marks',
      sortable: true
    },
    {
      key: 'status',
      title: 'Status',
      render: (value) => (
        <span className={`badge bg-${
          value === 'Completed' ? 'success' : 
          value === 'Upcoming' ? 'warning' : 
          value === 'Scheduled' ? 'info' : 'secondary'
        }`}>
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
    dispatch(setCurrentPage(page));
  };

  const handleView = (exam) => {
    console.log('View exam:', exam.id);
  };

  const handleEdit = (exam) => {
    console.log('Edit exam:', exam.id);
  };

  const handleDelete = (exam) => {
    if (window.confirm(`Are you sure you want to delete ${exam.name}?`)) {
      console.log('Delete exam:', exam.id);
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="exam-list animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Exam Management</h1>
        <button className="btn btn-primary btn-custom">
          <i className="bi bi-plus-circle me-2"></i>
          Create New Exam
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
                  placeholder="Search exams..."
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
        data={exams}
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

export default ExamList;