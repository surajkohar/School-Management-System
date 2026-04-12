import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DataTable from '../../components/DataTable.jsx';
import Pagination from '../../components/Pagination.jsx';
import { setFees, setCurrentPage } from '../../store/slices/feeSlice.js';

const FeeList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { 
    fees, 
    loading, 
    totalCount, 
    currentPage, 
    pageSize 
  } = useSelector((state) => state.fees);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('studentName');
  const [sortOrder, setSortOrder] = useState('asc');

  // Mock data
  const mockFees = [
    {
      id: 1,
      studentName: 'John Doe',
      rollNumber: 'ST001',
      class: '10',
      section: 'A',
      feeType: 'Monthly Fee',
      amount: 2000,
      dueDate: '2024-04-05',
      paidDate: '2024-04-03',
      status: 'Paid'
    },
    {
      id: 2,
      studentName: 'Jane Smith',
      rollNumber: 'ST002',
      class: '9',
      section: 'B',
      feeType: 'Monthly Fee',
      amount: 2000,
      dueDate: '2024-04-05',
      paidDate: null,
      status: 'Pending'
    },
    {
      id: 3,
      studentName: 'Mike Johnson',
      rollNumber: 'ST003',
      class: '11',
      section: 'A',
      feeType: 'Admission Fee',
      amount: 5000,
      dueDate: '2024-01-15',
      paidDate: '2024-01-10',
      status: 'Paid'
    },
    {
      id: 4,
      studentName: 'Sarah Wilson',
      rollNumber: 'ST004',
      class: '8',
      section: 'C',
      feeType: 'Monthly Fee',
      amount: 2000,
      dueDate: '2024-03-05',
      paidDate: null,
      status: 'Overdue'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      dispatch(setFees({ fees: mockFees, totalCount: mockFees.length }));
    }, 500);
  }, [dispatch]);

  const columns = [
    {
      key: 'studentName',
      title: 'Student Name',
      sortable: true
    },
    {
      key: 'rollNumber',
      title: 'Roll Number',
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
      key: 'dueDate',
      title: 'Due Date',
      render: (value) => new Date(value).toLocaleDateString()
    },
    {
      key: 'paidDate',
      title: 'Paid Date',
      render: (value) => value ? new Date(value).toLocaleDateString() : '-'
    },
    {
      key: 'status',
      title: 'Status',
      render: (value) => (
        <span className={`badge bg-${
          value === 'Paid' ? 'success' : 
          value === 'Pending' ? 'warning' : 'danger'
        }`}>
          {value}
        </span>
      )
    }
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (field, order) => {
    setSortField(field);
    setSortOrder(order);
  };

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleView = (fee) => {
    console.log('View fee:', fee.id);
  };

  const handleEdit = (fee) => {
    console.log('Edit fee:', fee.id);
  };

  const handleDelete = (fee) => {
    if (window.confirm(`Are you sure you want to delete this fee record?`)) {
      console.log('Delete fee:', fee.id);
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="fee-list animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Fee Management</h1>
        <div className="d-flex gap-2">
          <button className="btn btn-success btn-custom">
            <i className="bi bi-cash-coin me-2"></i>
            Collect Fee
          </button>
          <button className="btn btn-primary btn-custom">
            <i className="bi bi-plus-circle me-2"></i>
            Add Fee Structure
          </button>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search fees..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="d-flex gap-2 justify-content-end">
                <button className="btn btn-outline-secondary">
                  <i className="bi bi-funnel me-1"></i>
                  Filters
                </button>
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

      <DataTable
        columns={columns}
        data={fees}
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

export default FeeList;