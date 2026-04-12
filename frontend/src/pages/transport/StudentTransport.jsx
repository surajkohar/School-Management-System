import React, { useState, useEffect } from 'react';
import DataTable from '../../components/DataTable.jsx';
import Pagination from '../../components/Pagination.jsx';
import FilterDropdown from '../../components/FilterDropdown.jsx';

const StudentTransport = () => {
  const [studentTransport, setStudentTransport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('studentName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({});
  const pageSize = 10;

  // Mock data
  const mockStudentTransport = [
    {
      id: 1,
      studentId: 'ST001',
      studentName: 'John Doe',
      class: '10',
      section: 'A',
      rollNumber: 'ST001',
      routeCode: 'RT001',
      routeName: 'Kathmandu - Bhaktapur',
      vehicleNumber: 'BA 1 KHA 1234',
      driverName: 'Ram Bahadur',
      pickupPoint: 'Thimi Chowk',
      dropPoint: 'School Gate',
      monthlyFee: 1500,
      feeStatus: 'Paid',
      parentPhone: '+977-9841234567',
      emergencyContact: '+977-9841234568',
      status: 'Active'
    },
    {
      id: 2,
      studentId: 'ST002',
      studentName: 'Jane Smith',
      class: '9',
      section: 'B',
      rollNumber: 'ST002',
      routeCode: 'RT002',
      routeName: 'Lalitpur - Patan',
      vehicleNumber: 'BA 2 CHA 5678',
      driverName: 'Shyam Tamang',
      pickupPoint: 'Jawalakhel',
      dropPoint: 'School Gate',
      monthlyFee: 1200,
      feeStatus: 'Pending',
      parentPhone: '+977-9851234567',
      emergencyContact: '+977-9851234568',
      status: 'Active'
    },
    {
      id: 3,
      studentId: 'ST003',
      studentName: 'Mike Johnson',
      class: '11',
      section: 'A',
      rollNumber: 'ST003',
      routeCode: 'RT003',
      routeName: 'Kirtipur - Balkhu',
      vehicleNumber: 'BA 3 JHA 9012',
      driverName: 'Hari Gurung',
      pickupPoint: 'Naikap',
      dropPoint: 'School Gate',
      monthlyFee: 1300,
      feeStatus: 'Overdue',
      parentPhone: '+977-9861234567',
      emergencyContact: '+977-9861234568',
      status: 'Inactive'
    },
    {
      id: 4,
      studentId: 'ST004',
      studentName: 'Sarah Wilson',
      class: '8',
      section: 'C',
      rollNumber: 'ST004',
      routeCode: 'RT004',
      routeName: 'Budhanilkantha - Maharajgunj',
      vehicleNumber: 'BA 4 TA 3456',
      driverName: 'Krishna Magar',
      pickupPoint: 'Tokha',
      dropPoint: 'School Gate',
      monthlyFee: 1800,
      feeStatus: 'Paid',
      parentPhone: '+977-9871234567',
      emergencyContact: '+977-9871234568',
      status: 'Active'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setStudentTransport(mockStudentTransport);
      setTotalCount(mockStudentTransport.length);
      setLoading(false);
    }, 500);
  }, []);

  const columns = [
    {
      key: 'studentId',
      title: 'Student ID',
      sortable: true
    },
    {
      key: 'studentName',
      title: 'Student Name',
      sortable: true
    },
    {
      key: 'class',
      title: 'Class',
      render: (value, row) => `${value}-${row.section}`
    },
    {
      key: 'routeName',
      title: 'Route'
    },
    {
      key: 'vehicleNumber',
      title: 'Vehicle',
      render: (value) => (
        <span className="badge bg-info">{value}</span>
      )
    },
    {
      key: 'driverName',
      title: 'Driver'
    },
    {
      key: 'pickupPoint',
      title: 'Pickup Point'
    },
    {
      key: 'monthlyFee',
      title: 'Monthly Fee',
      render: (value) => `NPR ${value.toLocaleString()}`,
      sortable: true
    },
    {
      key: 'feeStatus',
      title: 'Fee Status',
      render: (value) => (
        <span className={`badge bg-${
          value === 'Paid' ? 'success' : 
          value === 'Pending' ? 'warning' : 'danger'
        }`}>
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

  const filterOptions = {
    status: [
      { value: 'Active', label: 'Active' },
      { value: 'Inactive', label: 'Inactive' }
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
    custom: [
      {
        key: 'feeStatus',
        label: 'Fee Status',
        type: 'select',
        options: [
          { value: 'Paid', label: 'Paid' },
          { value: 'Pending', label: 'Pending' },
          { value: 'Overdue', label: 'Overdue' }
        ]
      },
      {
        key: 'routeCode',
        label: 'Route',
        type: 'select',
        options: [
          { value: 'RT001', label: 'Kathmandu - Bhaktapur' },
          { value: 'RT002', label: 'Lalitpur - Patan' },
          { value: 'RT003', label: 'Kirtipur - Balkhu' },
          { value: 'RT004', label: 'Budhanilkantha - Maharajgunj' }
        ]
      }
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

  const handleView = (student) => {
    console.log('View student transport:', student.id);
  };

  const handleEdit = (student) => {
    console.log('Edit student transport:', student.id);
  };

  const handleDelete = (student) => {
    if (window.confirm(`Are you sure you want to remove "${student.studentName}" from transport?`)) {
      console.log('Remove student from transport:', student.id);
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="student-transport animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Student Transport Management</h1>
        <button className="btn btn-primary btn-custom">
          <i className="bi bi-plus-circle me-2"></i>
          Assign Transport
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

      {/* Transport Summary */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">285</h3>
              <p className="mb-0">Total Students</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">260</h3>
              <p className="mb-0">Active</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">NPR 4.2L</h3>
              <p className="mb-0">Monthly Revenue</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-danger text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">25</h3>
              <p className="mb-0">Fee Pending</p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={studentTransport}
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

export default StudentTransport;