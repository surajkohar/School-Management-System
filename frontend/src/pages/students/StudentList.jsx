import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DataTable from '../../components/DataTable.jsx';
import Pagination from '../../components/Pagination.jsx';
import { setStudents, setCurrentPage, setSearchQuery, setSorting, setFilters } from '../../store/slices/studentSlice.js';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const StudentList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { 
    students, 
    loading, 
    totalCount, 
    currentPage, 
    pageSize, 
    searchQuery, 
    sortField, 
    sortOrder,
    filters 
  } = useSelector((state) => state.students);

  const [showFilters, setShowFilters] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    class: '',
    section: '',
    status: '',
    dateFrom: '',
    dateTo: ''
  });

  // Extended mock data with 50+ students for pagination testing
  const mockStudents = [
    {
      id: 1,
      rollNumber: 'ST001',
      name: 'John Doe',
      class: '10',
      section: 'A',
      phone: '+977-9841234567',
      email: 'john.doe@email.com',
      status: 'Active',
      admissionDate: '2024-01-15',
      photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      feeStatus: 'Paid'
    },
    {
      id: 2,
      rollNumber: 'ST002',
      name: 'Jane Smith',
      class: '9',
      section: 'B',
      phone: '+977-9851234567',
      email: 'jane.smith@email.com',
      status: 'Active',
      admissionDate: '2024-01-10',
      photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      feeStatus: 'Pending'
    },
    {
      id: 3,
      rollNumber: 'ST003',
      name: 'Mike Johnson',
      class: '11',
      section: 'A',
      phone: '+977-9861234567',
      email: 'mike.johnson@email.com',
      status: 'Active',
      admissionDate: '2024-02-01',
      photo: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      feeStatus: 'Paid'
    },
    {
      id: 4,
      rollNumber: 'ST004',
      name: 'Sarah Wilson',
      class: '8',
      section: 'C',
      phone: '+977-9871234567',
      email: 'sarah.wilson@email.com',
      status: 'Inactive',
      admissionDate: '2023-12-15',
      photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      feeStatus: 'Overdue'
    },
    {
      id: 5,
      rollNumber: 'ST005',
      name: 'David Brown',
      class: '12',
      section: 'A',
      phone: '+977-9881234567',
      email: 'david.brown@email.com',
      status: 'Active',
      admissionDate: '2024-01-20',
      photo: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      feeStatus: 'Paid'
    },
    // Adding more students for pagination testing
    ...Array.from({ length: 45 }, (_, i) => ({
      id: i + 6,
      rollNumber: `ST${String(i + 6).padStart(3, '0')}`,
      name: `Student ${i + 6}`,
      class: String(Math.floor(Math.random() * 12) + 1),
      section: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)],
      phone: `+977-98${String(Math.floor(Math.random() * 90000000) + 10000000)}`,
      email: `student${i + 6}@email.com`,
      status: Math.random() > 0.1 ? 'Active' : 'Inactive',
      admissionDate: `2024-0${Math.floor(Math.random() * 3) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      photo: `https://images.pexels.com/photos/${220453 + (i % 10)}/pexels-photo-${220453 + (i % 10)}.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1`,
      feeStatus: ['Paid', 'Pending', 'Overdue'][Math.floor(Math.random() * 3)]
    }))
  ];

  useEffect(() => {
    // Simulate API call with pagination
    setTimeout(() => {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedStudents = mockStudents.slice(startIndex, endIndex);
      
      dispatch(setStudents({ students: paginatedStudents, totalCount: mockStudents.length }));
    }, 500);
  }, [dispatch, currentPage, pageSize]);

  const columns = [
    {
      key: 'photo',
      title: 'Photo',
      render: (value) => (
        <img 
          src={value} 
          alt="Student" 
          className="rounded-circle"
          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
        />
      )
    },
    {
      key: 'rollNumber',
      title: 'Roll No.',
      sortable: true
    },
    {
      key: 'name',
      title: 'Name',
      sortable: true
    },
    {
      key: 'class',
      title: 'Class',
      sortable: true
    },
    {
      key: 'section',
      title: 'Section',
      sortable: true
    },
    {
      key: 'phone',
      title: 'Phone',
    },
    {
      key: 'status',
      title: 'Status',
      render: (value) => (
        <span className={`badge bg-${value === 'Active' ? 'success' : 'secondary'}`}>
          {value}
        </span>
      )
    },
    {
      key: 'feeStatus',
      title: 'Fee Status',
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
    dispatch(setSearchQuery(e.target.value));
  };

  const handleSort = (field, order) => {
    dispatch(setSorting({ field, order }));
  };

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleView = (student) => {
    navigate(`/students/view/${student.id}`);
  };

  const handleEdit = (student) => {
    navigate(`/students/edit/${student.id}`);
  };

  const handleDelete = (student) => {
    console.log('Delete student:', student.id);
    // Remove from local state for demo
    const updatedStudents = students.filter(s => s.id !== student.id);
    dispatch(setStudents({ students: updatedStudents, totalCount: totalCount - 1 }));
  };

  const handleSelectItem = (id, checked) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== id));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(students.map(student => student.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk ${action} for items:`, selectedItems);
    
    if (action === 'delete') {
      if (window.confirm(`Are you sure you want to delete ${selectedItems.length} selected students?`)) {
        const updatedStudents = students.filter(s => !selectedItems.includes(s.id));
        dispatch(setStudents({ students: updatedStudents, totalCount: totalCount - selectedItems.length }));
        setSelectedItems([]);
      }
    } else if (action === 'activate') {
      // Update status to active for selected items
      const updatedStudents = students.map(s => 
        selectedItems.includes(s.id) ? { ...s, status: 'Active' } : s
      );
      dispatch(setStudents({ students: updatedStudents, totalCount }));
      setSelectedItems([]);
    } else if (action === 'deactivate') {
      // Update status to inactive for selected items
      const updatedStudents = students.map(s => 
        selectedItems.includes(s.id) ? { ...s, status: 'Inactive' } : s
      );
      dispatch(setStudents({ students: updatedStudents, totalCount }));
      setSelectedItems([]);
    }
    
    setShowBulkActions(false);
  };

  const handleApplyFilters = () => {
    dispatch(setFilters(localFilters));
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    setLocalFilters({
      class: '',
      section: '',
      status: '',
      dateFrom: '',
      dateTo: ''
    });
    dispatch(setFilters({}));
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text('Student List Report', 14, 22);
    
    // Add date
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 32);
    
    // Prepare table data
    const tableData = students.map(student => [
      student.rollNumber,
      student.name,
      `${student.class}-${student.section}`,
      student.phone,
      student.email,
      student.status,
      student.feeStatus
    ]);
    
    // Add table
    doc.autoTable({
      head: [['Roll No.', 'Name', 'Class', 'Phone', 'Email', 'Status', 'Fee Status']],
      body: tableData,
      startY: 40,
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [0, 123, 255],
        textColor: 255,
      },
    });
    
    // Save the PDF
    doc.save('student-list.pdf');
  };

  const handleExport = (format) => {
    if (format === 'pdf') {
      handleExportPDF();
    } else {
      console.log(`Export to ${format}`);
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="student-list animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Students Management</h1>
        <button 
          className="btn btn-primary btn-custom"
          onClick={() => navigate('/students/add')}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Add New Student
        </button>
      </div>

      {/* Bulk Actions Bar */}
      {selectedItems.length > 0 && (
        <div className="card mb-4 border-primary">
          <div className="card-body py-2">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <span className="fw-semibold me-3">
                  {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
                </span>
                <div className="btn-group">
                  <button 
                    className="btn btn-success btn-sm"
                    onClick={() => handleBulkAction('activate')}
                  >
                    <i className="bi bi-check-circle me-1"></i>
                    Activate
                  </button>
                  <button 
                    className="btn btn-warning btn-sm"
                    onClick={() => handleBulkAction('deactivate')}
                  >
                    <i className="bi bi-pause-circle me-1"></i>
                    Deactivate
                  </button>
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => handleBulkAction('delete')}
                  >
                    <i className="bi bi-trash me-1"></i>
                    Delete
                  </button>
                </div>
              </div>
              <button 
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setSelectedItems([])}
              >
                <i className="bi bi-x"></i>
                Clear Selection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter Bar */}
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
                  placeholder="Search students..."
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
                    <li><button className="dropdown-item" onClick={() => handleExport('pdf')}>
                      <i className="bi bi-file-pdf me-2"></i>PDF
                    </button></li>
                    <li><button className="dropdown-item" onClick={() => handleExport('excel')}>
                      <i className="bi bi-file-excel me-2"></i>Excel
                    </button></li>
                    <li><button className="dropdown-item" onClick={() => handleExport('csv')}>
                      <i className="bi bi-file-csv me-2"></i>CSV
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

          {/* Advanced Filters */}
          {showFilters && (
            <div className="row g-3 mt-3 pt-3 border-top">
              <div className="col-md-2">
                <select 
                  className="form-select"
                  value={localFilters.class}
                  onChange={(e) => setLocalFilters({...localFilters, class: e.target.value})}
                >
                  <option value="">All Classes</option>
                  <option value="1">Class 1</option>
                  <option value="2">Class 2</option>
                  <option value="3">Class 3</option>
                  <option value="4">Class 4</option>
                  <option value="5">Class 5</option>
                  <option value="6">Class 6</option>
                  <option value="7">Class 7</option>
                  <option value="8">Class 8</option>
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                  <option value="11">Class 11</option>
                  <option value="12">Class 12</option>
                </select>
              </div>
              
              <div className="col-md-2">
                <select 
                  className="form-select"
                  value={localFilters.section}
                  onChange={(e) => setLocalFilters({...localFilters, section: e.target.value})}
                >
                  <option value="">All Sections</option>
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                  <option value="D">Section D</option>
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

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={students}
        loading={loading}
        onSort={handleSort}
        sortField={sortField}
        sortOrder={sortOrder}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        bulkActions={true}
        selectedItems={selectedItems}
        onSelectItem={handleSelectItem}
        onSelectAll={handleSelectAll}
      />

      {/* Pagination */}
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

export default StudentList;