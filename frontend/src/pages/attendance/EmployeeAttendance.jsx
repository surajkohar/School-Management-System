import React, { useState, useEffect } from 'react';
import DataTable from '../../components/DataTable.jsx';
import Pagination from '../../components/Pagination.jsx';
import FilterDropdown from '../../components/FilterDropdown.jsx';

const EmployeeAttendance = () => {
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
      employeeId: 'EMP001',
      name: 'Dr. Sarah Johnson',
      department: 'Academic',
      position: 'Principal',
      status: 'Present',
      checkIn: '08:00 AM',
      checkOut: '05:00 PM',
      totalHours: '9:00',
      overtime: '1:00',
      remarks: ''
    },
    {
      id: 2,
      employeeId: 'EMP002',
      name: 'Mr. John Smith',
      department: 'Academic',
      position: 'Math Teacher',
      status: 'Present',
      checkIn: '08:15 AM',
      checkOut: '04:30 PM',
      totalHours: '8:15',
      overtime: '0:15',
      remarks: ''
    },
    {
      id: 3,
      employeeId: 'EMP003',
      name: 'Ms. Emily Davis',
      department: 'Academic',
      position: 'English Teacher',
      status: 'Absent',
      checkIn: '-',
      checkOut: '-',
      totalHours: '0:00',
      overtime: '0:00',
      remarks: 'Sick leave'
    },
    {
      id: 4,
      employeeId: 'EMP004',
      name: 'Mr. Michael Brown',
      department: 'Administration',
      position: 'Accountant',
      status: 'Half Day',
      checkIn: '08:30 AM',
      checkOut: '12:30 PM',
      totalHours: '4:00',
      overtime: '0:00',
      remarks: 'Personal work'
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
      key: 'employeeId',
      title: 'Employee ID',
      sortable: true
    },
    {
      key: 'name',
      title: 'Employee Name',
      sortable: true
    },
    {
      key: 'department',
      title: 'Department',
      sortable: true
    },
    {
      key: 'position',
      title: 'Position'
    },
    {
      key: 'status',
      title: 'Status',
      render: (value) => (
        <span className={`badge bg-${
          value === 'Present' ? 'success' : 
          value === 'Absent' ? 'danger' : 
          value === 'Half Day' ? 'warning' : 'secondary'
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
      key: 'overtime',
      title: 'Overtime'
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
      { value: 'Half Day', label: 'Half Day' },
      { value: 'Late', label: 'Late' }
    ],
    department: [
      { value: 'Academic', label: 'Academic' },
      { value: 'Administration', label: 'Administration' },
      { value: 'Support', label: 'Support' },
      { value: 'Maintenance', label: 'Maintenance' }
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

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="employee-attendance animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Employee Attendance</h1>
        <div className="d-flex gap-2">
          <input
            type="date"
            className="form-control"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{ width: 'auto' }}
          />
          <button className="btn btn-primary">
            <i className="bi bi-plus-circle me-2"></i>
            Mark Attendance
          </button>
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
                  placeholder="Search employees..."
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
              <h3 className="fw-bold">78</h3>
              <p className="mb-0">Present</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-danger text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">5</h3>
              <p className="mb-0">Absent</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">2</h3>
              <p className="mb-0">Half Day</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">85</h3>
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

export default EmployeeAttendance;