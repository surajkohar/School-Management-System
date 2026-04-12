import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { promoteStudents } from '../../store/slices/academicSlice.js';
import { addPromotionRecord, addStudentHistoricalData } from '../../store/slices/historicalDataSlice.js';
import { updateFeeStructureOnPromotion } from '../../store/slices/feeSlice.js';

const StudentPromotion = () => {
  const dispatch = useDispatch();
  const { currentAcademicYear, academicYears } = useSelector((state) => state.academic);
  
  const [selectedFromClass, setSelectedFromClass] = useState('');
  const [selectedToClass, setSelectedToClass] = useState('');
  const [selectedFromYear, setSelectedFromYear] = useState(currentAcademicYear);
  const [selectedToYear, setSelectedToYear] = useState('');
  const [studentsToPromote, setStudentsToPromote] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [promotionType, setPromotionType] = useState('promotion'); // promotion, transfer, repeat

  // Mock students data for demonstration
  const mockStudents = [
    { 
      id: 1, 
      rollNumber: 'ST001', 
      name: 'John Doe', 
      currentClass: '2', 
      section: 'A', 
      status: 'Active',
      feeStatus: 'Paid',
      academicPerformance: 'Excellent',
      attendancePercentage: 95
    },
    { 
      id: 2, 
      rollNumber: 'ST002', 
      name: 'Jane Smith', 
      currentClass: '2', 
      section: 'A', 
      status: 'Active',
      feeStatus: 'Pending',
      academicPerformance: 'Good',
      attendancePercentage: 88
    },
    { 
      id: 3, 
      rollNumber: 'ST003', 
      name: 'Mike Johnson', 
      currentClass: '2', 
      section: 'B', 
      status: 'Active',
      feeStatus: 'Paid',
      academicPerformance: 'Average',
      attendancePerformance: 82
    },
    { 
      id: 4, 
      rollNumber: 'ST004', 
      name: 'Sarah Wilson', 
      currentClass: '2', 
      section: 'B', 
      status: 'Active',
      feeStatus: 'Overdue',
      academicPerformance: 'Below Average',
      attendancePercentage: 75
    },
  ];

  const classes = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  // Fee structures for different classes (mock data)
  const feeStructures = {
    '1': { monthlyFee: 1500, examFee: 500, transportFee: 800, libraryFee: 200, totalAnnual: 18000 },
    '2': { monthlyFee: 1600, examFee: 600, transportFee: 800, libraryFee: 200, totalAnnual: 19200 },
    '3': { monthlyFee: 1700, examFee: 700, transportFee: 900, libraryFee: 250, totalAnnual: 20550 },
    '4': { monthlyFee: 1800, examFee: 800, transportFee: 900, libraryFee: 250, totalAnnual: 21900 },
    '5': { monthlyFee: 1900, examFee: 900, transportFee: 1000, libraryFee: 300, totalAnnual: 23400 },
    '6': { monthlyFee: 2000, examFee: 1000, transportFee: 1000, libraryFee: 300, totalAnnual: 24900 },
    '7': { monthlyFee: 2100, examFee: 1100, transportFee: 1100, libraryFee: 350, totalAnnual: 26550 },
    '8': { monthlyFee: 2200, examFee: 1200, transportFee: 1100, libraryFee: 350, totalAnnual: 28050 },
    '9': { monthlyFee: 2300, examFee: 1300, transportFee: 1200, libraryFee: 400, totalAnnual: 29700 },
    '10': { monthlyFee: 2500, examFee: 1500, transportFee: 1200, libraryFee: 400, totalAnnual: 32100 },
    '11': { monthlyFee: 2800, examFee: 1800, transportFee: 1300, libraryFee: 500, totalAnnual: 36600 },
    '12': { monthlyFee: 3000, examFee: 2000, transportFee: 1300, libraryFee: 500, totalAnnual: 39300 }
  };

  useEffect(() => {
    if (selectedFromClass) {
      // Filter students based on selected class
      const filteredStudents = mockStudents.filter(student => student.currentClass === selectedFromClass);
      setStudentsToPromote(filteredStudents);
    }
  }, [selectedFromClass]);

  useEffect(() => {
    // Auto-set next academic year when promotion type is selected
    if (promotionType === 'promotion') {
      const currentYearIndex = academicYears.indexOf(selectedFromYear);
      if (currentYearIndex !== -1 && currentYearIndex < academicYears.length - 1) {
        setSelectedToYear(academicYears[currentYearIndex + 1]);
      }
      // Auto-set next class for promotion
      if (selectedFromClass && parseInt(selectedFromClass) < 12) {
        setSelectedToClass((parseInt(selectedFromClass) + 1).toString());
      }
    } else if (promotionType === 'repeat') {
      setSelectedToYear(selectedFromYear);
      setSelectedToClass(selectedFromClass);
    } else {
      setSelectedToYear(selectedFromYear);
    }
  }, [promotionType, selectedFromYear, selectedFromClass, academicYears]);

  const handleStudentSelection = (studentId, checked) => {
    if (checked) {
      setSelectedStudents([...selectedStudents, studentId]);
    } else {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedStudents(studentsToPromote.map(student => student.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handlePromoteStudents = async () => {
    if (selectedStudents.length === 0) {
      alert('Please select students to promote');
      return;
    }

    if (!selectedToClass) {
      alert('Please select target class');
      return;
    }

    // Check for fee dues if promoting
    if (promotionType === 'promotion') {
      const studentsWithDues = studentsToPromote.filter(student => 
        selectedStudents.includes(student.id) && student.feeStatus !== 'Paid'
      );
      
      if (studentsWithDues.length > 0) {
        const confirmPromotion = window.confirm(
          `${studentsWithDues.length} student(s) have pending fees. Do you still want to promote them?\n\n` +
          studentsWithDues.map(s => `${s.name} - ${s.feeStatus}`).join('\n')
        );
        
        if (!confirmPromotion) {
          return;
        }
      }
    }

    setLoading(true);

    try {
      const studentsToProcess = studentsToPromote.filter(student => 
        selectedStudents.includes(student.id)
      );

      // Process each student
      studentsToProcess.forEach(student => {
        // Add to academic slice
        dispatch(promoteStudents({
          students: [student],
          fromClass: selectedFromClass,
          toClass: selectedToClass,
          fromAcademicYear: selectedFromYear,
          toAcademicYear: selectedToYear
        }));

        // Add to historical data
        dispatch(addPromotionRecord({
          studentId: student.id,
          promotionData: {
            fromClass: selectedFromClass,
            toClass: selectedToClass,
            fromAcademicYear: selectedFromYear,
            toAcademicYear: selectedToYear,
            promotionType,
            status: 'Completed',
            academicPerformance: student.academicPerformance,
            attendancePercentage: student.attendancePercentage,
            feeStatusAtPromotion: student.feeStatus
          }
        }));

        // Add historical academic data for completed year
        dispatch(addStudentHistoricalData({
          studentId: student.id,
          academicYear: selectedFromYear,
          data: {
            class: selectedFromClass,
            section: student.section,
            status: 'Completed',
            finalResult: promotionType === 'promotion' ? 'Promoted' : 
                        promotionType === 'repeat' ? 'Repeated' : 'Transferred',
            academicPerformance: student.academicPerformance,
            attendancePercentage: student.attendancePercentage,
            feeStatus: student.feeStatus,
            // Fee summary for the completed year
            feeSummary: {
              totalPaid: 18000, // Mock data - should come from actual fee records
              totalDue: student.feeStatus === 'Paid' ? 0 : 2000,
              totalDiscount: 1800
            }
          }
        }));

        // Update fee structure for new class/year
        if (promotionType === 'promotion' || promotionType === 'transfer') {
          dispatch(updateFeeStructureOnPromotion({
            studentId: student.id,
            fromYear: selectedFromYear,
            toYear: selectedToYear,
            fromClass: selectedFromClass,
            toClass: selectedToClass,
            newFeeStructure: feeStructures[selectedToClass]
          }));
        }
      });

      alert(`Successfully ${promotionType === 'promotion' ? 'promoted' : 
             promotionType === 'transfer' ? 'transferred' : 'processed'} ${selectedStudents.length} students`);
      setSelectedStudents([]);
      
    } catch (error) {
      console.error('Error processing students:', error);
      alert('Error occurred while processing students');
    } finally {
      setLoading(false);
    }
  };

  const getPromotionSummary = () => {
    if (selectedStudents.length === 0) return null;

    const studentsToProcess = studentsToPromote.filter(student => 
      selectedStudents.includes(student.id)
    );

    const feeIssues = studentsToProcess.filter(s => s.feeStatus !== 'Paid').length;
    const academicIssues = studentsToProcess.filter(s => s.academicPerformance === 'Below Average').length;
    const attendanceIssues = studentsToProcess.filter(s => s.attendancePercentage < 80).length;

    return {
      total: selectedStudents.length,
      feeIssues,
      academicIssues,
      attendanceIssues,
      fromFeeStructure: feeStructures[selectedFromClass],
      toFeeStructure: feeStructures[selectedToClass]
    };
  };

  const summary = getPromotionSummary();

  return (
    <div className="student-promotion animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Student Promotion & Transfer</h1>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-info">
            <i className="bi bi-clock-history me-2"></i>
            Promotion History
          </button>
          <button className="btn btn-outline-success">
            <i className="bi bi-download me-2"></i>
            Export Report
          </button>
        </div>
      </div>

      <div className="row">
        {/* Selection Panel */}
        <div className="col-lg-4 mb-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="bi bi-gear me-2"></i>
                Promotion Settings
              </h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Promotion Type</label>
                <select 
                  className="form-select"
                  value={promotionType}
                  onChange={(e) => setPromotionType(e.target.value)}
                >
                  <option value="promotion">Annual Promotion</option>
                  <option value="transfer">Class Transfer</option>
                  <option value="repeat">Repeat Class</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">From Academic Year</label>
                <select 
                  className="form-select"
                  value={selectedFromYear}
                  onChange={(e) => setSelectedFromYear(e.target.value)}
                >
                  {academicYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">To Academic Year</label>
                <select 
                  className="form-select"
                  value={selectedToYear}
                  onChange={(e) => setSelectedToYear(e.target.value)}
                  disabled={promotionType === 'promotion'}
                >
                  {academicYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">From Class</label>
                <select 
                  className="form-select"
                  value={selectedFromClass}
                  onChange={(e) => setSelectedFromClass(e.target.value)}
                >
                  <option value="">Select Class</option>
                  {classes.map(cls => (
                    <option key={cls} value={cls}>Class {cls}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">To Class</label>
                <select 
                  className="form-select"
                  value={selectedToClass}
                  onChange={(e) => setSelectedToClass(e.target.value)}
                  disabled={promotionType === 'promotion' || promotionType === 'repeat'}
                >
                  <option value="">Select Class</option>
                  {classes.map(cls => (
                    <option key={cls} value={cls}>Class {cls}</option>
                  ))}
                </select>
              </div>

              <div className="alert alert-info">
                <i className="bi bi-info-circle me-2"></i>
                <small>
                  {promotionType === 'promotion' && 'Students will be promoted to next academic year and class'}
                  {promotionType === 'transfer' && 'Students will be transferred within same academic year'}
                  {promotionType === 'repeat' && 'Students will repeat the same class in same year'}
                </small>
              </div>
            </div>
          </div>

          {/* Fee Structure Comparison */}
          {selectedFromClass && selectedToClass && promotionType !== 'repeat' && (
            <div className="card mt-4">
              <div className="card-header">
                <h6 className="card-title mb-0">Fee Structure Comparison</h6>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <h6 className="text-muted">From Class {selectedFromClass}</h6>
                    <small>Monthly: NPR {feeStructures[selectedFromClass]?.monthlyFee.toLocaleString()}</small><br />
                    <small>Annual: NPR {feeStructures[selectedFromClass]?.totalAnnual.toLocaleString()}</small>
                  </div>
                  <div className="col-6">
                    <h6 className="text-muted">To Class {selectedToClass}</h6>
                    <small>Monthly: NPR {feeStructures[selectedToClass]?.monthlyFee.toLocaleString()}</small><br />
                    <small>Annual: NPR {feeStructures[selectedToClass]?.totalAnnual.toLocaleString()}</small>
                  </div>
                </div>
                <hr />
                <div className="text-center">
                  <small className="text-primary">
                    Fee Increase: NPR {((feeStructures[selectedToClass]?.monthlyFee || 0) - (feeStructures[selectedFromClass]?.monthlyFee || 0)).toLocaleString()}/month
                  </small>
                </div>
              </div>
            </div>
          )}

          {/* Summary Card */}
          {summary && (
            <div className="card mt-4">
              <div className="card-header">
                <h6 className="card-title mb-0">Promotion Summary</h6>
              </div>
              <div className="card-body">
                <div className="mb-2">
                  <strong>Selected Students:</strong> {summary.total}
                </div>
                <div className="mb-2">
                  <strong>From:</strong> Class {selectedFromClass} ({selectedFromYear})
                </div>
                <div className="mb-3">
                  <strong>To:</strong> Class {selectedToClass} ({selectedToYear})
                </div>

                {/* Issues Summary */}
                {(summary.feeIssues > 0 || summary.academicIssues > 0 || summary.attendanceIssues > 0) && (
                  <div className="alert alert-warning">
                    <h6 className="alert-heading">Issues Found:</h6>
                    {summary.feeIssues > 0 && <small className="d-block">• {summary.feeIssues} students with fee dues</small>}
                    {summary.academicIssues > 0 && <small className="d-block">• {summary.academicIssues} students with poor academic performance</small>}
                    {summary.attendanceIssues > 0 && <small className="d-block">• {summary.attendanceIssues} students with low attendance</small>}
                  </div>
                )}

                <button 
                  className="btn btn-primary w-100"
                  onClick={handlePromoteStudents}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-arrow-up-circle me-2"></i>
                      {promotionType === 'promotion' ? 'Promote' : 
                       promotionType === 'transfer' ? 'Transfer' : 'Process'} Students
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Students List */}
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">
                Students in Class {selectedFromClass || '?'} ({selectedFromYear})
              </h5>
              {studentsToPromote.length > 0 && (
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="selectAll"
                    checked={selectedStudents.length === studentsToPromote.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="selectAll">
                    Select All ({studentsToPromote.length})
                  </label>
                </div>
              )}
            </div>
            <div className="card-body">
              {!selectedFromClass ? (
                <div className="text-center py-5">
                  <i className="bi bi-arrow-up-circle display-1 text-muted"></i>
                  <h5 className="mt-3">Select a Class</h5>
                  <p className="text-muted">Choose a class from the left panel to view students</p>
                </div>
              ) : studentsToPromote.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-people display-1 text-muted"></i>
                  <h5 className="mt-3">No Students Found</h5>
                  <p className="text-muted">No students found in Class {selectedFromClass}</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th width="50">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={selectedStudents.length === studentsToPromote.length}
                            onChange={(e) => handleSelectAll(e.target.checked)}
                          />
                        </th>
                        <th>Roll No.</th>
                        <th>Student Name</th>
                        <th>Current Class</th>
                        <th>Section</th>
                        <th>Fee Status</th>
                        <th>Academic Performance</th>
                        <th>Attendance</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentsToPromote.map((student) => (
                        <tr key={student.id}>
                          <td>
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={selectedStudents.includes(student.id)}
                              onChange={(e) => handleStudentSelection(student.id, e.target.checked)}
                            />
                          </td>
                          <td>{student.rollNumber}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="avatar bg-primary rounded-circle d-flex align-items-center justify-content-center me-3"
                                   style={{ width: '40px', height: '40px' }}>
                                <span className="text-white fw-bold">
                                  {student.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <div className="fw-semibold">{student.name}</div>
                              </div>
                            </div>
                          </td>
                          <td>Class {student.currentClass}</td>
                          <td>Section {student.section}</td>
                          <td>
                            <span className={`badge bg-${
                              student.feeStatus === 'Paid' ? 'success' : 
                              student.feeStatus === 'Pending' ? 'warning' : 'danger'
                            }`}>
                              {student.feeStatus}
                            </span>
                          </td>
                          <td>
                            <span className={`badge bg-${
                              student.academicPerformance === 'Excellent' ? 'success' :
                              student.academicPerformance === 'Good' ? 'primary' :
                              student.academicPerformance === 'Average' ? 'info' : 'warning'
                            }`}>
                              {student.academicPerformance}
                            </span>
                          </td>
                          <td>
                            <span className={`badge bg-${
                              student.attendancePercentage >= 90 ? 'success' :
                              student.attendancePercentage >= 80 ? 'primary' :
                              student.attendancePercentage >= 70 ? 'warning' : 'danger'
                            }`}>
                              {student.attendancePercentage}%
                            </span>
                          </td>
                          <td>
                            <span className={`badge bg-${student.status === 'Active' ? 'success' : 'secondary'}`}>
                              {student.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPromotion;