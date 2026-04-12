import React, { useState, useEffect } from 'react';
import DataTable from '../../components/DataTable.jsx';
import Pagination from '../../components/Pagination.jsx';
import FilterDropdown from '../../components/FilterDropdown.jsx';

const FeeStructure = () => {
  const [feeStructures, setFeeStructures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('class');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({});
  const pageSize = 10;

  // Mock data
  const mockFeeStructures = [
    {
      id: 1,
      class: '1',
      admissionFee: 5000,
      monthlyFee: 1500,
      examFee: 500,
      transportFee: 800,
      libraryFee: 200,
      labFee: 0,
      totalAnnual: 23400,
      status: 'Active'
    },
    {
      id: 2,
      class: '2',
      admissionFee: 5000,
      monthlyFee: 1600,
      examFee: 500,
      transportFee: 800,
      libraryFee: 200,
      labFee: 0,
      totalAnnual: 24600,
      status: 'Active'
    },
    {
      id: 3,
      class: '3',
      admissionFee: 5500,
      monthlyFee: 1700,
      examFee: 600,
      transportFee: 800,
      libraryFee: 250,
      labFee: 0,
      totalAnnual: 26350,
      status: 'Active'
    },
    {
      id: 4,
      class: '9',
      admissionFee: 8000,
      monthlyFee: 2500,
      examFee: 1000,
      transportFee: 1000,
      libraryFee: 300,
      labFee: 500,
      totalAnnual: 40300,
      status: 'Active'
    },
    {
      id: 5,
      class: '10',
      admissionFee: 8500,
      monthlyFee: 2800,
      examFee: 1200,
      transportFee: 1000,
      libraryFee: 300,
      labFee: 600,
      totalAnnual: 44900,
      status: 'Active'
    },
    {
      id: 6,
      class: '11',
      admissionFee: 10000,
      monthlyFee: 3500,
      examFee: 1500,
      transportFee: 1200,
      libraryFee: 400,
      labFee: 800,
      totalAnnual: 58400,
      status: 'Active'
    },
    {
      id: 7,
      class: '12',
      admissionFee: 10000,
      monthlyFee: 3800,
      examFee: 1500,
      transportFee: 1200,
      libraryFee: 400,
      labFee: 800,
      totalAnnual: 62000,
      status: 'Active'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setFeeStructures(mockFeeStructures);
      setTotalCount(mockFeeStructures.length);
      setLoading(false);
    }, 500);
  }, []);

  const columns = [
    {
      key: 'class',
      title: 'Class',
      render: (value) => `Class ${value}`,
      sortable: true
    },
    {
      key: 'admissionFee',
      title: 'Admission Fee',
      render: (value) => `NPR ${value.toLocaleString()}`,
      sortable: true
    },
    {
      key: 'monthlyFee',
      title: 'Monthly Fee',
      render: (value) => `NPR ${value.toLocaleString()}`,
      sortable: true
    },
    {
      key: 'examFee',
      title: 'Exam Fee',
      render: (value) => `NPR ${value.toLocaleString()}`
    },
    {
      key: 'transportFee',
      title: 'Transport Fee',
      render: (value) => `NPR ${value.toLocaleString()}`
    },
    {
      key: 'libraryFee',
      title: 'Library Fee',
      render: (value) => `NPR ${value.toLocaleString()}`
    },
    {
      key: 'labFee',
      title: 'Lab Fee',
      render: (value) => `NPR ${value.toLocaleString()}`
    },
    {
      key: 'totalAnnual',
      title: 'Total Annual',
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
        key: 'classRange',
        label: 'Class Range',
        type: 'select',
        options: [
          { value: '1-5', label: 'Class 1-5 (Primary)' },
          { value: '6-8', label: 'Class 6-8 (Lower Secondary)' },
          { value: '9-10', label: 'Class 9-10 (Secondary)' },
          { value: '11-12', label: 'Class 11-12 (Higher Secondary)' }
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

  const handleView = (feeStructure) => {
    console.log('View fee structure:', feeStructure.id);
  };

  const handleEdit = (feeStructure) => {
    console.log('Edit fee structure:', feeStructure.id);
  };

  const handleDelete = (feeStructure) => {
    if (window.confirm(`Are you sure you want to delete fee structure for Class ${feeStructure.class}?`)) {
      console.log('Delete fee structure:', feeStructure.id);
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="fee-structure animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Fee Structure Management</h1>
        <button className="btn btn-primary btn-custom">
          <i className="bi bi-plus-circle me-2"></i>
          Add Fee Structure
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
                  placeholder="Search fee structures..."
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

      {/* Fee Summary */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">12</h3>
              <p className="mb-0">Total Classes</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">NPR 2.5K</h3>
              <p className="mb-0">Avg Monthly Fee</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">NPR 7.5K</h3>
              <p className="mb-0">Avg Admission Fee</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">NPR 40K</h3>
              <p className="mb-0">Avg Annual Fee</p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={feeStructures}
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

export default FeeStructure;