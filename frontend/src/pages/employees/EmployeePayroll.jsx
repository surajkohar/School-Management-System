import React, { useState, useEffect } from 'react';
import DataTable from '../../components/DataTable.jsx';
import Pagination from '../../components/Pagination.jsx';
import FilterDropdown from '../../components/FilterDropdown.jsx';

const EmployeePayroll = () => {
  const [payroll, setPayroll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const pageSize = 10;

  // Mock data
  const mockPayroll = [
    {
      id: 1,
      employeeId: 'EMP001',
      name: 'Dr. Sarah Johnson',
      department: 'Academic',
      position: 'Principal',
      basicSalary: 75000,
      allowances: 15000,
      overtime: 5000,
      deductions: 8000,
      netSalary: 87000,
      status: 'Paid',
      payDate: '2024-03-31'
    },
    {
      id: 2,
      employeeId: 'EMP002',
      name: 'Mr. John Smith',
      department: 'Academic',
      position: 'Math Teacher',
      basicSalary: 45000,
      allowances: 8000,
      overtime: 2000,
      deductions: 5000,
      netSalary: 50000,
      status: 'Paid',
      payDate: '2024-03-31'
    },
    {
      id: 3,
      employeeId: 'EMP003',
      name: 'Ms. Emily Davis',
      department: 'Academic',
      position: 'English Teacher',
      basicSalary: 42000,
      allowances: 7000,
      overtime: 1500,
      deductions: 4500,
      netSalary: 46000,
      status: 'Pending',
      payDate: null
    },
    {
      id: 4,
      employeeId: 'EMP004',
      name: 'Mr. Michael Brown',
      department: 'Administration',
      position: 'Accountant',
      basicSalary: 35000,
      allowances: 5000,
      overtime: 0,
      deductions: 3500,
      netSalary: 36500,
      status: 'Paid',
      payDate: '2024-03-31'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setPayroll(mockPayroll);
      setTotalCount(mockPayroll.length);
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
      key: 'basicSalary',
      title: 'Basic Salary',
      render: (value) => `NPR ${value.toLocaleString()}`,
      sortable: true
    },
    {
      key: 'allowances',
      title: 'Allowances',
      render: (value) => `NPR ${value.toLocaleString()}`
    },
    {
      key: 'overtime',
      title: 'Overtime',
      render: (value) => `NPR ${value.toLocaleString()}`
    },
    {
      key: 'deductions',
      title: 'Deductions',
      render: (value) => `NPR ${value.toLocaleString()}`
    },
    {
      key: 'netSalary',
      title: 'Net Salary',
      render: (value) => `NPR ${value.toLocaleString()}`,
      sortable: true
    },
    {
      key: 'status',
      title: 'Status',
      render: (value) => (
        <span className={`badge bg-${value === 'Paid' ? 'success' : 'warning'}`}>
          {value}
        </span>
      )
    }
  ];

  const filterOptions = {
    status: [
      { value: 'Paid', label: 'Paid' },
      { value: 'Pending', label: 'Pending' },
      { value: 'Processing', label: 'Processing' }
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

  const handleView = (employee) => {
    console.log('View payroll details:', employee.id);
  };

  const handleGeneratePayslip = (employee) => {
    console.log('Generate payslip for:', employee.name);
  };

  const handleProcessPayroll = () => {
    console.log('Process payroll for month:', selectedMonth);
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="employee-payroll animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Employee Payroll</h1>
        <div className="d-flex gap-2">
          <input
            type="month"
            className="form-control"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            style={{ width: 'auto' }}
          />
          <button className="btn btn-success" onClick={handleProcessPayroll}>
            <i className="bi bi-gear me-2"></i>
            Process Payroll
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

      {/* Payroll Summary */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">NPR 4.2M</h3>
              <p className="mb-0">Total Payroll</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">78</h3>
              <p className="mb-0">Paid</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">7</h3>
              <p className="mb-0">Pending</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">85</h3>
              <p className="mb-0">Total Employees</p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={payroll}
        loading={loading}
        onSort={handleSort}
        sortField={sortField}
        sortOrder={sortOrder}
        onView={handleView}
        onEdit={handleGeneratePayslip}
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

export default EmployeePayroll;