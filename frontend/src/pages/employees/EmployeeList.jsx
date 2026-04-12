import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DataTable from '../../components/DataTable.jsx';
import Pagination from '../../components/Pagination.jsx';
import { setEmployees, setCurrentPage, setSearchQuery, setSorting, setFilters } from '../../store/slices/employeeSlice.js';

const EmployeeList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { 
    employees, 
    loading, 
    totalCount, 
    currentPage, 
    pageSize, 
    searchQuery, 
    sortField, 
    sortOrder,
    filters 
  } = useSelector((state) => state.employees);

  const [showFilters, setShowFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    department: '',
    position: '',
    status: '',
    dateFrom: '',
    dateTo: ''
  });

  // Mock data
  const mockEmployees = [
    {
      id: 1,
      employeeId: 'EMP001',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@school.com',
      phone: '+977-9841234567',
      department: 'Academic',
      position: 'Principal',
      salary: 75000,
      joinDate: '2020-01-15',
      status: 'Active',
      photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    },
    {
      id: 2,
      employeeId: 'EMP002',
      name: 'Mr. John Smith',
      email: 'john.smith@school.com',
      phone: '+977-9851234567',
      department: 'Academic',
      position: 'Math Teacher',
      salary: 45000,
      joinDate: '2021-03-10',
      status: 'Active',
      photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    },
    {
      id: 3,
      employeeId: 'EMP003',
      name: 'Ms. Emily Davis',
      email: 'emily.davis@school.com',
      phone: '+977-9861234567',
      department: 'Academic',
      position: 'English Teacher',
      salary: 42000,
      joinDate: '2021-06-01',
      status: 'Active',
      photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    },
    {
      id: 4,
      employeeId: 'EMP004',
      name: 'Mr. Michael Brown',
      email: 'michael.brown@school.com',
      phone: '+977-9871234567',
      department: 'Administration',
      position: 'Accountant',
      salary: 35000,
      joinDate: '2022-01-20',
      status: 'Active',
      photo: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    },
    {
      id: 5,
      employeeId: 'EMP005',
      name: 'Ms. Lisa Wilson',
      email: 'lisa.wilson@school.com',
      phone: '+977-9881234567',
      department: 'Support',
      position: 'Librarian',
      salary: 30000,
      joinDate: '2022-08-15',
      status: 'Inactive',
      photo: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      dispatch(setEmployees({ employees: mockEmployees, totalCount: mockEmployees.length }));
    }, 500);
  }, [dispatch]);

  const columns = [
    {
      key: 'photo',
      title: 'Photo',
      render: (value) => (
        <img 
          src={value} 
          alt="Employee" 
          className="rounded-circle"
          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
        />
      )
    },
    {
      key: 'employeeId',
      title: 'Employee ID',
      sortable: true
    },
    {
      key: 'name',
      title: 'Name',
      sortable: true
    },
    {
      key: 'department',
      title: 'Department',
      sortable: true
    },
    {
      key: 'position',
      title: 'Position',
      sortable: true
    },
    {
      key: 'phone',
      title: 'Phone',
    },
    {
      key: 'salary',
      title: 'Salary',
      render: (value) => `NPR ${value.toLocaleString()}`
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

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleSort = (field, order) => {
    dispatch(setSorting({ field, order }));
  };

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleView = (employee) => {
    navigate(`/employees/view/${employee.id}`);
  };

  const handleEdit = (employee) => {
    navigate(`/employees/edit/${employee.id}`);
  };

  const handleDelete = (employee) => {
    if (window.confirm(`Are you sure you want to delete ${employee.name}?`)) {
      console.log('Delete employee:', employee.id);
    }
  };

  const handleApplyFilters = () => {
    dispatch(setFilters(localFilters));
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    setLocalFilters({
      department: '',
      position: '',
      status: '',
      dateFrom: '',
      dateTo: ''
    });
    dispatch(setFilters({}));
  };

  const handleExport = (format) => {
    console.log(`Export to ${format}`);
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="employee-list animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Employee Management</h1>
        <button 
          className="btn btn-primary btn-custom"
          onClick={() => navigate('/employees/add')}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Add New Employee
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
                  placeholder="Search employees..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            </div>
            
            <div className="col-md-8">
              <div className="d-flex gap-2 justify-content-end">
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <i className="bi bi-funnel me-1"></i>
                  Filters
                </button>
                
                <div className="dropdown">
                  <button 
                    className="btn btn-outline-success dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-download me-1"></i>
                    Export
                  </button>
                  <ul className="dropdown-menu">
                    <li><button className="dropdown-item" onClick={() => handleExport('excel')}>
                      <i className="bi bi-file-excel me-2"></i>Excel
                    </button></li>
                    <li><button className="dropdown-item" onClick={() => handleExport('csv')}>
                      <i className="bi bi-file-csv me-2"></i>CSV
                    </button></li>
                    <li><button className="dropdown-item" onClick={() => handleExport('pdf')}>
                      <i className="bi bi-file-pdf me-2"></i>PDF
                    </button></li>
                  </ul>
                </div>
                
                <button 
                  className="btn btn-outline-info"
                  onClick={() => window.print()}
                >
                  <i className="bi bi-printer me-1"></i>
                  Print
                </button>
              </div>
            </div>
          </div>

          {showFilters && (
            <div className="row g-3 mt-3 pt-3 border-top">
              <div className="col-md-2">
                <select 
                  className="form-select"
                  value={localFilters.department}
                  onChange={(e) => setLocalFilters({...localFilters, department: e.target.value})}
                >
                  <option value="">All Departments</option>
                  <option value="Academic">Academic</option>
                  <option value="Administration">Administration</option>
                  <option value="Support">Support</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
              
              <div className="col-md-2">
                <select 
                  className="form-select"
                  value={localFilters.position}
                  onChange={(e) => setLocalFilters({...localFilters, position: e.target.value})}
                >
                  <option value="">All Positions</option>
                  <option value="Principal">Principal</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Accountant">Accountant</option>
                  <option value="Librarian">Librarian</option>
                </select>
              </div>
              
              <div className="col-md-2">
                <select 
                  className="form-select"
                  value={localFilters.status}
                  onChange={(e) => setLocalFilters({...localFilters, status: e.target.value})}
                >
                  <option value="">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              
              <div className="col-md-2">
                <input 
                  type="date"
                  className="form-control"
                  placeholder="From Date"
                  value={localFilters.dateFrom}
                  onChange={(e) => setLocalFilters({...localFilters, dateFrom: e.target.value})}
                />
              </div>
              
              <div className="col-md-2">
                <input 
                  type="date"
                  className="form-control"
                  placeholder="To Date"
                  value={localFilters.dateTo}
                  onChange={(e) => setLocalFilters({...localFilters, dateTo: e.target.value})}
                />
              </div>
              
              <div className="col-md-2">
                <div className="d-flex gap-2">
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={handleApplyFilters}
                  >
                    Apply
                  </button>
                  <button 
                    className="btn btn-outline-secondary btn-sm"
                    onClick={handleClearFilters}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <DataTable
        columns={columns}
        data={employees}
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

export default EmployeeList;