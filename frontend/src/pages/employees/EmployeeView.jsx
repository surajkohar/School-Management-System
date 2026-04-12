import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentEmployee } from '../../store/slices/employeeSlice.js';

const EmployeeView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentEmployee } = useSelector((state) => state.employees);
  
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    // Mock data for viewing
    const mockEmployee = {
      id: parseInt(id),
      employeeId: 'EMP001',
      name: 'Dr. Sarah Johnson',
      firstName: 'Sarah',
      lastName: 'Johnson',
      dateOfBirth: '1985-05-15',
      age: 38,
      gender: 'Female',
      email: 'sarah.johnson@school.com',
      phone: '+977-9841234567',
      address: 'Kathmandu, Nepal',
      department: 'Academic',
      position: 'Principal',
      joinDate: '2020-01-15',
      salary: 75000,
      bloodGroup: 'O+',
      religion: 'Christian',
      caste: '',
      emergencyContactName: 'John Johnson',
      emergencyContactPhone: '+977-9841234568',
      emergencyContactRelation: 'Spouse',
      qualification: 'Master in Education',
      experience: 15,
      previousEmployer: 'ABC International School',
      bankName: 'Nepal Bank Limited',
      bankAccount: '1234567890',
      panNumber: '123456789',
      photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      status: 'Active',
      attendance: {
        present: 22,
        absent: 3,
        total: 25,
        percentage: 88
      },
      payrollHistory: [
        { month: 'March 2024', basicSalary: 75000, allowances: 5000, deductions: 8000, netSalary: 72000, status: 'Paid', date: '2024-03-31' },
        { month: 'February 2024', basicSalary: 75000, allowances: 5000, deductions: 8000, netSalary: 72000, status: 'Paid', date: '2024-02-29' },
        { month: 'January 2024', basicSalary: 75000, allowances: 5000, deductions: 8000, netSalary: 72000, status: 'Paid', date: '2024-01-31' }
      ],
      leaveHistory: [
        { type: 'Annual Leave', from: '2024-03-15', to: '2024-03-17', days: 3, status: 'Approved', reason: 'Family vacation' },
        { type: 'Sick Leave', from: '2024-02-20', to: '2024-02-20', days: 1, status: 'Approved', reason: 'Medical checkup' },
        { type: 'Casual Leave', from: '2024-01-25', to: '2024-01-25', days: 1, status: 'Approved', reason: 'Personal work' }
      ]
    };

    setTimeout(() => {
      setEmployee(mockEmployee);
      dispatch(setCurrentEmployee(mockEmployee));
      setLoading(false);
    }, 500);
  }, [id, dispatch]);

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    console.log('Export to PDF');
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading employee details...</p>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-person-x display-1 text-muted"></i>
        <h3 className="mt-3">Employee Not Found</h3>
        <p className="text-muted">The employee you're looking for doesn't exist.</p>
        <button className="btn btn-primary" onClick={() => navigate('/employees')}>
          Back to Employees
        </button>
      </div>
    );
  }

  return (
    <div className="employee-view animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Employee Details</h1>
        <div className="d-flex gap-2">
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
            onClick={() => navigate(`/employees/edit/${employee.id}`)}
          >
            <i className="bi bi-pencil me-2"></i>
            Edit
          </button>
          <button 
            className="btn btn-outline-secondary"
            onClick={() => navigate('/employees')}
          >
            <i className="bi bi-arrow-left me-2"></i>
            Back
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4 mb-4">
          <div className="card">
            <div className="card-body text-center">
              <img
                src={employee.photo}
                alt={employee.name}
                className="rounded-circle mb-3"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              <h4 className="fw-bold">{employee.name}</h4>
              <p className="text-muted mb-2">ID: {employee.employeeId}</p>
              <p className="text-muted mb-3">{employee.position} - {employee.department}</p>
              
              <div className="row text-center">
                <div className="col-6">
                  <span className={`badge bg-${employee.status === 'Active' ? 'success' : 'secondary'} fs-6`}>
                    {employee.status}
                  </span>
                </div>
                <div className="col-6">
                  <span className="badge bg-info fs-6">
                    {employee.experience} Years Exp.
                  </span>
                </div>
              </div>
            </div>
          </div>

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
                      <div className="fw-bold">{employee.attendance.percentage}%</div>
                      <small className="text-muted">Attendance</small>
                    </div>
                  </div>
                </div>
                <div className="col-6 text-center">
                  <div className="bg-success bg-opacity-10 rounded p-3">
                    <i className="bi bi-currency-dollar text-success fs-4"></i>
                    <div className="mt-2">
                      <div className="fw-bold">NPR {employee.salary.toLocaleString()}</div>
                      <small className="text-muted">Monthly Salary</small>
                    </div>
                  </div>
                </div>
                <div className="col-6 text-center">
                  <div className="bg-info bg-opacity-10 rounded p-3">
                    <i className="bi bi-briefcase text-info fs-4"></i>
                    <div className="mt-2">
                      <div className="fw-bold">{Math.floor((new Date() - new Date(employee.joinDate)) / (365.25 * 24 * 60 * 60 * 1000))}</div>
                      <small className="text-muted">Years Here</small>
                    </div>
                  </div>
                </div>
                <div className="col-6 text-center">
                  <div className="bg-warning bg-opacity-10 rounded p-3">
                    <i className="bi bi-calendar-x text-warning fs-4"></i>
                    <div className="mt-2">
                      <div className="fw-bold">{employee.leaveHistory.reduce((sum, leave) => sum + leave.days, 0)}</div>
                      <small className="text-muted">Leave Days</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                    className={`nav-link ${activeTab === 'employment' ? 'active' : ''}`}
                    onClick={() => setActiveTab('employment')}
                  >
                    <i className="bi bi-briefcase me-2"></i>Employment
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'payroll' ? 'active' : ''}`}
                    onClick={() => setActiveTab('payroll')}
                  >
                    <i className="bi bi-cash-coin me-2"></i>Payroll
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'leave' ? 'active' : ''}`}
                    onClick={() => setActiveTab('leave')}
                  >
                    <i className="bi bi-calendar-x me-2"></i>Leave
                  </button>
                </li>
              </ul>
            </div>
            <div className="card-body">
              {activeTab === 'personal' && (
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Full Name</label>
                    <p className="form-control-plaintext">{employee.name}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Date of Birth</label>
                    <p className="form-control-plaintext">{new Date(employee.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Age</label>
                    <p className="form-control-plaintext">{employee.age} years</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Gender</label>
                    <p className="form-control-plaintext">{employee.gender}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Email</label>
                    <p className="form-control-plaintext">{employee.email}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Phone</label>
                    <p className="form-control-plaintext">{employee.phone}</p>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Address</label>
                    <p className="form-control-plaintext">{employee.address}</p>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Blood Group</label>
                    <p className="form-control-plaintext">{employee.bloodGroup}</p>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Religion</label>
                    <p className="form-control-plaintext">{employee.religion}</p>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">PAN Number</label>
                    <p className="form-control-plaintext">{employee.panNumber}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Emergency Contact</label>
                    <p className="form-control-plaintext">{employee.emergencyContactName} ({employee.emergencyContactRelation})</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Emergency Phone</label>
                    <p className="form-control-plaintext">{employee.emergencyContactPhone}</p>
                  </div>
                </div>
              )}

              {activeTab === 'employment' && (
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Department</label>
                    <p className="form-control-plaintext">{employee.department}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Position</label>
                    <p className="form-control-plaintext">{employee.position}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Join Date</label>
                    <p className="form-control-plaintext">{new Date(employee.joinDate).toLocaleDateString()}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Experience</label>
                    <p className="form-control-plaintext">{employee.experience} years</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Qualification</label>
                    <p className="form-control-plaintext">{employee.qualification}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Previous Employer</label>
                    <p className="form-control-plaintext">{employee.previousEmployer}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Bank Name</label>
                    <p className="form-control-plaintext">{employee.bankName}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Bank Account</label>
                    <p className="form-control-plaintext">{employee.bankAccount}</p>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Attendance Summary</label>
                    <div className="row">
                      <div className="col-md-3">
                        <div className="text-center p-3 bg-success bg-opacity-10 rounded">
                          <div className="fw-bold text-success">{employee.attendance.present}</div>
                          <small>Present Days</small>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="text-center p-3 bg-danger bg-opacity-10 rounded">
                          <div className="fw-bold text-danger">{employee.attendance.absent}</div>
                          <small>Absent Days</small>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="text-center p-3 bg-info bg-opacity-10 rounded">
                          <div className="fw-bold text-info">{employee.attendance.total}</div>
                          <small>Total Days</small>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="text-center p-3 bg-primary bg-opacity-10 rounded">
                          <div className="fw-bold text-primary">{employee.attendance.percentage}%</div>
                          <small>Percentage</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'payroll' && (
                <div>
                  <div className="row g-3 mb-4">
                    <div className="col-md-3">
                      <label className="form-label fw-semibold">Basic Salary</label>
                      <p className="form-control-plaintext">NPR {employee.salary.toLocaleString()}</p>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-semibold">Allowances</label>
                      <p className="form-control-plaintext">NPR 5,000</p>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-semibold">Deductions</label>
                      <p className="form-control-plaintext">NPR 8,000</p>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-semibold">Net Salary</label>
                      <p className="form-control-plaintext">NPR 72,000</p>
                    </div>
                  </div>

                  <h6 className="fw-semibold mb-3">Payroll History</h6>
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Month</th>
                          <th>Basic Salary</th>
                          <th>Allowances</th>
                          <th>Deductions</th>
                          <th>Net Salary</th>
                          <th>Status</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employee.payrollHistory.map((payroll, index) => (
                          <tr key={index}>
                            <td>{payroll.month}</td>
                            <td>NPR {payroll.basicSalary.toLocaleString()}</td>
                            <td>NPR {payroll.allowances.toLocaleString()}</td>
                            <td>NPR {payroll.deductions.toLocaleString()}</td>
                            <td>NPR {payroll.netSalary.toLocaleString()}</td>
                            <td>
                              <span className={`badge bg-${payroll.status === 'Paid' ? 'success' : 'warning'}`}>
                                {payroll.status}
                              </span>
                            </td>
                            <td>{new Date(payroll.date).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'leave' && (
                <div>
                  <h6 className="fw-semibold mb-3">Leave History</h6>
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Leave Type</th>
                          <th>From Date</th>
                          <th>To Date</th>
                          <th>Days</th>
                          <th>Status</th>
                          <th>Reason</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employee.leaveHistory.map((leave, index) => (
                          <tr key={index}>
                            <td>{leave.type}</td>
                            <td>{new Date(leave.from).toLocaleDateString()}</td>
                            <td>{new Date(leave.to).toLocaleDateString()}</td>
                            <td>{leave.days}</td>
                            <td>
                              <span className={`badge bg-${
                                leave.status === 'Approved' ? 'success' : 
                                leave.status === 'Pending' ? 'warning' : 'danger'
                              }`}>
                                {leave.status}
                              </span>
                            </td>
                            <td>{leave.reason}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeView;