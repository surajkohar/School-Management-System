import React, { useState, useEffect } from 'react';
import DataTable from '../../components/DataTable.jsx';
import Pagination from '../../components/Pagination.jsx';
import FilterDropdown from '../../components/FilterDropdown.jsx';

const FeeCollection = () => {
  const [feeCollections, setFeeCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({});
  const pageSize = 10;

  // Mock data
  const mockFeeCollections = [
    {
      id: 1,
      receiptNo: 'RC001',
      studentName: 'John Doe',
      rollNumber: 'ST001',
      class: '10',
      section: 'A',
      feeType: 'Monthly Fee',
      amount: 2000,
      discount: 200,
      paidAmount: 1800,
      paymentMethod: 'Cash',
      date: '2024-04-03',
      collectedBy: 'Admin'
    },
    {
      id: 2,
      receiptNo: 'RC002',
      studentName: 'Jane Smith',
      rollNumber: 'ST002',
      class: '9',
      section: 'B',
      feeType: 'Admission Fee',
      amount: 5000,
      discount: 0,
      paidAmount: 5000,
      paymentMethod: 'Bank Transfer',
      date: '2024-04-02',
      collectedBy: 'Accountant'
    },
    {
      id: 3,
      receiptNo: 'RC003',
      studentName: 'Mike Johnson',
      rollNumber: 'ST003',
      class: '11',
      section: 'A',
      feeType: 'Monthly Fee',
      amount: 2500,
      discount: 250,
      paidAmount: 2250,
      paymentMethod: 'Online',
      date: '2024-04-01',
      collectedBy: 'Admin'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setFeeCollections(mockFeeCollections);
      setTotalCount(mockFeeCollections.length);
      setLoading(false);
    }, 500);
  }, []);

  const columns = [
    {
      key: 'receiptNo',
      title: 'Receipt No.',
      sortable: true
    },
    {
      key: 'studentName',
      title: 'Student Name',
      sortable: true
    },
    {
      key: 'rollNumber',
      title: 'Roll No.',
      sortable: true
    },
    {
      key: 'class',
      title: 'Class',
      render: (value, row) => `${value}-${row.section}`
    },
    {
      key: 'feeType',
      title: 'Fee Type',
      sortable: true
    },
    {
      key: 'amount',
      title: 'Amount',
      render: (value) => `NPR ${value.toLocaleString()}`,
      sortable: true
    },
    {
      key: 'discount',
      title: 'Discount',
      render: (value) => `NPR ${value.toLocaleString()}`
    },
    {
      key: 'paidAmount',
      title: 'Paid Amount',
      render: (value) => `NPR ${value.toLocaleString()}`,
      sortable: true
    },
    {
      key: 'paymentMethod',
      title: 'Payment Method',
      render: (value) => (
        <span className={`badge bg-${
          value === 'Cash' ? 'success' : 
          value === 'Bank Transfer' ? 'primary' : 'info'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'date',
      title: 'Date',
      render: (value) => new Date(value).toLocaleDateString(),
      sortable: true
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
    section: [
      { value: 'A', label: 'Section A' },
      { value: 'B', label: 'Section B' },
      { value: 'C', label: 'Section C' },
      { value: 'D', label: 'Section D' }
    ],
    custom: [
      {
        key: 'feeType',
        label: 'Fee Type',
        type: 'select',
        options: [
          { value: 'Monthly Fee', label: 'Monthly Fee' },
          { value: 'Admission Fee', label: 'Admission Fee' },
          { value: 'Exam Fee', label: 'Exam Fee' },
          { value: 'Transport Fee', label: 'Transport Fee' },
          { value: 'Library Fee', label: 'Library Fee' }
        ]
      },
      {
        key: 'paymentMethod',
        label: 'Payment Method',
        type: 'select',
        options: [
          { value: 'Cash', label: 'Cash' },
          { value: 'Bank Transfer', label: 'Bank Transfer' },
          { value: 'Online', label: 'Online' },
          { value: 'Cheque', label: 'Cheque' }
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

  const handleView = (collection) => {
    console.log('View receipt:', collection.id);
  };

  const handlePrintReceipt = (collection) => {
    console.log('Print receipt:', collection.receiptNo);
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="fee-collection animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Fee Collection</h1>
        <button className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Collect Fee
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
                  placeholder="Search collections..."
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

      {/* Collection Summary */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">NPR 2.5M</h3>
              <p className="mb-0">Today's Collection</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">NPR 15.2M</h3>
              <p className="mb-0">This Month</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">NPR 3.8M</h3>
              <p className="mb-0">Pending</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">245</h3>
              <p className="mb-0">Transactions</p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={feeCollections}
        loading={loading}
        onSort={handleSort}
        sortField={sortField}
        sortOrder={sortOrder}
        onView={handleView}
        onEdit={handlePrintReceipt}
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

export default FeeCollection;