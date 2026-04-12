import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStudent } from '../../store/slices/studentSlice.js';

const StudentView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentStudent } = useSelector((state) => state.students);
  
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedExam, setSelectedExam] = useState(null);
  const [showPaymentReceipt, setShowPaymentReceipt] = useState(false);
  const [showFeeCollectionModal, setShowFeeCollectionModal] = useState(false);

  useEffect(() => {
    // Mock data for viewing - in real app, fetch from API
    const mockStudent = {
      id: parseInt(id),
      rollNumber: 'ST001',
      name: 'John Doe',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '2005-05-15',
      age: 18,
      gender: 'Male',
      email: 'john.doe@email.com',
      phone: '+977-9841234567',
      address: 'Kathmandu, Nepal',
      class: '10',
      section: 'A',
      admissionDate: '2024-01-15',
      bloodGroup: 'O+',
      religion: 'Hindu',
      caste: 'Brahmin',
      fatherName: 'Ram Doe',
      fatherPhone: '+977-9841234568',
      fatherOccupation: 'Engineer',
      motherName: 'Sita Doe',
      motherPhone: '+977-9841234569',
      motherOccupation: 'Teacher',
      guardianName: 'Hari Doe',
      guardianPhone: '+977-9841234570',
      guardianRelation: 'Uncle',
      previousSchool: 'ABC School',
      photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      status: 'Active',
      feeStatus: 'Paid',
      attendance: {
        present: 180,
        absent: 20,
        total: 200,
        percentage: 90
      },
      
      // Year-wise academic data
      yearWiseAcademicData: {
        '2022': {
          class: '8',
          section: 'A',
          subjects: ['English', 'Nepali', 'Mathematics', 'Science', 'Social Studies', 'Health Education', 'Computer Science'],
          status: 'Completed',
          finalResult: 'Promoted'
        },
        '2023': {
          class: '9',
          section: 'A',
          subjects: ['English', 'Nepali', 'Mathematics', 'Science', 'Social Studies', 'Health Education', 'Computer Science', 'Optional Mathematics'],
          status: 'Completed',
          finalResult: 'Promoted'
        },
        '2024': {
          class: '10',
          section: 'A',
          subjects: ['English', 'Nepali', 'Mathematics', 'Science', 'Social Studies', 'Health Education', 'Computer Science', 'Optional Mathematics'],
          status: 'Active',
          finalResult: 'Ongoing'
        }
      },

      // Year-wise fee data with month-wise breakdown
      yearWiseFeeData: {
        '2022': {
          feeStructure: {
            monthlyFee: 2200,
            examFee: 1200,
            transportFee: 1100,
            libraryFee: 350,
            discount: 10,
            discountType: 'percentage'
          },
          monthlyFees: [
            { month: 'April 2022', amount: 2200, discount: 220, netAmount: 1980, status: 'Paid', dueDate: '2022-04-05', paidDate: '2022-04-03' },
            { month: 'May 2022', amount: 2200, discount: 220, netAmount: 1980, status: 'Paid', dueDate: '2022-05-05', paidDate: '2022-05-04' },
            { month: 'June 2022', amount: 2200, discount: 220, netAmount: 1980, status: 'Paid', dueDate: '2022-06-05', paidDate: '2022-06-02' },
            { month: 'July 2022', amount: 2200, discount: 220, netAmount: 1980, status: 'Paid', dueDate: '2022-07-05', paidDate: '2022-07-01' }
          ],
          payments: [
            { receiptNo: 'RC2022001', month: 'April 2022', amount: 2200, discount: 220, paid: 1980, status: 'Paid', date: '2022-04-03', method: 'Cash' },
            { receiptNo: 'RC2022002', month: 'May 2022', amount: 2200, discount: 220, paid: 1980, status: 'Paid', date: '2022-05-04', method: 'Bank Transfer' },
            { receiptNo: 'RC2022003', month: 'June 2022', amount: 2200, discount: 220, paid: 1980, status: 'Paid', date: '2022-06-02', method: 'Cash' },
            { receiptNo: 'RC2022004', month: 'July 2022', amount: 2200, discount: 220, paid: 1980, status: 'Paid', date: '2022-07-01', method: 'Online' }
          ]
        },
        '2023': {
          feeStructure: {
            monthlyFee: 2300,
            examFee: 1300,
            transportFee: 1200,
            libraryFee: 400,
            discount: 10,
            discountType: 'percentage'
          },
          monthlyFees: [
            { month: 'April 2023', amount: 2300, discount: 230, netAmount: 2070, status: 'Paid', dueDate: '2023-04-05', paidDate: '2023-04-05' },
            { month: 'May 2023', amount: 2300, discount: 230, netAmount: 2070, status: 'Paid', dueDate: '2023-05-05', paidDate: '2023-05-03' },
            { month: 'June 2023', amount: 2300, discount: 230, netAmount: 2070, status: 'Paid', dueDate: '2023-06-05', paidDate: '2023-06-04' }
          ],
          payments: [
            { receiptNo: 'RC2023001', month: 'April 2023', amount: 2300, discount: 230, paid: 2070, status: 'Paid', date: '2023-04-05', method: 'Cash' },
            { receiptNo: 'RC2023002', month: 'May 2023', amount: 2300, discount: 230, paid: 2070, status: 'Paid', date: '2023-05-03', method: 'Bank Transfer' },
            { receiptNo: 'RC2023003', month: 'June 2023', amount: 2300, discount: 230, paid: 2070, status: 'Paid', date: '2023-06-04', method: 'Online' }
          ]
        },
        '2024': {
          feeStructure: {
            monthlyFee: 2500,
            examFee: 1500,
            transportFee: 1200,
            libraryFee: 400,
            discount: 10,
            discountType: 'percentage'
          },
          monthlyFees: [
            { month: 'January 2024', amount: 2500, discount: 250, netAmount: 2250, status: 'Paid', dueDate: '2024-01-05', paidDate: '2024-01-05' },
            { month: 'February 2024', amount: 2500, discount: 250, netAmount: 2250, status: 'Paid', dueDate: '2024-02-05', paidDate: '2024-02-05' },
            { month: 'March 2024', amount: 2500, discount: 250, netAmount: 2250, status: 'Paid', dueDate: '2024-03-05', paidDate: '2024-03-05' },
            { month: 'April 2024', amount: 2500, discount: 250, netAmount: 2250, status: 'Paid', dueDate: '2024-04-05', paidDate: '2024-04-03' },
            { month: 'May 2024', amount: 2500, discount: 250, netAmount: 2250, status: 'Pending', dueDate: '2024-05-05', paidDate: null },
            { month: 'June 2024', amount: 2500, discount: 250, netAmount: 2250, status: 'Pending', dueDate: '2024-06-05', paidDate: null }
          ],
          payments: [
            { receiptNo: 'RC2024001', month: 'April 2024', amount: 2500, discount: 250, paid: 2250, status: 'Paid', date: '2024-04-03', method: 'Cash' },
            { receiptNo: 'RC2024002', month: 'March 2024', amount: 2500, discount: 250, paid: 2250, status: 'Paid', date: '2024-03-05', method: 'Bank Transfer' },
            { receiptNo: 'RC2024003', month: 'February 2024', amount: 2500, discount: 250, paid: 2250, status: 'Paid', date: '2024-02-05', method: 'Online' },
            { receiptNo: 'RC2024004', month: 'January 2024', amount: 2500, discount: 250, paid: 2250, status: 'Paid', date: '2024-01-05', method: 'Cash' }
          ]
        }
      },

      yearWiseResults: {
        '2024': [
          {
            id: 1,
            examName: 'First Terminal Exam',
            examDate: '2024-03-15',
            totalMarks: 500,
            obtainedMarks: 425,
            percentage: 85,
            grade: 'A',
            rank: 2,
            subjects: [
              { subject: 'English', marks: 85, grade: 'A', fullMarks: 100 },
              { subject: 'Nepali', marks: 78, grade: 'B+', fullMarks: 100 },
              { subject: 'Mathematics', marks: 92, grade: 'A+', fullMarks: 100 },
              { subject: 'Science', marks: 88, grade: 'A', fullMarks: 100 },
              { subject: 'Social Studies', marks: 82, grade: 'A-', fullMarks: 100 }
            ]
          },
          {
            id: 2,
            examName: 'Second Terminal Exam',
            examDate: '2024-06-20',
            totalMarks: 500,
            obtainedMarks: 445,
            percentage: 89,
            grade: 'A+',
            rank: 1,
            subjects: [
              { subject: 'English', marks: 90, grade: 'A+', fullMarks: 100 },
              { subject: 'Nepali', marks: 85, grade: 'A', fullMarks: 100 },
              { subject: 'Mathematics', marks: 95, grade: 'A+', fullMarks: 100 },
              { subject: 'Science', marks: 92, grade: 'A+', fullMarks: 100 },
              { subject: 'Social Studies', marks: 83, grade: 'A-', fullMarks: 100 }
            ]
          }
        ],
        '2023': [
          {
            id: 4,
            examName: 'Annual Exam',
            examDate: '2023-12-15',
            totalMarks: 600,
            obtainedMarks: 480,
            percentage: 80,
            grade: 'A-',
            rank: 4,
            subjects: [
              { subject: 'English', marks: 95, grade: 'A+', fullMarks: 120 },
              { subject: 'Nepali', marks: 88, grade: 'A', fullMarks: 120 },
              { subject: 'Mathematics', marks: 102, grade: 'A+', fullMarks: 120 },
              { subject: 'Science', marks: 98, grade: 'A+', fullMarks: 120 },
              { subject: 'Social Studies', marks: 97, grade: 'A+', fullMarks: 120 }
            ]
          }
        ]
      },
      latestPayment: {
        receiptNo: 'RC2024001',
        date: '2024-04-03',
        month: 'April 2024',
        feeType: 'Monthly Fee',
        totalAmount: 2500,
        discount: 250,
        paidAmount: 2250,
        dueAmount: 0,
        overpaidAmount: 0,
        paymentMethod: 'Cash',
        collectedBy: 'Admin',
        remarks: 'On time payment'
      }
    };

    setTimeout(() => {
      setStudent(mockStudent);
      dispatch(setCurrentStudent(mockStudent));
      setLoading(false);
    }, 500);
  }, [id, dispatch]);

  const handlePrint = () => {
    window.print();
  };

  const handlePrintPaymentReceipt = () => {
    setShowPaymentReceipt(true);
    setTimeout(() => {
      window.print();
      setShowPaymentReceipt(false);
    }, 100);
  };

  const handleExportPDF = () => {
    console.log('Export to PDF');
  };

  const getYearWiseExams = () => {
    return student?.yearWiseResults[selectedYear] || [];
  };

  const getYearWiseFeeData = () => {
    return student?.yearWiseFeeData[selectedYear] || {};
  };

  const getYearWiseAcademicData = () => {
    return student?.yearWiseAcademicData[selectedYear] || {};
  };

  const getCurrentYearMonthlyFees = () => {
    return getYearWiseFeeData().monthlyFees || [];
  };

  const getCurrentYearPayments = () => {
    return getYearWiseFeeData().payments || [];
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading student details...</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-person-x display-1 text-muted"></i>
        <h3 className="mt-3">Student Not Found</h3>
        <p className="text-muted">The student you're looking for doesn't exist.</p>
        <button className="btn btn-primary" onClick={() => navigate('/students')}>
          Back to Students
        </button>
      </div>
    );
  }

  return (
    <div className="student-view animate-slide-in">
      {/* Payment Receipt Modal */}
      {showPaymentReceipt && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-body p-0">
                <div className="receipt-container bg-white p-4">
                  <div className="text-center mb-4">
                    <h2 className="fw-bold text-primary">Modern School Management System</h2>
                    <p className="text-muted mb-0">Kathmandu, Nepal | Phone: +977-1-4567890</p>
                    <hr className="my-3" />
                    <h4 className="text-success">PAYMENT RECEIPT</h4>
                  </div>

                  <div className="row mb-4">
                    <div className="col-6">
                      <strong>Receipt No:</strong> {student.latestPayment.receiptNo}<br />
                      <strong>Date:</strong> {new Date(student.latestPayment.date).toLocaleDateString()}<br />
                      <strong>Payment Method:</strong> {student.latestPayment.paymentMethod}
                    </div>
                    <div className="col-6 text-end">
                      <strong>Student ID:</strong> {student.rollNumber}<br />
                      <strong>Student Name:</strong> {student.name}<br />
                      <strong>Class:</strong> {student.class}-{student.section}
                    </div>
                  </div>

                  <div className="table-responsive mb-4">
                    <table className="table table-bordered">
                      <thead className="table-primary">
                        <tr>
                          <th>Description</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{student.latestPayment.feeType} - {student.latestPayment.month}</td>
                          <td>NPR {student.latestPayment.totalAmount.toLocaleString()}</td>
                        </tr>
                        <tr>
                          <td>Discount Applied</td>
                          <td className="text-success">- NPR {student.latestPayment.discount.toLocaleString()}</td>
                        </tr>
                        <tr className="table-success">
                          <td><strong>Amount Paid</strong></td>
                          <td><strong>NPR {student.latestPayment.paidAmount.toLocaleString()}</strong></td>
                        </tr>
                        <tr>
                          <td><strong>Due Amount</strong></td>
                          <td><strong className={student.latestPayment.dueAmount > 0 ? 'text-danger' : 'text-success'}>
                            NPR {student.latestPayment.dueAmount.toLocaleString()}
                          </strong></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <p><strong>Collected By:</strong> {student.latestPayment.collectedBy}</p>
                      <p><strong>Remarks:</strong> {student.latestPayment.remarks}</p>
                    </div>
                    <div className="col-6 text-end">
                      <div className="border p-3">
                        <p className="mb-1"><strong>Authorized Signature</strong></p>
                        <div style={{ height: '40px' }}></div>
                        <hr className="mt-0" />
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <small className="text-muted">
                      This is a computer generated receipt. Thank you for your payment!
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Student Details</h1>
        <div className="d-flex gap-2">
          <button 
            className="btn btn-success"
            onClick={() => setShowFeeCollectionModal(true)}
          >
            <i className="bi bi-cash-coin me-2"></i>
            Collect Fee
          </button>
          <button 
            className="btn btn-outline-success"
            onClick={handlePrintPaymentReceipt}
          >
            <i className="bi bi-receipt me-2"></i>
            Print Receipt
          </button>
          <button 
            className="btn btn-outline-info"
            onClick={handlePrint}
          >
            <i className="bi bi-printer me-2"></i>
            Print
          </button>
          <button 
            className="btn btn-outline-success"
            onClick={handleExportPDF}
          >
            <i className="bi bi-file-pdf me-2"></i>
            Export PDF
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => navigate(`/students/edit/${student.id}`)}
          >
            <i className="bi bi-pencil me-2"></i>
            Edit
          </button>
          <button 
            className="btn btn-outline-secondary"
            onClick={() => navigate('/students')}
          >
            <i className="bi bi-arrow-left me-2"></i>
            Back
          </button>
        </div>
      </div>

      <div className="row">
        {/* Student Profile Card */}
        <div className="col-lg-4 mb-4">
          <div className="card">
            <div className="card-body text-center">
              <img
                src={student.photo}
                alt={student.name}
                className="rounded-circle mb-3"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              <h4 className="fw-bold">{student.name}</h4>
              <p className="text-muted mb-2">Roll No: {student.rollNumber}</p>
              <p className="text-muted mb-3">Class {student.class} - Section {student.section}</p>
              
              <div className="row text-center">
                <div className="col-6">
                  <span className={`badge bg-${student.status === 'Active' ? 'success' : 'secondary'} fs-6`}>
                    {student.status}
                  </span>
                </div>
                <div className="col-6">
                  <span className={`badge bg-${
                    student.feeStatus === 'Paid' ? 'success' : 
                    student.feeStatus === 'Pending' ? 'warning' : 'danger'
                  } fs-6`}>
                    {student.feeStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Latest Payment Card */}
          <div className="card mt-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h6 className="card-title mb-0">Latest Payment</h6>
              <button 
                className="btn btn-sm btn-outline-primary"
                onClick={handlePrintPaymentReceipt}
              >
                <i className="bi bi-printer me-1"></i>
                Print Receipt
              </button>
            </div>
            <div className="card-body">
              <div className="row g-2">
                <div className="col-6">
                  <small className="text-muted">Receipt No:</small>
                  <div className="fw-bold">{student.latestPayment.receiptNo}</div>
                </div>
                <div className="col-6">
                  <small className="text-muted">Date:</small>
                  <div className="fw-bold">{new Date(student.latestPayment.date).toLocaleDateString()}</div>
                </div>
                <div className="col-12">
                  <small className="text-muted">For:</small>
                  <div className="fw-bold">{student.latestPayment.month}</div>
                </div>
                <div className="col-6">
                  <small className="text-muted">Total Amount:</small>
                  <div className="fw-bold">NPR {student.latestPayment.totalAmount.toLocaleString()}</div>
                </div>
                <div className="col-6">
                  <small className="text-muted">Discount:</small>
                  <div className="fw-bold text-success">NPR {student.latestPayment.discount.toLocaleString()}</div>
                </div>
                <div className="col-6">
                  <small className="text-muted">Paid Amount:</small>
                  <div className="fw-bold text-primary">NPR {student.latestPayment.paidAmount.toLocaleString()}</div>
                </div>
                <div className="col-6">
                  <small className="text-muted">Due Amount:</small>
                  <div className={`fw-bold ${student.latestPayment.dueAmount > 0 ? 'text-danger' : 'text-success'}`}>
                    NPR {student.latestPayment.dueAmount.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card mt-4">
            <div className="card-header">
              <h6 className="card-title mb-0">Quick Stats</h6>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-6 text-center">
                  <div className="bg-primary bg-opacity-10 rounded p-3">
                    <i className="bi bi-calendar-check text-primary fs-4"></i>
                    <div className="mt-2">
                      <div className="fw-bold">{student.attendance.percentage}%</div>
                      <small className="text-muted">Attendance</small>
                    </div>
                  </div>
                </div>
                <div className="col-6 text-center">
                  <div className="bg-success bg-opacity-10 rounded p-3">
                    <i className="bi bi-trophy text-success fs-4"></i>
                    <div className="mt-2">
                      <div className="fw-bold">A</div>
                      <small className="text-muted">Avg Grade</small>
                    </div>
                  </div>
                </div>
                <div className="col-6 text-center">
                  <div className="bg-info bg-opacity-10 rounded p-3">
                    <i className="bi bi-book text-info fs-4"></i>
                    <div className="mt-2">
                      <div className="fw-bold">{getYearWiseAcademicData().subjects?.length || 0}</div>
                      <small className="text-muted">Subjects</small>
                    </div>
                  </div>
                </div>
                <div className="col-6 text-center">
                  <div className="bg-warning bg-opacity-10 rounded p-3">
                    <i className="bi bi-currency-dollar text-warning fs-4"></i>
                    <div className="mt-2">
                      <div className="fw-bold">NPR {getYearWiseFeeData().feeStructure?.monthlyFee || 0}</div>
                      <small className="text-muted">Monthly Fee</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header">
              <ul className="nav nav-tabs card-header-tabs" role="tablist">
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'personal' ? 'active' : ''}`}
                    onClick={() => setActiveTab('personal')}
                  >
                    <i className="bi bi-person me-2"></i>Personal Info
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'academic' ? 'active' : ''}`}
                    onClick={() => setActiveTab('academic')}
                  >
                    <i className="bi bi-book me-2"></i>Academic
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'parent' ? 'active' : ''}`}
                    onClick={() => setActiveTab('parent')}
                  >
                    <i className="bi bi-people me-2"></i>Parent Info
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'fees' ? 'active' : ''}`}
                    onClick={() => setActiveTab('fees')}
                  >
                    <i className="bi bi-cash-coin me-2"></i>Fees
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'results' ? 'active' : ''}`}
                    onClick={() => setActiveTab('results')}
                  >
                    <i className="bi bi-clipboard-check me-2"></i>Results
                  </button>
                </li>
              </ul>
            </div>
            <div className="card-body">
              {/* Personal Information Tab */}
              {activeTab === 'personal' && (
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Full Name</label>
                    <p className="form-control-plaintext">{student.name}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Date of Birth</label>
                    <p className="form-control-plaintext">{new Date(student.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Age</label>
                    <p className="form-control-plaintext">{student.age} years</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Gender</label>
                    <p className="form-control-plaintext">{student.gender}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Email</label>
                    <p className="form-control-plaintext">{student.email}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Phone</label>
                    <p className="form-control-plaintext">{student.phone}</p>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Address</label>
                    <p className="form-control-plaintext">{student.address}</p>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Blood Group</label>
                    <p className="form-control-plaintext">{student.bloodGroup}</p>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Religion</label>
                    <p className="form-control-plaintext">{student.religion}</p>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Caste</label>
                    <p className="form-control-plaintext">{student.caste}</p>
                  </div>
                </div>
              )}

              {/* Academic Information Tab - Year-wise */}
              {activeTab === 'academic' && (
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h6 className="fw-semibold mb-0">Academic Information</h6>
                    <select 
                      className="form-select"
                      style={{ width: 'auto' }}
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                    >
                      <option value="2024">Academic Year 2024</option>
                      <option value="2023">Academic Year 2023</option>
                      <option value="2022">Academic Year 2022</option>
                    </select>
                  </div>

                  {getYearWiseAcademicData().class ? (
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Class</label>
                        <p className="form-control-plaintext">Class {getYearWiseAcademicData().class}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Section</label>
                        <p className="form-control-plaintext">Section {getYearWiseAcademicData().section}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Status</label>
                        <span className={`badge bg-${getYearWiseAcademicData().status === 'Active' ? 'success' : 'secondary'}`}>
                          {getYearWiseAcademicData().status}
                        </span>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Final Result</label>
                        <span className={`badge bg-${
                          getYearWiseAcademicData().finalResult === 'Promoted' ? 'success' : 
                          getYearWiseAcademicData().finalResult === 'Ongoing' ? 'primary' : 'warning'
                        }`}>
                          {getYearWiseAcademicData().finalResult}
                        </span>
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold">Subjects for {selectedYear}</label>
                        <div className="d-flex flex-wrap gap-2">
                          {(getYearWiseAcademicData().subjects || []).map((subject, index) => (
                            <span key={index} className="badge bg-primary">{subject}</span>
                          ))}
                        </div>
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold">Attendance Summary</label>
                        <div className="row">
                          <div className="col-md-3">
                            <div className="text-center p-3 bg-success bg-opacity-10 rounded">
                              <div className="fw-bold text-success">{student.attendance.present}</div>
                              <small>Present Days</small>
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="text-center p-3 bg-danger bg-opacity-10 rounded">
                              <div className="fw-bold text-danger">{student.attendance.absent}</div>
                              <small>Absent Days</small>
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="text-center p-3 bg-info bg-opacity-10 rounded">
                              <div className="fw-bold text-info">{student.attendance.total}</div>
                              <small>Total Days</small>
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="text-center p-3 bg-primary bg-opacity-10 rounded">
                              <div className="fw-bold text-primary">{student.attendance.percentage}%</div>
                              <small>Percentage</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-5">
                      <i className="bi bi-calendar-x display-4 text-muted"></i>
                      <h5 className="mt-3">No Academic Data</h5>
                      <p className="text-muted">No academic information found for {selectedYear}.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Parent Information Tab */}
              {activeTab === 'parent' && (
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Father's Name</label>
                    <p className="form-control-plaintext">{student.fatherName}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Father's Phone</label>
                    <p className="form-control-plaintext">{student.fatherPhone}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Father's Occupation</label>
                    <p className="form-control-plaintext">{student.fatherOccupation}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Mother's Name</label>
                    <p className="form-control-plaintext">{student.motherName}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Mother's Phone</label>
                    <p className="form-control-plaintext">{student.motherPhone}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Mother's Occupation</label>
                    <p className="form-control-plaintext">{student.motherOccupation}</p>
                  </div>
                  {student.guardianName && (
                    <>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Guardian's Name</label>
                        <p className="form-control-plaintext">{student.guardianName}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Guardian's Phone</label>
                        <p className="form-control-plaintext">{student.guardianPhone}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Guardian's Relation</label>
                        <p className="form-control-plaintext">{student.guardianRelation}</p>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Fees Tab - Year-wise with Month-wise breakdown */}
              {activeTab === 'fees' && (
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h6 className="fw-semibold mb-0">Fee Information</h6>
                    <select 
                      className="form-select"
                      style={{ width: 'auto' }}
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                    >
                      <option value="2024">Academic Year 2024</option>
                      <option value="2023">Academic Year 2023</option>
                      <option value="2022">Academic Year 2022</option>
                    </select>
                  </div>

                  {getYearWiseFeeData().feeStructure ? (
                    <div>
                      {/* Fee Structure for Selected Year */}
                      <div className="row g-3 mb-4">
                        <div className="col-md-3">
                          <label className="form-label fw-semibold">Monthly Fee</label>
                          <p className="form-control-plaintext">NPR {getYearWiseFeeData().feeStructure.monthlyFee.toLocaleString()}</p>
                        </div>
                        <div className="col-md-3">
                          <label className="form-label fw-semibold">Exam Fee</label>
                          <p className="form-control-plaintext">NPR {getYearWiseFeeData().feeStructure.examFee.toLocaleString()}</p>
                        </div>
                        <div className="col-md-3">
                          <label className="form-label fw-semibold">Transport Fee</label>
                          <p className="form-control-plaintext">NPR {getYearWiseFeeData().feeStructure.transportFee.toLocaleString()}</p>
                        </div>
                        <div className="col-md-3">
                          <label className="form-label fw-semibold">Library Fee</label>
                          <p className="form-control-plaintext">NPR {getYearWiseFeeData().feeStructure.libraryFee.toLocaleString()}</p>
                        </div>
                        <div className="col-md-3">
                          <label className="form-label fw-semibold">Discount</label>
                          <p className="form-control-plaintext">
                            {getYearWiseFeeData().feeStructure.discount}{getYearWiseFeeData().feeStructure.discountType === 'percentage' ? '%' : ' NPR'}
                          </p>
                        </div>
                        <div className="col-md-3">
                          <label className="form-label fw-semibold">Net Monthly Fee</label>
                          <p className="form-control-plaintext">
                            NPR {getYearWiseFeeData().feeStructure.discountType === 'percentage' 
                              ? (getYearWiseFeeData().feeStructure.monthlyFee - (getYearWiseFeeData().feeStructure.monthlyFee * getYearWiseFeeData().feeStructure.discount / 100)).toLocaleString()
                              : (getYearWiseFeeData().feeStructure.monthlyFee - getYearWiseFeeData().feeStructure.discount).toLocaleString()
                            }
                          </p>
                        </div>
                      </div>

                      {/* Current Year Month-wise Fee Status */}
                      <h6 className="fw-semibold mb-3">Monthly Fee Status for {selectedYear}</h6>
                      <div className="table-responsive mb-4">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th>Month</th>
                              <th>Amount</th>
                              <th>Discount</th>
                              <th>Net Amount</th>
                              <th>Due Date</th>
                              <th>Status</th>
                              <th>Paid Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getCurrentYearMonthlyFees().map((fee, index) => (
                              <tr key={index}>
                                <td>{fee.month}</td>
                                <td>NPR {fee.amount.toLocaleString()}</td>
                                <td>NPR {fee.discount.toLocaleString()}</td>
                                <td>NPR {fee.netAmount.toLocaleString()}</td>
                                <td>{new Date(fee.dueDate).toLocaleDateString()}</td>
                                <td>
                                  <span className={`badge bg-${
                                    fee.status === 'Paid' ? 'success' : 
                                    fee.status === 'Pending' ? 'warning' : 'danger'
                                  }`}>
                                    {fee.status}
                                  </span>
                                </td>
                                <td>{fee.paidDate ? new Date(fee.paidDate).toLocaleDateString() : '-'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Payment History for Selected Year */}
                      <h6 className="fw-semibold mb-3">Payment History for {selectedYear}</h6>
                      <div className="table-responsive">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th>Receipt No.</th>
                              <th>Month</th>
                              <th>Amount</th>
                              <th>Discount</th>
                              <th>Paid</th>
                              <th>Method</th>
                              <th>Date</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getCurrentYearPayments().map((payment, index) => (
                              <tr key={index}>
                                <td>{payment.receiptNo}</td>
                                <td>{payment.month}</td>
                                <td>NPR {payment.amount.toLocaleString()}</td>
                                <td>NPR {payment.discount.toLocaleString()}</td>
                                <td>NPR {payment.paid.toLocaleString()}</td>
                                <td>
                                  <span className={`badge bg-${
                                    payment.method === 'Cash' ? 'success' : 
                                    payment.method === 'Bank Transfer' ? 'primary' : 'info'
                                  }`}>
                                    {payment.method}
                                  </span>
                                </td>
                                <td>{new Date(payment.date).toLocaleDateString()}</td>
                                <td>
                                  <span className={`badge bg-${
                                    payment.status === 'Paid' ? 'success' : 
                                    payment.status === 'Pending' ? 'warning' : 'danger'
                                  }`}>
                                    {payment.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-5">
                      <i className="bi bi-currency-dollar display-4 text-muted"></i>
                      <h5 className="mt-3">No Fee Data</h5>
                      <p className="text-muted">No fee information found for {selectedYear}.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Results Tab - Year-wise */}
              {activeTab === 'results' && (
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h6 className="fw-semibold mb-0">Academic Results</h6>
                    <select 
                      className="form-select"
                      style={{ width: 'auto' }}
                      value={selectedYear}
                      onChange={(e) => {
                        setSelectedYear(e.target.value);
                        setSelectedExam(null);
                      }}
                    >
                      <option value="2024">Academic Year 2024</option>
                      <option value="2023">Academic Year 2023</option>
                      <option value="2022">Academic Year 2022</option>
                    </select>
                  </div>

                  {!selectedExam ? (
                    <div>
                      <h6 className="text-muted mb-3">Exams for {selectedYear}</h6>
                      <div className="row g-3">
                        {getYearWiseExams().map((exam) => (
                          <div key={exam.id} className="col-md-6">
                            <div 
                              className="card h-100 cursor-pointer border-2 hover-shadow"
                              onClick={() => setSelectedExam(exam)}
                              style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                              <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                  <h6 className="card-title mb-0">{exam.examName}</h6>
                                  <span className={`badge bg-${
                                    exam.grade.includes('A') ? 'success' : 
                                    exam.grade.includes('B') ? 'primary' : 'warning'
                                  }`}>
                                    {exam.grade}
                                  </span>
                                </div>
                                <p className="text-muted small mb-2">
                                  <i className="bi bi-calendar me-1"></i>
                                  {new Date(exam.examDate).toLocaleDateString()}
                                </p>
                                <div className="row g-2">
                                  <div className="col-6">
                                    <small className="text-muted">Total Marks</small>
                                    <div className="fw-bold">{exam.obtainedMarks}/{exam.totalMarks}</div>
                                  </div>
                                  <div className="col-6">
                                    <small className="text-muted">Percentage</small>
                                    <div className="fw-bold">{exam.percentage}%</div>
                                  </div>
                                  <div className="col-6">
                                    <small className="text-muted">Rank</small>
                                    <div className="fw-bold">#{exam.rank}</div>
                                  </div>
                                  <div className="col-6">
                                    <small className="text-muted">Subjects</small>
                                    <div className="fw-bold">{exam.subjects.length}</div>
                                  </div>
                                </div>
                                <div className="progress mt-3" style={{ height: '8px' }}>
                                  <div 
                                    className={`progress-bar bg-${
                                      exam.percentage >= 90 ? 'success' : 
                                      exam.percentage >= 80 ? 'primary' : 
                                      exam.percentage >= 70 ? 'info' : 'warning'
                                    }`}
                                    style={{ width: `${exam.percentage}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {getYearWiseExams().length === 0 && (
                        <div className="text-center py-5">
                          <i className="bi bi-clipboard-x display-4 text-muted"></i>
                          <h5 className="mt-3">No Exams Found</h5>
                          <p className="text-muted">No exam records found for the selected year.</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <h5 className="mb-1">{selectedExam.examName}</h5>
                          <p className="text-muted mb-0">
                            <i className="bi bi-calendar me-1"></i>
                            {new Date(selectedExam.examDate).toLocaleDateString()}
                          </p>
                        </div>
                        <button 
                          className="btn btn-outline-secondary"
                          onClick={() => setSelectedExam(null)}
                        >
                          <i className="bi bi-arrow-left me-2"></i>
                          Back to Exams
                        </button>
                      </div>

                      {/* Exam Summary */}
                      <div className="row g-3 mb-4">
                        <div className="col-md-3">
                          <div className="text-center p-3 bg-primary bg-opacity-10 rounded">
                            <div className="fw-bold text-primary">{selectedExam.obtainedMarks}/{selectedExam.totalMarks}</div>
                            <small>Total Marks</small>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="text-center p-3 bg-success bg-opacity-10 rounded">
                            <div className="fw-bold text-success">{selectedExam.percentage}%</div>
                            <small>Percentage</small>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="text-center p-3 bg-info bg-opacity-10 rounded">
                            <div className="fw-bold text-info">{selectedExam.grade}</div>
                            <small>Grade</small>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="text-center p-3 bg-warning bg-opacity-10 rounded">
                            <div className="fw-bold text-warning">#{selectedExam.rank}</div>
                            <small>Class Rank</small>
                          </div>
                        </div>
                      </div>

                      {/* Subject-wise Results */}
                      <h6 className="fw-semibold mb-3">Subject-wise Results</h6>
                      <div className="table-responsive">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th>Subject</th>
                              <th>Marks Obtained</th>
                              <th>Full Marks</th>
                              <th>Percentage</th>
                              <th>Grade</th>
                              <th>Performance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedExam.subjects.map((subject, index) => {
                              const percentage = Math.round((subject.marks / subject.fullMarks) * 100);
                              return (
                                <tr key={index}>
                                  <td className="fw-semibold">{subject.subject}</td>
                                  <td>{subject.marks}</td>
                                  <td>{subject.fullMarks}</td>
                                  <td>{percentage}%</td>
                                  <td>
                                    <span className={`badge bg-${
                                      subject.grade.includes('A') ? 'success' : 
                                      subject.grade.includes('B') ? 'primary' : 
                                      subject.grade.includes('C') ? 'warning' : 'danger'
                                    }`}>
                                      {subject.grade}
                                    </span>
                                  </td>
                                  <td>
                                    <div className="progress" style={{ height: '20px' }}>
                                      <div 
                                        className={`progress-bar bg-${
                                          percentage >= 90 ? 'success' : 
                                          percentage >= 80 ? 'primary' : 
                                          percentage >= 70 ? 'info' :
                                          percentage >= 60 ? 'warning' : 'danger'
                                        }`}
                                        style={{ width: `${percentage}%` }}
                                      >
                                        {percentage}%
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentView;