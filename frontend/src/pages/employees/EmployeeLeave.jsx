import React, { useState, useEffect } from 'react';
import DataTable from '../../components/DataTable.jsx';
import Pagination from '../../components/Pagination.jsx';
import FilterDropdown from '../../components/FilterDropdown.jsx';

const EmployeeLeave = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('appliedDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({});
  const pageSize = 10;

  // Mock data
  const mockLeaves = [
    {
      id: 1,
      employeeId: 'EMP001',
      name: 'Dr. Sarah Johnson',
      department: 'Academic',
      leaveType: 'Annual Leave',
      fromDate: '2024-04-15',
      toDate: '2024-04-17',
      days: 3,
      reason: 'Family vacation',
      appliedDate: '2024-04-01',
      status: 'Approved',
      approvedBy: 'HR Manager'
    },
    {
      id: 2,
      employeeId: 'EMP002',
      name: 'Mr. John Smith',
      department: 'Academic',
      leaveType: 'Sick Leave',
      fromDate: '2024-04-10',
      toDate: '2024-04-10',
      days: 1,
      reason: 'Medical checkup',
      appliedDate: '2024-04-09',
      status: 'Approved',
      approvedBy: 'Principal'
    },
    {
      id: 3,
      employeeId: 'EMP003',
      name: 'Ms. Emily Davis',
      department: 'Academic',
      leaveType: 'Casual Leave',
      fromDate: '2024-04-20',
      toDate: '2024-04-21',
      days: 2,
      reason: 'Personal work',
      appliedDate: '2024-04-18',
      status: 'Pending',
      approvedBy: null
    },
    {
      id: 4,
      employeeId: 'EMP004',
      name: 'Mr. Michael Brown',
      department: 'Administration',
      leaveType: 'Maternity Leave',
      fromDate: '2024-05-01',
      toDate: '2024-07-30',
      days: 90,
      reason: 'Maternity leave',
      appliedDate: '2024-03-15',
      status: 'Approved',
      approvedBy: 'HR Manager'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setLeaves(mockLeaves);
      setTotalCount(mockLeaves.length);
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
      key: 'leaveType',
      title: 'Leave Type',
      render: (value) => (
        <span className={`badge bg-${
          value === 'Annual Leave' ? 'primary' : 
          value === 'Sick Leave' ? 'warning' : 
          value === 'Casual Leave' ? 'info' : 
          value === 'Maternity Leave' ? 'success' : 'secondary'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'fromDate',
      title: 'From Date',
      render: (value) => new Date(value).toLocaleDateString()
    },
    {
      key: 'toDate',
      title: 'To Date',
      render: (value) => new Date(value).toLocaleDateString()
    },
    {
      key: 'days',
      title: 'Days',
      sortable: true
    },
    {
      key: 'status',
      title: 'Status',
      render: (value) => (
        <span className={`badge bg-${
          value === 'Approved' ? 'success' : 
          value === 'Rejected' ? 'danger' : 'warning'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'appliedDate',
      title: 'Applied Date',
      render: (value) => new Date(value).toLocaleDateString(),
      sortable: true
    }
  ];

  const filterOptions = {
    status: [
      { value: 'Pending', label: 'Pending' },
      { value: 'Approved', label: 'Approved' },
      { value: 'Rejected', label: 'Rejected' }
    ],
    department: [
      { value: 'Academic', label: 'Academic' },
      { value: 'Administration', label: 'Administration' },
      { value: 'Support', label: 'Support' },
      { value: 'Maintenance', label: 'Maintenance' }
    ],
    custom: [
      {
        key: 'leaveType',
        label: 'Leave Type',
        type: 'select',
        options: [
          { value: 'Annual Leave', label: 'Annual Leave' },
          { value: 'Sick Leave', label: 'Sick Leave' },
          { value: 'Casual Leave', label: 'Casual Leave' },
          { value: 'Maternity Leave', label: 'Maternity Leave' },
          { value: 'Paternity Leave', label: 'Paternity Leave' }
        ]
      }
    ],
    dateRange: true
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

  const handleView = (leave) => {
    console.log('View leave details:', leave.id);
  };

  const handleApprove = (leave) => {
    console.log('Approve leave:', leave.id);
  };

  const handleReject = (leave) => {
    console.log('Reject leave:', leave.id);
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="employee-leave animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Employee Leave Management</h1>
        <button className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Apply Leave
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
                  placeholder="Search leaves..."
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

      {/* Leave Summary */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">15</h3>
              <p className="mb-0">Pending</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">45</h3>
              <p className="mb-0">Approved</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-danger text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">8</h3>
              <p className="mb-0">Rejected</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">68</h3>
              <p className="mb-0">Total</p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={leaves}
        loading={loading}
        onSort={handleSort}
        sortField={sortField}
        sortOrder={sortOrder}
        onView={handleView}
        onEdit={handleApprove}
        onDelete={handleReject}
        actions={true}
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

export default EmployeeLeave;