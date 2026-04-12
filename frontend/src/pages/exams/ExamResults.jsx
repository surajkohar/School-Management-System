import React, { useState, useEffect } from 'react';
import DataTable from '../../components/DataTable.jsx';
import Pagination from '../../components/Pagination.jsx';
import FilterDropdown from '../../components/FilterDropdown.jsx';

const ExamResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('studentName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({});
  const pageSize = 10;

  // Mock data
  const mockResults = [
    {
      id: 1,
      studentId: 'ST001',
      studentName: 'John Doe',
      rollNumber: 'ST001',
      class: '10',
      section: 'A',
      examName: 'First Terminal Exam',
      subjects: {
        'English': { marks: 85, grade: 'A', status: 'Pass' },
        'Nepali': { marks: 78, grade: 'B+', status: 'Pass' },
        'Mathematics': { marks: 92, grade: 'A+', status: 'Pass' },
        'Science': { marks: 88, grade: 'A', status: 'Pass' },
        'Social Studies': { marks: 82, grade: 'A-', status: 'Pass' }
      },
      totalMarks: 425,
      percentage: 85,
      grade: 'A',
      rank: 2,
      status: 'Pass'
    },
    {
      id: 2,
      studentId: 'ST002',
      studentName: 'Jane Smith',
      rollNumber: 'ST002',
      class: '10',
      section: 'A',
      examName: 'First Terminal Exam',
      subjects: {
        'English': { marks: 95, grade: 'A+', status: 'Pass' },
        'Nepali': { marks: 88, grade: 'A', status: 'Pass' },
        'Mathematics': { marks: 98, grade: 'A+', status: 'Pass' },
        'Science': { marks: 94, grade: 'A+', status: 'Pass' },
        'Social Studies': { marks: 90, grade: 'A+', status: 'Pass' }
      },
      totalMarks: 465,
      percentage: 93,
      grade: 'A+',
      rank: 1,
      status: 'Pass'
    },
    {
      id: 3,
      studentId: 'ST003',
      studentName: 'Mike Johnson',
      rollNumber: 'ST003',
      class: '10',
      section: 'A',
      examName: 'First Terminal Exam',
      subjects: {
        'English': { marks: 72, grade: 'B', status: 'Pass' },
        'Nepali': { marks: 68, grade: 'B', status: 'Pass' },
        'Mathematics': { marks: 75, grade: 'B+', status: 'Pass' },
        'Science': { marks: 70, grade: 'B', status: 'Pass' },
        'Social Studies': { marks: 65, grade: 'B-', status: 'Pass' }
      },
      totalMarks: 350,
      percentage: 70,
      grade: 'B',
      rank: 5,
      status: 'Pass'
    },
    {
      id: 4,
      studentId: 'ST004',
      studentName: 'Sarah Wilson',
      rollNumber: 'ST004',
      class: '10',
      section: 'A',
      examName: 'First Terminal Exam',
      subjects: {
        'English': { marks: 45, grade: 'C', status: 'Pass' },
        'Nepali': { marks: 38, grade: 'D', status: 'Fail' },
        'Mathematics': { marks: 42, grade: 'C', status: 'Pass' },
        'Science': { marks: 35, grade: 'D', status: 'Fail' },
        'Social Studies': { marks: 40, grade: 'C', status: 'Pass' }
      },
      totalMarks: 200,
      percentage: 40,
      grade: 'D',
      rank: 8,
      status: 'Fail'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setResults(mockResults);
      setTotalCount(mockResults.length);
      setLoading(false);
    }, 500);
  }, []);

  const columns = [
    {
      key: 'rollNumber',
      title: 'Roll No.',
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
      key: 'totalMarks',
      title: 'Total Marks',
      render: (value) => `${value}/500`,
      sortable: true
    },
    {
      key: 'percentage',
      title: 'Percentage',
      render: (value) => `${value}%`,
      sortable: true
    },
    {
      key: 'grade',
      title: 'Grade',
      render: (value) => (
        <span className={`badge bg-${
          value.includes('A') ? 'success' : 
          value.includes('B') ? 'primary' : 
          value.includes('C') ? 'warning' : 'danger'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'rank',
      title: 'Rank',
      render: (value) => (
        <span className={`badge bg-${
          value <= 3 ? 'warning' : 'info'
        }`}>
          #{value}
        </span>
      ),
      sortable: true
    },
    {
      key: 'status',
      title: 'Result',
      render: (value) => (
        <span className={`badge bg-${value === 'Pass' ? 'success' : 'danger'}`}>
          {value}
        </span>
      )
    }
  ];

  const filterOptions = {
    status: [
      { value: 'Pass', label: 'Pass' },
      { value: 'Fail', label: 'Fail' }
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
    section: [
      { value: 'A', label: 'Section A' },
      { value: 'B', label: 'Section B' },
      { value: 'C', label: 'Section C' },
      { value: 'D', label: 'Section D' }
    ],
    custom: [
      {
        key: 'examName',
        label: 'Exam',
        type: 'select',
        options: [
          { value: 'First Terminal Exam', label: 'First Terminal Exam' },
          { value: 'Second Terminal Exam', label: 'Second Terminal Exam' },
          { value: 'Annual Exam', label: 'Annual Exam' },
          { value: 'Unit Test 1', label: 'Unit Test 1' }
        ]
      },
      {
        key: 'grade',
        label: 'Grade',
        type: 'select',
        options: [
          { value: 'A+', label: 'A+' },
          { value: 'A', label: 'A' },
          { value: 'A-', label: 'A-' },
          { value: 'B+', label: 'B+' },
          { value: 'B', label: 'B' },
          { value: 'B-', label: 'B-' },
          { value: 'C+', label: 'C+' },
          { value: 'C', label: 'C' },
          { value: 'D', label: 'D' },
          { value: 'F', label: 'F' }
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

  const handleView = (result) => {
    console.log('View detailed result:', result.id);
  };

  const handlePrintResult = (result) => {
    console.log('Print result card:', result.id);
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="exam-results animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Exam Results</h1>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-success">
            <i className="bi bi-upload me-2"></i>
            Import Results
          </button>
          <button className="btn btn-primary">
            <i className="bi bi-plus-circle me-2"></i>
            Add Results
          </button>
        </div>
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
                  placeholder="Search results..."
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

      {/* Results Summary */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">45</h3>
              <p className="mb-0">Total Students</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">38</h3>
              <p className="mb-0">Passed</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-danger text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">7</h3>
              <p className="mb-0">Failed</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body text-center">
              <h3 className="fw-bold">84%</h3>
              <p className="mb-0">Pass Rate</p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={results}
        loading={loading}
        onSort={handleSort}
        sortField={sortField}
        sortOrder={sortOrder}
        onView={handleView}
        onEdit={handlePrintResult}
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

export default ExamResults;