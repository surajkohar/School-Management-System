import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/DataTable.jsx';
import Pagination from '../../components/Pagination.jsx';

const ClassList = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const pageSize = 10;

  // Mock data
  const mockClasses = [
    {
      id: 1,
      name: 'Class 1',
      sections: ['A', 'B'],
      totalStudents: 60,
      classTeacher: 'Ms. Sarah Johnson',
      subjects: ['English', 'Nepali', 'Mathematics', 'Science'],
      status: 'Active'
    },
    {
      id: 2,
      name: 'Class 2',
      sections: ['A', 'B', 'C'],
      totalStudents: 75,
      classTeacher: 'Mr. John Smith',
      subjects: ['English', 'Nepali', 'Mathematics', 'Science'],
      status: 'Active'
    },
    {
      id: 3,
      name: 'Class 3',
      sections: ['A', 'B'],
      totalStudents: 55,
      classTeacher: 'Ms. Emily Davis',
      subjects: ['English', 'Nepali', 'Mathematics', 'Science', 'Social Studies'],
      status: 'Active'
    },
    {
      id: 4,
      name: 'Class 10',
      sections: ['A', 'B'],
      totalStudents: 48,
      classTeacher: 'Dr. Michael Brown',
      subjects: ['English', 'Nepali', 'Mathematics', 'Science', 'Social Studies', 'Computer Science'],
      status: 'Active'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setClasses(mockClasses);
      setTotalCount(mockClasses.length);
      setLoading(false);
    }, 500);
  }, []);

  const columns = [
    {
      key: 'name',
      title: 'Class Name',
      sortable: true
    },
    {
      key: 'sections',
      title: 'Sections',
      render: (value) => value.join(', ')
    },
    {
      key: 'totalStudents',
      title: 'Total Students',
      sortable: true
    },
    {
      key: 'classTeacher',
      title: 'Class Teacher',
      sortable: true
    },
    {
      key: 'subjects',
      title: 'Subjects',
      render: (value) => `${value.length} subjects`
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

  const handleView = (classItem) => {
    console.log('View class:', classItem.id);
  };

  const handleEdit = (classItem) => {
    console.log('Edit class:', classItem.id);
  };

  const handleDelete = (classItem) => {
    if (window.confirm(`Are you sure you want to delete ${classItem.name}?`)) {
      console.log('Delete class:', classItem.id);
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="class-list animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Class Management</h1>
        <button className="btn btn-primary btn-custom">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Class
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
                  placeholder="Search classes..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="d-flex gap-2 justify-content-end">
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
        data={classes}
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

export default ClassList;