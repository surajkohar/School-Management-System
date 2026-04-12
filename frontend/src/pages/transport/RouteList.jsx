import React, { useState, useEffect } from 'react';
import DataTable from '../../components/DataTable.jsx';
import Pagination from '../../components/Pagination.jsx';
import FilterDropdown from '../../components/FilterDropdown.jsx';

const RouteList = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('routeName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({});
  const pageSize = 10;

  // Mock data
  const mockRoutes = [
    {
      id: 1,
      routeCode: 'RT001',
      routeName: 'Kathmandu - Bhaktapur',
      startPoint: 'Kathmandu Bus Park',
      endPoint: 'Bhaktapur Durbar Square',
      distance: '15 km',
      duration: '45 min',
      stops: ['Thimi', 'Madhyapur', 'Bhaktapur'],
      vehicleAssigned: 'Bus-001',
      driverName: 'Ram Bahadur',
      totalStudents: 45,
      monthlyFee: 1500,
      status: 'Active'
    },
    {
      id: 2,
      routeCode: 'RT002',
      routeName: 'Lalitpur - Patan',
      startPoint: 'Lalitpur Chowk',
      endPoint: 'Patan Durbar Square',
      distance: '8 km',
      duration: '25 min',
      stops: ['Jawalakhel', 'Kupondole'],
      vehicleAssigned: 'Van-002',
      driverName: 'Shyam Tamang',
      totalStudents: 28,
      monthlyFee: 1200,
      status: 'Active'
    },
    {
      id: 3,
      routeCode: 'RT003',
      routeName: 'Kirtipur - Balkhu',
      startPoint: 'Kirtipur Municipality',
      endPoint: 'Balkhu Bridge',
      distance: '12 km',
      duration: '35 min',
      stops: ['Naikap', 'Kalanki'],
      vehicleAssigned: 'Bus-003',
      driverName: 'Hari Gurung',
      totalStudents: 38,
      monthlyFee: 1300,
      status: 'Active'
    },
    {
      id: 4,
      routeCode: 'RT004',
      routeName: 'Budhanilkantha - Maharajgunj',
      startPoint: 'Budhanilkantha Temple',
      endPoint: 'Maharajgunj Medical Campus',
      distance: '18 km',
      duration: '55 min',
      stops: ['Tokha', 'Gongabu', 'Bansbari'],
      vehicleAssigned: 'Bus-004',
      driverName: 'Krishna Magar',
      totalStudents: 52,
      monthlyFee: 1800,
      status: 'Inactive'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setRoutes(mockRoutes);
      setTotalCount(mockRoutes.length);
      setLoading(false);
    }, 500);
  }, []);

  const columns = [
    {
      key: 'routeCode',
      title: 'Route Code',
      sortable: true
    },
    {
      key: 'routeName',
      title: 'Route Name',
      sortable: true
    },
    {
      key: 'startPoint',
      title: 'Start Point'
    },
    {
      key: 'endPoint',
      title: 'End Point'
    },
    {
      key: 'distance',
      title: 'Distance'
    },
    {
      key: 'duration',
      title: 'Duration'
    },
    {
      key: 'vehicleAssigned',
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
      key: 'totalStudents',
      title: 'Students',
      sortable: true
    },
    {
      key: 'monthlyFee',
      title: 'Monthly Fee',
      render: (value) => `NPR ${value.toLocaleString()}`,
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
    status: [
      { value: 'Active', label: 'Active' },
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

  const handleView = (route) => {
    console.log('View route:', route.id);
  };

  const handleEdit = (route) => {
    console.log('Edit route:', route.id);
  };

  const handleDelete = (route) => {
    if (window.confirm(`Are you sure you want to delete route "${route.routeName}"?`)) {
      console.log('Delete route:', route.id);
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="route-list animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Transport Route Management</h1>
        <button className="btn btn-primary btn-custom">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Route
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
                  placeholder="Search routes..."
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

      {/* Route Summary */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">12</h3>
              <p className="mb-0">Total Routes</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">10</h3>
              <p className="mb-0">Active Routes</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">285</h3>
              <p className="mb-0">Total Students</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">NPR 4.2L</h3>
              <p className="mb-0">Monthly Revenue</p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={routes}
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

export default RouteList;