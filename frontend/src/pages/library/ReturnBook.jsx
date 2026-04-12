import React, { useState, useEffect } from 'react';
import DataTable from '../../components/DataTable.jsx';
import Pagination from '../../components/Pagination.jsx';
import FilterDropdown from '../../components/FilterDropdown.jsx';

const ReturnBook = () => {
  const [returnedBooks, setReturnedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('returnDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({});
  const [showReturnModal, setShowReturnModal] = useState(false);
  const pageSize = 10;

  // Mock data
  const mockReturnedBooks = [
    {
      id: 1,
      bookId: 'B002',
      bookTitle: 'Advanced Mathematics',
      isbn: '978-0-987654-32-1',
      studentId: 'ST002',
      studentName: 'Jane Smith',
      class: '9',
      section: 'B',
      issueDate: '2024-03-10',
      dueDate: '2024-04-10',
      returnDate: '2024-04-08',
      daysLate: 0,
      fine: 0,
      condition: 'Good',
      status: 'Returned'
    },
    {
      id: 2,
      bookId: 'B005',
      bookTitle: 'Chemistry Basics',
      isbn: '978-0-345678-90-1',
      studentId: 'ST005',
      studentName: 'Sarah Wilson',
      class: '8',
      section: 'C',
      issueDate: '2024-02-15',
      dueDate: '2024-03-15',
      returnDate: '2024-03-20',
      daysLate: 5,
      fine: 50,
      condition: 'Fair',
      status: 'Returned'
    },
    {
      id: 3,
      bookId: 'B007',
      bookTitle: 'World History',
      isbn: '978-0-567890-12-3',
      studentId: 'ST007',
      studentName: 'David Brown',
      class: '12',
      section: 'A',
      issueDate: '2024-03-01',
      dueDate: '2024-04-01',
      returnDate: '2024-03-30',
      daysLate: 0,
      fine: 0,
      condition: 'Excellent',
      status: 'Returned'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setReturnedBooks(mockReturnedBooks);
      setTotalCount(mockReturnedBooks.length);
      setLoading(false);
    }, 500);
  }, []);

  const columns = [
    {
      key: 'bookId',
      title: 'Book ID',
      sortable: true
    },
    {
      key: 'bookTitle',
      title: 'Book Title',
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
      key: 'issueDate',
      title: 'Issue Date',
      render: (value) => new Date(value).toLocaleDateString()
    },
    {
      key: 'dueDate',
      title: 'Due Date',
      render: (value) => new Date(value).toLocaleDateString()
    },
    {
      key: 'returnDate',
      title: 'Return Date',
      render: (value) => new Date(value).toLocaleDateString(),
      sortable: true
    },
    {
      key: 'daysLate',
      title: 'Days Late',
      render: (value) => (
        <span className={`badge bg-${value > 0 ? 'danger' : 'success'}`}>
          {value > 0 ? `+${value}` : 'On Time'}
        </span>
      )
    },
    {
      key: 'fine',
      title: 'Fine',
      render: (value) => value > 0 ? `NPR ${value}` : '-',
      sortable: true
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
    custom: [
      {
        key: 'condition',
        label: 'Book Condition',
        type: 'select',
        options: [
          { value: 'Excellent', label: 'Excellent' },
          { value: 'Good', label: 'Good' },
          { value: 'Fair', label: 'Fair' },
          { value: 'Poor', label: 'Poor' }
        ]
      },
      {
        key: 'fineStatus',
        label: 'Fine Status',
        type: 'select',
        options: [
          { value: 'No Fine', label: 'No Fine' },
          { value: 'With Fine', label: 'With Fine' }
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

  const handleView = (book) => {
    console.log('View return details:', book.id);
  };

  const handlePrintReceipt = (book) => {
    console.log('Print return receipt:', book.id);
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="return-book animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Book Return Management</h1>
        <button 
          className="btn btn-primary btn-custom"
          onClick={() => setShowReturnModal(true)}
        >
          <i className="bi bi-arrow-return-left me-2"></i>
          Process Return
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
                  placeholder="Search returned books..."
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

      {/* Return Summary */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">320</h3>
              <p className="mb-0">Total Returns</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">285</h3>
              <p className="mb-0">On Time</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">35</h3>
              <p className="mb-0">Late Returns</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-danger text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">NPR 1,750</h3>
              <p className="mb-0">Fine Collected</p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={returnedBooks}
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

      {/* Return Book Modal */}
      {showReturnModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Process Book Return</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowReturnModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Book ID/ISBN</label>
                      <input type="text" className="form-control" placeholder="Enter book ID or ISBN" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Student ID</label>
                      <input type="text" className="form-control" placeholder="Enter student ID" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Return Date</label>
                      <input type="date" className="form-control" defaultValue={new Date().toISOString().split('T')[0]} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Book Condition</label>
                      <select className="form-select">
                        <option value="">Select Condition</option>
                        <option value="Excellent">Excellent</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                        <option value="Poor">Poor</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Fine Amount (NPR)</label>
                      <input type="number" className="form-control" placeholder="0" min="0" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Fine Reason</label>
                      <select className="form-select">
                        <option value="">No Fine</option>
                        <option value="Late Return">Late Return</option>
                        <option value="Damage">Book Damage</option>
                        <option value="Lost">Book Lost</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Notes</label>
                      <textarea className="form-control" rows="3" placeholder="Additional notes about the return..."></textarea>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowReturnModal(false)}
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-success">
                  Process Return
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReturnBook;