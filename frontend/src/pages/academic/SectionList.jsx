import React, { useState, useEffect } from 'react';
import DataTable from '../../components/DataTable.jsx';
import Pagination from '../../components/Pagination.jsx';
import FilterDropdown from '../../components/FilterDropdown.jsx';

const SectionList = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({});
  const pageSize = 10;

  // Mock data
  const mockSections = [
    {
      id: 1,
      name: 'Section A',
      class: '10',
      capacity: 30,
      currentStudents: 28,
      classTeacher: 'Ms. Sarah Johnson',
      room: 'Room 101',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Section B',
      class: '10',
      capacity: 30,
      currentStudents: 25,
      classTeacher: 'Mr. John Smith',
      room: 'Room 102',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Section A',
      class: '9',
      capacity: 32,
      currentStudents: 30,
      classTeacher: 'Ms. Emily Davis',
      room: 'Room 201',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Section B',
      class: '9',
      capacity: 32,
      currentStudents: 29,
      classTeacher: 'Mr. Michael Brown',
      room: 'Room 202',
      status: 'Active'
    },
    {
      id: 5,
      name: 'Section C',
      class: '9',
      capacity: 30,
      currentStudents: 27,
      classTeacher: 'Ms. Lisa Wilson',
      room: 'Room 203',
      status: 'Active'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setSections(mockSections);
      setTotalCount(mockSections.length);
      setLoading(false);
    }, 500);
  }, []);

  const columns = [
    {
      key: 'name',
      title: 'Section Name',
      sortable: true
    },
    {
      key: 'class',
      title: 'Class',
      sortable: true
    },
    {
      key: 'capacity',
      title: 'Capacity',
      sortable: true
    },
    {
      key: 'currentStudents',
      title: 'Current Students',
      sortable: true
    },
    {
      key: 'occupancy',
      title: 'Occupancy',
      render: (value, row) => {
        const percentage = Math.round((row.currentStudents / row.capacity) * 100);
        return (
          <div className="d-flex align-items-center">
            <div className="progress me-2" style={{ width: '60px', height: '8px' }}>
              <div 
                className={`progress-bar bg-${
                  percentage >= 90 ? 'danger' : 
                  percentage >= 80 ? 'warning' : 'success'
                }`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <small>{percentage}%</small>
          </div>
        );
      }
    },
    {
      key: 'classTeacher',
      title: 'Class Teacher',
      sortable: true
    },
    {
      key: 'room',
      title: 'Room',
      sortable: true
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

  const filterOptions = {
    class: [
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
    ],
    status: [
      { value: 'Active', label: 'Active' },
      { value: 'Inactive', label: 'Inactive' }
    ]
  };

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

  const handleFiltersApply = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleView = (section) => {
    console.log('View section:', section.id);
  };

  const handleEdit = (section) => {
    console.log('Edit section:', section.id);
  };

  const handleDelete = (section) => {
    if (window.confirm(`Are you sure you want to delete ${section.name} of Class ${section.class}?`)) {
      console.log('Delete section:', section.id);
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="section-list animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Section Management</h1>
        <button className="btn btn-primary btn-custom">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Section
        </button>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search sections..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            </div>
            
            <div className="col-md-8">
              <div className="d-flex gap-2 justify-content-end position-relative">
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <i className="bi bi-funnel me-1"></i>
                  Filters
                </button>
                
                <FilterDropdown
                  isOpen={showFilters}
                  onClose={() => setShowFilters(false)}
                  onApply={handleFiltersApply}
                  filters={filters}
                  filterOptions={filterOptions}
                />
                
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

      {/* Section Summary */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">24</h3>
              <p className="mb-0">Total Sections</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">22</h3>
              <p className="mb-0">Active Sections</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">720</h3>
              <p className="mb-0">Total Capacity</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">85%</h3>
              <p className="mb-0">Avg Occupancy</p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={sections}
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

export default SectionList;