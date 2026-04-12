import React, { useState, useEffect } from 'react';
import DataTable from '../../components/DataTable.jsx';
import Pagination from '../../components/Pagination.jsx';
import FilterDropdown from '../../components/FilterDropdown.jsx';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({});
  const pageSize = 10;

  // Mock data
  const mockBooks = [
    {
      id: 1,
      isbn: '978-0-123456-78-9',
      title: 'Introduction to Computer Science',
      author: 'John Smith',
      category: 'Computer Science',
      publisher: 'Tech Publications',
      publishYear: 2023,
      totalCopies: 10,
      availableCopies: 7,
      issuedCopies: 3,
      price: 1500,
      location: 'A-101',
      status: 'Available'
    },
    {
      id: 2,
      isbn: '978-0-987654-32-1',
      title: 'Advanced Mathematics',
      author: 'Dr. Sarah Johnson',
      category: 'Mathematics',
      publisher: 'Academic Press',
      publishYear: 2022,
      totalCopies: 15,
      availableCopies: 12,
      issuedCopies: 3,
      price: 1200,
      location: 'B-205',
      status: 'Available'
    },
    {
      id: 3,
      isbn: '978-0-456789-01-2',
      title: 'English Literature',
      author: 'Emily Davis',
      category: 'Literature',
      publisher: 'Literary House',
      publishYear: 2021,
      totalCopies: 8,
      availableCopies: 0,
      issuedCopies: 8,
      price: 800,
      location: 'C-301',
      status: 'Out of Stock'
    },
    {
      id: 4,
      isbn: '978-0-789012-34-5',
      title: 'Physics Fundamentals',
      author: 'Dr. Michael Brown',
      category: 'Physics',
      publisher: 'Science Books',
      publishYear: 2023,
      totalCopies: 12,
      availableCopies: 9,
      issuedCopies: 3,
      price: 1800,
      location: 'D-102',
      status: 'Available'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setBooks(mockBooks);
      setTotalCount(mockBooks.length);
      setLoading(false);
    }, 500);
  }, []);

  const columns = [
    {
      key: 'isbn',
      title: 'ISBN',
      sortable: true
    },
    {
      key: 'title',
      title: 'Book Title',
      sortable: true
    },
    {
      key: 'author',
      title: 'Author',
      sortable: true
    },
    {
      key: 'category',
      title: 'Category',
      render: (value) => (
        <span className={`badge bg-${
          value === 'Computer Science' ? 'primary' : 
          value === 'Mathematics' ? 'success' : 
          value === 'Literature' ? 'info' : 
          value === 'Physics' ? 'warning' : 'secondary'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'publisher',
      title: 'Publisher'
    },
    {
      key: 'publishYear',
      title: 'Year',
      sortable: true
    },
    {
      key: 'totalCopies',
      title: 'Total Copies',
      sortable: true
    },
    {
      key: 'availableCopies',
      title: 'Available',
      render: (value, row) => (
        <div className="d-flex align-items-center">
          <span className={`badge bg-${value > 0 ? 'success' : 'danger'} me-2`}>
            {value}
          </span>
          <div className="progress" style={{ width: '60px', height: '8px' }}>
            <div 
              className={`progress-bar bg-${value > 0 ? 'success' : 'danger'}`}
              style={{ width: `${(value / row.totalCopies) * 100}%` }}
            ></div>
          </div>
        </div>
      )
    },
    {
      key: 'price',
      title: 'Price',
      render: (value) => `NPR ${value.toLocaleString()}`,
      sortable: true
    },
    {
      key: 'status',
      title: 'Status',
      render: (value) => (
        <span className={`badge bg-${value === 'Available' ? 'success' : 'danger'}`}>
          {value}
        </span>
      )
    }
  ];

  const filterOptions = {
    status: [
      { value: 'Available', label: 'Available' },
      { value: 'Out of Stock', label: 'Out of Stock' }
    ],
    custom: [
      {
        key: 'category',
        label: 'Category',
        type: 'select',
        options: [
          { value: 'Computer Science', label: 'Computer Science' },
          { value: 'Mathematics', label: 'Mathematics' },
          { value: 'Literature', label: 'Literature' },
          { value: 'Physics', label: 'Physics' },
          { value: 'Chemistry', label: 'Chemistry' },
          { value: 'Biology', label: 'Biology' }
        ]
      },
      {
        key: 'publishYear',
        label: 'Publish Year',
        type: 'select',
        options: [
          { value: '2023', label: '2023' },
          { value: '2022', label: '2022' },
          { value: '2021', label: '2021' },
          { value: '2020', label: '2020' }
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

  const handleView = (book) => {
    console.log('View book:', book.id);
  };

  const handleEdit = (book) => {
    console.log('Edit book:', book.id);
  };

  const handleDelete = (book) => {
    if (window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
      console.log('Delete book:', book.id);
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="book-list animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Library Book Management</h1>
        <button className="btn btn-primary btn-custom">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Book
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
                  placeholder="Search books..."
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

      {/* Library Summary */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">2,450</h3>
              <p className="mb-0">Total Books</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">1,890</h3>
              <p className="mb-0">Available</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">560</h3>
              <p className="mb-0">Issued</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-danger text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">45</h3>
              <p className="mb-0">Overdue</p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={books}
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

export default BookList;