import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bulkImportHistoricalData } from '../../store/slices/historicalDataSlice.js';

const StudentHistoricalData = () => {
  const dispatch = useDispatch();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('2024-25');
  const [importType, setImportType] = useState('students');
  const [importData, setImportData] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);

  // Mock historical data for demonstration
  const mockStudentHistory = {
    1: {
      '2021-22': {
        class: '1',
        section: 'A',
        rollNumber: 'ST001',
        fees: {
          monthlyFee: 1500,
          admissionFee: 5000,
          payments: [
            { month: 'April', amount: 1500, status: 'Paid', date: '2021-04-05' },
            { month: 'May', amount: 1500, status: 'Paid', date: '2021-05-05' },
            { month: 'June', amount: 1500, status: 'Paid', date: '2021-06-05' }
          ]
        },
        results: [
          {
            examName: 'First Terminal',
            subjects: [
              { subject: 'English', marks: 85, fullMarks: 100, grade: 'A' },
              { subject: 'Nepali', marks: 78, fullMarks: 100, grade: 'B+' },
              { subject: 'Mathematics', marks: 92, fullMarks: 100, grade: 'A+' }
            ],
            totalMarks: 255,
            percentage: 85,
            grade: 'A',
            rank: 2
          }
        ],
        attendance: { present: 180, absent: 20, percentage: 90 }
      },
      '2022-23': {
        class: '2',
        section: 'A',
        rollNumber: 'ST001',
        fees: {
          monthlyFee: 1600,
          payments: [
            { month: 'April', amount: 1600, status: 'Paid', date: '2022-04-05' },
            { month: 'May', amount: 1600, status: 'Paid', date: '2022-05-05' }
          ]
        },
        results: [
          {
            examName: 'First Terminal',
            subjects: [
              { subject: 'English', marks: 88, fullMarks: 100, grade: 'A' },
              { subject: 'Nepali', marks: 82, fullMarks: 100, grade: 'A-' },
              { subject: 'Mathematics', marks: 95, fullMarks: 100, grade: 'A+' }
            ],
            totalMarks: 265,
            percentage: 88.3,
            grade: 'A',
            rank: 1
          }
        ],
        attendance: { present: 185, absent: 15, percentage: 92.5 }
      }
    }
  };

  const mockStudents = [
    { id: 1, name: 'John Doe', rollNumber: 'ST001', currentClass: '3', currentSection: 'A' },
    { id: 2, name: 'Jane Smith', rollNumber: 'ST002', currentClass: '3', currentSection: 'B' },
    { id: 3, name: 'Mike Johnson', rollNumber: 'ST003', currentClass: '4', currentSection: 'A' }
  ];

  const academicYears = ['2021-22', '2022-23', '2023-24', '2024-25'];

  const handleImportData = () => {
    try {
      const parsedData = JSON.parse(importData);
      dispatch(bulkImportHistoricalData({
        type: importType,
        data: parsedData
      }));
      alert('Historical data imported successfully!');
      setShowImportModal(false);
      setImportData('');
    } catch (error) {
      alert('Invalid JSON format. Please check your data.');
    }
  };

  const getStudentHistoryForYear = (studentId, academicYear) => {
    return mockStudentHistory[studentId]?.[academicYear] || null;
  };

  const renderFeeHistory = (feeData) => {
    if (!feeData) return <p className="text-muted">No fee data available</p>;

    return (
      <div>
        <div className="row mb-3">
          <div className="col-md-6">
            <strong>Monthly Fee:</strong> NPR {feeData.monthlyFee?.toLocaleString()}
          </div>
          {feeData.admissionFee && (
            <div className="col-md-6">
              <strong>Admission Fee:</strong> NPR {feeData.admissionFee.toLocaleString()}
            </div>
          )}
        </div>
        
        <h6>Payment History</h6>
        <div className="table-responsive">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Month</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {feeData.payments?.map((payment, index) => (
                <tr key={index}>
                  <td>{payment.month}</td>
                  <td>NPR {payment.amount.toLocaleString()}</td>
                  <td>
                    <span className={`badge bg-${payment.status === 'Paid' ? 'success' : 'warning'}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td>{payment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderResultHistory = (results) => {
    if (!results || results.length === 0) return <p className="text-muted">No exam results available</p>;

    return (
      <div>
        {results.map((result, index) => (
          <div key={index} className="mb-4">
            <h6>{result.examName}</h6>
            <div className="row mb-3">
              <div className="col-md-3">
                <strong>Total Marks:</strong> {result.totalMarks}
              </div>
              <div className="col-md-3">
                <strong>Percentage:</strong> {result.percentage}%
              </div>
              <div className="col-md-3">
                <strong>Grade:</strong> 
                <span className={`badge bg-${result.grade.includes('A') ? 'success' : 'primary'} ms-2`}>
                  {result.grade}
                </span>
              </div>
              <div className="col-md-3">
                <strong>Rank:</strong> #{result.rank}
              </div>
            </div>
            
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Marks</th>
                    <th>Full Marks</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {result.subjects.map((subject, subIndex) => (
                    <tr key={subIndex}>
                      <td>{subject.subject}</td>
                      <td>{subject.marks}</td>
                      <td>{subject.fullMarks}</td>
                      <td>
                        <span className={`badge bg-${subject.grade.includes('A') ? 'success' : 'primary'}`}>
                          {subject.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="student-historical-data animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Student Historical Data</h1>
        <div className="d-flex gap-2">
          <button 
            className="btn btn-success"
            onClick={() => setShowImportModal(true)}
          >
            <i className="bi bi-upload me-2"></i>
            Import Historical Data
          </button>
          <button className="btn btn-outline-info">
            <i className="bi bi-download me-2"></i>
            Export Template
          </button>
        </div>
      </div>

      <div className="row">
        {/* Student Selection */}
        <div className="col-lg-3 mb-4">
          <div className="card">
            <div className="card-header">
              <h6 className="card-title mb-0">Select Student</h6>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                {mockStudents.map((student) => (
                  <button
                    key={student.id}
                    className={`list-group-item list-group-item-action ${
                      selectedStudent?.id === student.id ? 'active' : ''
                    }`}
                    onClick={() => setSelectedStudent(student)}
                  >
                    <div className="fw-semibold">{student.name}</div>
                    <small className="text-muted">{student.rollNumber} - Class {student.currentClass}</small>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {selectedStudent && (
            <div className="card mt-4">
              <div className="card-header">
                <h6 className="card-title mb-0">Academic Years</h6>
              </div>
              <div className="card-body p-0">
                <div className="list-group list-group-flush">
                  {academicYears.map((year) => (
                    <button
                      key={year}
                      className={`list-group-item list-group-item-action ${
                        selectedAcademicYear === year ? 'active' : ''
                      }`}
                      onClick={() => setSelectedAcademicYear(year)}
                    >
                      {year}
                      {getStudentHistoryForYear(selectedStudent.id, year) && (
                        <i className="bi bi-check-circle text-success float-end"></i>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Historical Data Display */}
        <div className="col-lg-9">
          {!selectedStudent ? (
            <div className="card">
              <div className="card-body text-center py-5">
                <i className="bi bi-person-circle display-1 text-muted"></i>
                <h5 className="mt-3">Select a Student</h5>
                <p className="text-muted">Choose a student from the left panel to view their historical data</p>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  {selectedStudent.name} - Academic Year {selectedAcademicYear}
                </h5>
              </div>
              <div className="card-body">
                {(() => {
                  const historyData = getStudentHistoryForYear(selectedStudent.id, selectedAcademicYear);
                  
                  if (!historyData) {
                    return (
                      <div className="text-center py-5">
                        <i className="bi bi-clock-history display-1 text-muted"></i>
                        <h5 className="mt-3">No Historical Data</h5>
                        <p className="text-muted">No data available for {selectedAcademicYear}</p>
                        <button 
                          className="btn btn-primary"
                          onClick={() => setShowImportModal(true)}
                        >
                          <i className="bi bi-upload me-2"></i>
                          Import Data
                        </button>
                      </div>
                    );
                  }

                  return (
                    <div>
                      {/* Basic Info */}
                      <div className="row mb-4">
                        <div className="col-md-3">
                          <strong>Class:</strong> {historyData.class}
                        </div>
                        <div className="col-md-3">
                          <strong>Section:</strong> {historyData.section}
                        </div>
                        <div className="col-md-3">
                          <strong>Roll Number:</strong> {historyData.rollNumber}
                        </div>
                        <div className="col-md-3">
                          <strong>Attendance:</strong> {historyData.attendance?.percentage}%
                        </div>
                      </div>

                      {/* Tabs for different data types */}
                      <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item">
                          <button 
                            className="nav-link active" 
                            data-bs-toggle="tab" 
                            data-bs-target="#fees-tab"
                          >
                            <i className="bi bi-currency-dollar me-2"></i>
                            Fee History
                          </button>
                        </li>
                        <li className="nav-item">
                          <button 
                            className="nav-link" 
                            data-bs-toggle="tab" 
                            data-bs-target="#results-tab"
                          >
                            <i className="bi bi-clipboard-check me-2"></i>
                            Exam Results
                          </button>
                        </li>
                        <li className="nav-item">
                          <button 
                            className="nav-link" 
                            data-bs-toggle="tab" 
                            data-bs-target="#attendance-tab"
                          >
                            <i className="bi bi-calendar-check me-2"></i>
                            Attendance
                          </button>
                        </li>
                      </ul>

                      <div className="tab-content mt-3">
                        <div className="tab-pane fade show active" id="fees-tab">
                          {renderFeeHistory(historyData.fees)}
                        </div>
                        <div className="tab-pane fade" id="results-tab">
                          {renderResultHistory(historyData.results)}
                        </div>
                        <div className="tab-pane fade" id="attendance-tab">
                          <div className="row">
                            <div className="col-md-4">
                              <div className="text-center p-3 bg-success bg-opacity-10 rounded">
                                <div className="fw-bold text-success">{historyData.attendance?.present}</div>
                                <small>Present Days</small>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="text-center p-3 bg-danger bg-opacity-10 rounded">
                                <div className="fw-bold text-danger">{historyData.attendance?.absent}</div>
                                <small>Absent Days</small>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="text-center p-3 bg-primary bg-opacity-10 rounded">
                                <div className="fw-bold text-primary">{historyData.attendance?.percentage}%</div>
                                <small>Percentage</small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Import Historical Data</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowImportModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Data Type</label>
                  <select 
                    className="form-select"
                    value={importType}
                    onChange={(e) => setImportType(e.target.value)}
                  >
                    <option value="students">Student Records</option>
                    <option value="fees">Fee History</option>
                    <option value="results">Exam Results</option>
                  </select>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">JSON Data</label>
                  <textarea
                    className="form-control"
                    rows="10"
                    value={importData}
                    onChange={(e) => setImportData(e.target.value)}
                    placeholder="Paste your JSON data here..."
                  />
                </div>

                <div className="alert alert-info">
                  <i className="bi bi-info-circle me-2"></i>
                  <strong>Format:</strong> The data should be in JSON format. Use the export template to see the expected structure.
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowImportModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={handleImportData}
                >
                  Import Data
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentHistoricalData;