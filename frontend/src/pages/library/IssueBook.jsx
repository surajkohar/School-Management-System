import React, { useState, useEffect } from 'react';
import DataTable from '../../components/DataTable.jsx';
import Pagination from '../../components/Pagination.jsx';
import FilterDropdown from '../../components/FilterDropdown.jsx';

const IssueBook = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('issueDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({});
  const [showIssueModal, setShowIssueModal] = useState(false);
  const pageSize = 10;

  // Mock data
  const mockIssuedBooks = [
    {
      id: 1,
      bookId: 'B001',
      bookTitle: 'Introduction to Computer Science',
      isbn: '978-0-123456-78-9',
      studentId: 'ST001',
      studentName: 'John Doe',
      class: '10',
      section: 'A',
      issueDate: '2024-03-15',
      dueDate: '2024-04-15',
      returnDate: null,
      status: 'Issued',
      fine: 0
    },
    {
      id: 2,
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
      status: 'Returned',
      fine: 0
    },
    {
      id: 3,
      bookId: 'B003',
      bookTitle: 'Physics Fundamentals',
      isbn: '978-0-789012-34-5',
      studentId: 'ST003',
      studentName: 'Mike Johnson',
      class: '11',
      section: 'A',
      issueDate: '2024-02-20',
      dueDate: '2024-03-20',
      returnDate: null,
      status: 'Overdue',
      fine: 150
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setIssuedBooks(mockIssuedBooks);
      setTotalCount(mockIssuedBooks.length);
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
      render: (value) => new Date(value).toLocaleDateString(),
      sortable: true
    },
    {
      key: 'dueDate',
      title: 'Due Date',
      render: (value) => new Date(value).toLocaleDateString(),
      sortable: true
    },
    {
      key: 'returnDate',
      title: 'Return Date',
      render: (value) => value ? new Date(value).toLocaleDateString() : '-'
    },
    {
      key: 'status',
      title: 'Status',
      render: (value) => (
        <span className={`badge bg-${
          value === 'Issued' ? 'primary' : 
          value === 'Returned' ? 'success' : 'danger'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'fine',
      title: 'Fine',
      render: (value) => value > 0 ? `NPR ${value}` : '-',
      sortable: true
    }
  ];

  const filterOptions = {
    status: [
      { value: 'Issued', label: 'Issued' },
      { value: 'Returned', label: 'Returned' },
      { value: 'Overdue', label: 'Overdue' }
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
    console.log('View book issue:', book.id);
  };

  const handleReturn = (book) => {
    console.log('Return book:', book.id);
  };

  const handleRenew = (book) => {
    console.log('Renew book:', book.id);
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="issue-book animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Book Issue Management</h1>
        <button 
          className="btn btn-primary btn-custom"
          onClick={() => setShowIssueModal(true)}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Issue New Book
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
                  placeholder="Search issued books..."
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

      {/* Issue Summary */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">560</h3>
              <p className="mb-0">Total Issued</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">45</h3>
              <p className="mb-0">Overdue</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">320</h3>
              <p className="mb-0">Returned</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-danger text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">NPR 2,250</h3>
              <p className="mb-0">Total Fine</p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={issuedBooks}
        loading={loading}
        onSort={handleSort}
        sortField={sortField}
        sortOrder={sortOrder}
        onView={handleView}
        onEdit={handleReturn}
        onDelete={handleRenew}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={totalCount}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />

      {/* Issue Book Modal */}
      {showIssueModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Issue New Book</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowIssueModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Student ID</label>
                      <input type="text" className="form-control" placeholder="Enter student ID" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Book ISBN/ID</label>
                      <input type="text" className="form-control" placeholder="Enter book ISBN or ID" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Issue Date</label>
                      <input type="date" className="form-control" defaultValue={new Date().toISOString().split('T')[0]} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Due Date</label>
                      <input type="date" className="form-control" />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Notes</label>
                      <textarea className="form-control" rows="3" placeholder="Additional notes..."></textarea>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowIssueModal(false)}
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-primary">
                  Issue Book
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueBook;