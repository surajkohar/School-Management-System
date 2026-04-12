import React, { useState, useEffect } from 'react';
import DataTable from '../../components/DataTable.jsx';
import Pagination from '../../components/Pagination.jsx';
import FilterDropdown from '../../components/FilterDropdown.jsx';

const StudentAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const pageSize = 10;

  // Mock data
  const mockAttendance = [
    {
      id: 1,
      rollNumber: 'ST001',
      name: 'John Doe',
      class: '10',
      section: 'A',
      status: 'Present',
      checkIn: '08:30 AM',
      checkOut: '03:30 PM',
      totalHours: '7:00',
      remarks: ''
    },
    {
      id: 2,
      rollNumber: 'ST002',
      name: 'Jane Smith',
      class: '9',
      section: 'B',
      status: 'Absent',
      checkIn: '-',
      checkOut: '-',
      totalHours: '0:00',
      remarks: 'Sick leave'
    },
    {
      id: 3,
      rollNumber: 'ST003',
      name: 'Mike Johnson',
      class: '11',
      section: 'A',
      status: 'Late',
      checkIn: '09:15 AM',
      checkOut: '03:30 PM',
      totalHours: '6:15',
      remarks: 'Traffic jam'
    },
    {
      id: 4,
      rollNumber: 'ST004',
      name: 'Sarah Wilson',
      class: '8',
      section: 'C',
      status: 'Present',
      checkIn: '08:25 AM',
      checkOut: '03:30 PM',
      totalHours: '7:05',
      remarks: ''
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setAttendance(mockAttendance);
      setTotalCount(mockAttendance.length);
      setLoading(false);
    }, 500);
  }, []);

  const columns = [
    {
      key: 'rollNumber',
      title: 'Roll No.',
      sortable: true
    },
    {
      key: 'name',
      title: 'Student Name',
      sortable: true
    },
    {
      key: 'class',
      title: 'Class',
      render: (value, row) => `${value}-${row.section}`
    },
    {
      key: 'status',
      title: 'Status',
      render: (value) => (
        <span className={`badge bg-${
          value === 'Present' ? 'success' : 
          value === 'Absent' ? 'danger' : 
          value === 'Late' ? 'warning' : 'secondary'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'checkIn',
      title: 'Check In'
    },
    {
      key: 'checkOut',
      title: 'Check Out'
    },
    {
      key: 'totalHours',
      title: 'Total Hours'
    },
    {
      key: 'remarks',
      title: 'Remarks'
    }
  ];

  const filterOptions = {
    status: [
      { value: 'Present', label: 'Present' },
      { value: 'Absent', label: 'Absent' },
      { value: 'Late', label: 'Late' },
      { value: 'Half Day', label: 'Half Day' }
    ],
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
    section: [
      { value: 'A', label: 'Section A' },
      { value: 'B', label: 'Section B' },
      { value: 'C', label: 'Section C' },
      { value: 'D', label: 'Section D' }
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

  const handleMarkAttendance = (student, status) => {
    console.log(`Mark ${student.name} as ${status}`);
    // Update attendance logic here
  };

  const handleBulkAttendance = (status) => {
    console.log(`Mark all as ${status}`);
    // Bulk attendance logic here
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="student-attendance animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Student Attendance</h1>
        <div className="d-flex gap-2">
          <input
            type="date"
            className="form-control"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{ width: 'auto' }}
          />
          <div className="dropdown">
            <button 
              className="btn btn-success dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <i className="bi bi-check-circle me-2"></i>
              Bulk Actions
            </button>
            <ul className="dropdown-menu">
              <li><button className="dropdown-item" onClick={() => handleBulkAttendance('Present')}>
                <i className="bi bi-check-circle me-2 text-success"></i>Mark All Present
              </button></li>
              <li><button className="dropdown-item" onClick={() => handleBulkAttendance('Absent')}>
                <i className="bi bi-x-circle me-2 text-danger"></i>Mark All Absent
              </button></li>
            </ul>
          </div>
        </div>
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
                  placeholder="Search students..."
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

      {/* Attendance Summary */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">85</h3>
              <p className="mb-0">Present</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-danger text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">12</h3>
              <p className="mb-0">Absent</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">5</h3>
              <p className="mb-0">Late</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">102</h3>
              <p className="mb-0">Total</p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={attendance}
        loading={loading}
        onSort={handleSort}
        sortField={sortField}
        sortOrder={sortOrder}
        actions={false}
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

export default StudentAttendance;