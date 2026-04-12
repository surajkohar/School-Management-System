import React, { useState } from 'react';

const ReportList = () => {
  const [selectedReport, setSelectedReport] = useState('');
  const [filters, setFilters] = useState({
    class: '',
    section: '',
    dateFrom: '',
    dateTo: '',
    month: '',
    year: new Date().getFullYear()
  });

  const reportTypes = [
    {
      id: 'student-report',
      name: 'Student Report',
      description: 'Comprehensive student information report',
      icon: 'bi-people-fill',
      color: 'primary'
    },
    {
      id: 'attendance-report',
      name: 'Attendance Report',
      description: 'Student and employee attendance summary',
      icon: 'bi-calendar-check-fill',
      color: 'success'
    },
    {
      id: 'fee-report',
      name: 'Fee Collection Report',
      description: 'Fee payment and collection analysis',
      icon: 'bi-currency-dollar',
      color: 'warning'
    },
    {
      id: 'exam-report',
      name: 'Exam Results Report',
      description: 'Academic performance and exam results',
      icon: 'bi-clipboard-check-fill',
      color: 'info'
    },
    {
      id: 'employee-report',
      name: 'Employee Report',
      description: 'Staff information and payroll summary',
      icon: 'bi-person-badge-fill',
      color: 'secondary'
    },
    {
      id: 'financial-report',
      name: 'Financial Report',
      description: 'Income, expenses and financial overview',
      icon: 'bi-graph-up',
      color: 'danger'
    }
  ];

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleGenerateReport = (format) => {
    if (!selectedReport) {
      alert('Please select a report type first');
      return;
    }
    console.log(`Generating ${selectedReport} in ${format} format with filters:`, filters);
  };

  const handlePreviewReport = () => {
    if (!selectedReport) {
      alert('Please select a report type first');
      return;
    }
    console.log(`Previewing ${selectedReport} with filters:`, filters);
  };

  return (
    <div className="report-list animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Reports & Analytics</h1>
        <div className="d-flex gap-2">
          <button 
            className="btn btn-outline-primary"
            onClick={handlePreviewReport}
          >
            <i className="bi bi-eye me-2"></i>
            Preview Report
          </button>
          <div className="dropdown">
            <button 
              className="btn btn-success dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <i className="bi bi-download me-2"></i>
              Generate Report
            </button>
            <ul className="dropdown-menu">
              <li><button className="dropdown-item" onClick={() => handleGenerateReport('pdf')}>
                <i className="bi bi-file-pdf me-2"></i>PDF
              </button></li>
              <li><button className="dropdown-item" onClick={() => handleGenerateReport('excel')}>
                <i className="bi bi-file-excel me-2"></i>Excel
              </button></li>
              <li><button className="dropdown-item" onClick={() => handleGenerateReport('csv')}>
                <i className="bi bi-file-csv me-2"></i>CSV
              </button></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Report Types */}
        <div className="col-lg-8 mb-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="bi bi-file-text me-2"></i>
                Select Report Type
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                {reportTypes.map((report) => (
                  <div key={report.id} className="col-md-6">
                    <div 
                      className={`card h-100 cursor-pointer border-2 ${
                        selectedReport === report.id ? `border-${report.color}` : 'border-light'
                      }`}
                      onClick={() => setSelectedReport(report.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="card-body text-center">
                        <div className={`bg-${report.color} bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3`}
                             style={{ width: '60px', height: '60px' }}>
                          <i className={`${report.icon} text-${report.color} fs-3`}></i>
                        </div>
                        <h6 className="card-title">{report.name}</h6>
                        <p className="card-text text-muted small">{report.description}</p>
                        {selectedReport === report.id && (
                          <div className="mt-2">
                            <span className={`badge bg-${report.color}`}>
                              <i className="bi bi-check-circle me-1"></i>
                              Selected
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="bi bi-funnel me-2"></i>
                Report Filters
              </h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Class</label>
                <select 
                  className="form-select"
                  name="class"
                  value={filters.class}
                  onChange={handleFilterChange}
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

              <div className="mb-3">
                <label className="form-label">Section</label>
                <select 
                  className="form-select"
                  name="section"
                  value={filters.section}
                  onChange={handleFilterChange}
                >
                  <option value="">All Sections</option>
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                  <option value="D">Section D</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Month</label>
                <select 
                  className="form-select"
                  name="month"
                  value={filters.month}
                  onChange={handleFilterChange}
                >
                  <option value="">All Months</option>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Year</label>
                <select 
                  className="form-select"
                  name="year"
                  value={filters.year}
                  onChange={handleFilterChange}
                >
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">From Date</label>
                <input 
                  type="date"
                  className="form-control"
                  name="dateFrom"
                  value={filters.dateFrom}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">To Date</label>
                <input 
                  type="date"
                  className="form-control"
                  name="dateTo"
                  value={filters.dateTo}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="d-grid">
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => setFilters({
                    class: '',
                    section: '',
                    dateFrom: '',
                    dateTo: '',
                    month: '',
                    year: new Date().getFullYear()
                  })}
                >
                  <i className="bi bi-arrow-clockwise me-2"></i>
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card mt-4">
            <div className="card-header">
              <h6 className="card-title mb-0">Quick Statistics</h6>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-6 text-center">
                  <div className="bg-primary bg-opacity-10 rounded p-3">
                    <i className="bi bi-people text-primary fs-4"></i>
                    <div className="mt-2">
                      <div className="fw-bold">1,250</div>
                      <small className="text-muted">Total Students</small>
                    </div>
                  </div>
                </div>
                <div className="col-6 text-center">
                  <div className="bg-success bg-opacity-10 rounded p-3">
                    <i className="bi bi-person-badge text-success fs-4"></i>
                    <div className="mt-2">
                      <div className="fw-bold">85</div>
                      <small className="text-muted">Total Staff</small>
                    </div>
                  </div>
                </div>
                <div className="col-6 text-center">
                  <div className="bg-warning bg-opacity-10 rounded p-3">
                    <i className="bi bi-currency-dollar text-warning fs-4"></i>
                    <div className="mt-2">
                      <div className="fw-bold">NPR 2.5M</div>
                      <small className="text-muted">Monthly Revenue</small>
                    </div>
                  </div>
                </div>
                <div className="col-6 text-center">
                  <div className="bg-info bg-opacity-10 rounded p-3">
                    <i className="bi bi-calendar-check text-info fs-4"></i>
                    <div className="mt-2">
                      <div className="fw-bold">94%</div>
                      <small className="text-muted">Avg Attendance</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportList;