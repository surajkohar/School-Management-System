import React, { useState, useEffect } from 'react';
import DataTable from '../../components/DataTable.jsx';
import Pagination from '../../components/Pagination.jsx';
import FilterDropdown from '../../components/FilterDropdown.jsx';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('vehicleNumber');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({});
  const pageSize = 10;

  // Mock data
  const mockVehicles = [
    {
      id: 1,
      vehicleNumber: 'BA 1 KHA 1234',
      vehicleType: 'Bus',
      model: 'Tata LP 909',
      year: 2020,
      capacity: 50,
      currentStudents: 45,
      driverName: 'Ram Bahadur',
      driverPhone: '+977-9841234567',
      routeAssigned: 'Kathmandu - Bhaktapur',
      lastMaintenance: '2024-03-15',
      nextMaintenance: '2024-06-15',
      insuranceExpiry: '2024-12-31',
      status: 'Active',
      condition: 'Good'
    },
    {
      id: 2,
      vehicleNumber: 'BA 2 CHA 5678',
      vehicleType: 'Van',
      model: 'Mahindra Bolero',
      year: 2019,
      capacity: 30,
      currentStudents: 28,
      driverName: 'Shyam Tamang',
      driverPhone: '+977-9851234567',
      routeAssigned: 'Lalitpur - Patan',
      lastMaintenance: '2024-02-20',
      nextMaintenance: '2024-05-20',
      insuranceExpiry: '2024-11-15',
      status: 'Active',
      condition: 'Excellent'
    },
    {
      id: 3,
      vehicleNumber: 'BA 3 JHA 9012',
      vehicleType: 'Bus',
      model: 'Ashok Leyland',
      year: 2018,
      capacity: 45,
      currentStudents: 38,
      driverName: 'Hari Gurung',
      driverPhone: '+977-9861234567',
      routeAssigned: 'Kirtipur - Balkhu',
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-04-10',
      insuranceExpiry: '2024-10-20',
      status: 'Maintenance',
      condition: 'Fair'
    },
    {
      id: 4,
      vehicleNumber: 'BA 4 TA 3456',
      vehicleType: 'Microbus',
      model: 'Hyundai County',
      year: 2021,
      capacity: 25,
      currentStudents: 22,
      driverName: 'Krishna Magar',
      driverPhone: '+977-9871234567',
      routeAssigned: 'Budhanilkantha - Maharajgunj',
      lastMaintenance: '2024-03-01',
      nextMaintenance: '2024-06-01',
      insuranceExpiry: '2025-01-15',
      status: 'Active',
      condition: 'Excellent'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setVehicles(mockVehicles);
      setTotalCount(mockVehicles.length);
      setLoading(false);
    }, 500);
  }, []);

  const columns = [
    {
      key: 'vehicleNumber',
      title: 'Vehicle Number',
      sortable: true
    },
    {
      key: 'vehicleType',
      title: 'Type',
      render: (value) => (
        <span className={`badge bg-${
          value === 'Bus' ? 'primary' : 
          value === 'Van' ? 'success' : 'info'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'model',
      title: 'Model'
    },
    {
      key: 'year',
      title: 'Year',
      sortable: true
    },
    {
      key: 'capacity',
      title: 'Capacity',
      render: (value, row) => (
        <div className="d-flex align-items-center">
          <span className="me-2">{row.currentStudents}/{value}</span>
          <div className="progress" style={{ width: '60px', height: '8px' }}>
            <div 
              className={`progress-bar bg-${
                (row.currentStudents / value) > 0.9 ? 'danger' : 
                (row.currentStudents / value) > 0.7 ? 'warning' : 'success'
              }`}
              style={{ width: `${(row.currentStudents / value) * 100}%` }}
            ></div>
          </div>
        </div>
      )
    },
    {
      key: 'driverName',
      title: 'Driver'
    },
    {
      key: 'routeAssigned',
      title: 'Route'
    },
    {
      key: 'nextMaintenance',
      title: 'Next Maintenance',
      render: (value) => new Date(value).toLocaleDateString()
    },
    {
      key: 'condition',
      title: 'Condition',
      render: (value) => (
        <span className={`badge bg-${
          value === 'Excellent' ? 'success' : 
          value === 'Good' ? 'primary' : 
          value === 'Fair' ? 'warning' : 'danger'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (value) => (
        <span className={`badge bg-${
          value === 'Active' ? 'success' : 
          value === 'Maintenance' ? 'warning' : 'secondary'
        }`}>
          {value}
        </span>
      )
    }
  ];

  const filterOptions = {
    status: [
      { value: 'Active', label: 'Active' },
      { value: 'Maintenance', label: 'Maintenance' },
      { value: 'Inactive', label: 'Inactive' }
    ],
    custom: [
      {
        key: 'vehicleType',
        label: 'Vehicle Type',
        type: 'select',
        options: [
          { value: 'Bus', label: 'Bus' },
          { value: 'Van', label: 'Van' },
          { value: 'Microbus', label: 'Microbus' }
        ]
      },
      {
        key: 'condition',
        label: 'Condition',
        type: 'select',
        options: [
          { value: 'Excellent', label: 'Excellent' },
          { value: 'Good', label: 'Good' },
          { value: 'Fair', label: 'Fair' },
          { value: 'Poor', label: 'Poor' }
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

  const handleView = (vehicle) => {
    console.log('View vehicle:', vehicle.id);
  };

  const handleEdit = (vehicle) => {
    console.log('Edit vehicle:', vehicle.id);
  };

  const handleDelete = (vehicle) => {
    if (window.confirm(`Are you sure you want to delete vehicle "${vehicle.vehicleNumber}"?`)) {
      console.log('Delete vehicle:', vehicle.id);
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="vehicle-list animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Vehicle Management</h1>
        <button className="btn btn-primary btn-custom">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Vehicle
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
                  placeholder="Search vehicles..."
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

      {/* Vehicle Summary */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">15</h3>
              <p className="mb-0">Total Vehicles</p>
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
              <p className="mb-0">Maintenance</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">85%</h3>
              <p className="mb-0">Avg Capacity</p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={vehicles}
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

export default VehicleList;