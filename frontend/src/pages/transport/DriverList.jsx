import React, { useState, useEffect } from 'react';
import DataTable from '../../components/DataTable.jsx';
import Pagination from '../../components/Pagination.jsx';
import FilterDropdown from '../../components/FilterDropdown.jsx';

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);
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
  const mockDrivers = [
    {
      id: 1,
      driverId: 'DRV001',
      name: 'Ram Bahadur Shrestha',
      phone: '+977-9841234567',
      email: 'ram.bahadur@school.com',
      licenseNumber: 'DL-12345678',
      licenseExpiry: '2025-06-15',
      experience: '15 years',
      vehicleAssigned: 'BA 1 KHA 1234',
      routeAssigned: 'Kathmandu - Bhaktapur',
      joinDate: '2020-01-15',
      salary: 35000,
      address: 'Kathmandu, Nepal',
      emergencyContact: '+977-9841234568',
      status: 'Active'
    },
    {
      id: 2,
      driverId: 'DRV002',
      name: 'Shyam Tamang',
      phone: '+977-9851234567',
      email: 'shyam.tamang@school.com',
      licenseNumber: 'DL-87654321',
      licenseExpiry: '2024-12-20',
      experience: '12 years',
      vehicleAssigned: 'BA 2 CHA 5678',
      routeAssigned: 'Lalitpur - Patan',
      joinDate: '2021-03-10',
      salary: 32000,
      address: 'Lalitpur, Nepal',
      emergencyContact: '+977-9851234568',
      status: 'Active'
    },
    {
      id: 3,
      driverId: 'DRV003',
      name: 'Hari Gurung',
      phone: '+977-9861234567',
      email: 'hari.gurung@school.com',
      licenseNumber: 'DL-11223344',
      licenseExpiry: '2024-08-30',
      experience: '8 years',
      vehicleAssigned: 'BA 3 JHA 9012',
      routeAssigned: 'Kirtipur - Balkhu',
      joinDate: '2022-06-01',
      salary: 30000,
      address: 'Kirtipur, Nepal',
      emergencyContact: '+977-9861234568',
      status: 'On Leave'
    },
    {
      id: 4,
      driverId: 'DRV004',
      name: 'Krishna Magar',
      phone: '+977-9871234567',
      email: 'krishna.magar@school.com',
      licenseNumber: 'DL-55667788',
      licenseExpiry: '2025-03-15',
      experience: '10 years',
      vehicleAssigned: 'BA 4 TA 3456',
      routeAssigned: 'Budhanilkantha - Maharajgunj',
      joinDate: '2021-08-20',
      salary: 33000,
      address: 'Budhanilkantha, Nepal',
      emergencyContact: '+977-9871234568',
      status: 'Active'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setDrivers(mockDrivers);
      setTotalCount(mockDrivers.length);
      setLoading(false);
    }, 500);
  }, []);

  const columns = [
    {
      key: 'driverId',
      title: 'Driver ID',
      sortable: true
    },
    {
      key: 'name',
      title: 'Driver Name',
      sortable: true
    },
    {
      key: 'phone',
      title: 'Phone'
    },
    {
      key: 'licenseNumber',
      title: 'License Number'
    },
    {
      key: 'licenseExpiry',
      title: 'License Expiry',
      render: (value) => {
        const expiryDate = new Date(value);
        const today = new Date();
        const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
        
        return (
          <div>
            <div>{expiryDate.toLocaleDateString()}</div>
            {daysUntilExpiry < 30 && (
              <small className="text-danger">Expires in {daysUntilExpiry} days</small>
            )}
          </div>
        );
      }
    },
    {
      key: 'experience',
      title: 'Experience'
    },
    {
      key: 'vehicleAssigned',
      title: 'Vehicle',
      render: (value) => (
        <span className="badge bg-info">{value}</span>
      )
    },
    {
      key: 'salary',
      title: 'Salary',
      render: (value) => `NPR ${value.toLocaleString()}`,
      sortable: true
    },
    {
      key: 'status',
      title: 'Status',
      render: (value) => (
        <span className={`badge bg-${
          value === 'Active' ? 'success' : 
          value === 'On Leave' ? 'warning' : 'secondary'
        }`}>
          {value}
        </span>
      )
    }
  ];

  const filterOptions = {
    status: [
      { value: 'Active', label: 'Active' },
      { value: 'On Leave', label: 'On Leave' },
      { value: 'Inactive', label: 'Inactive' }
    ],
    custom: [
      {
        key: 'experience',
        label: 'Experience',
        type: 'select',
        options: [
          { value: '0-5', label: '0-5 years' },
          { value: '5-10', label: '5-10 years' },
          { value: '10-15', label: '10-15 years' },
          { value: '15+', label: '15+ years' }
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

  const handleView = (driver) => {
    console.log('View driver:', driver.id);
  };

  const handleEdit = (driver) => {
    console.log('Edit driver:', driver.id);
  };

  const handleDelete = (driver) => {
    if (window.confirm(`Are you sure you want to delete driver "${driver.name}"?`)) {
      console.log('Delete driver:', driver.id);
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="driver-list animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Driver Management</h1>
        <button className="btn btn-primary btn-custom">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Driver
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
                  placeholder="Search drivers..."
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

      {/* Driver Summary */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">15</h3>
              <p className="mb-0">Total Drivers</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">12</h3>
              <p className="mb-0">Active</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">2</h3>
              <p className="mb-0">On Leave</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-danger text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">3</h3>
              <p className="mb-0">License Expiring</p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={drivers}
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

export default DriverList;