import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ExamSchedule = () => {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState('10');
  const [selectedExam, setSelectedExam] = useState('First Terminal');

  // Mock data
  const mockSchedules = [
    {
      id: 1,
      date: '2024-04-15',
      day: 'Monday',
      subject: 'English',
      time: '09:00 AM - 12:00 PM',
      duration: '3 hours',
      room: 'Room 101',
      invigilator: 'Ms. Sarah Johnson',
      totalMarks: 100,
      passingMarks: 40
    },
    {
      id: 2,
      date: '2024-04-16',
      day: 'Tuesday',
      subject: 'Nepali',
      time: '09:00 AM - 12:00 PM',
      duration: '3 hours',
      room: 'Room 102',
      invigilator: 'Mr. John Smith',
      totalMarks: 100,
      passingMarks: 40
    },
    {
      id: 3,
      date: '2024-04-17',
      day: 'Wednesday',
      subject: 'Mathematics',
      time: '09:00 AM - 12:00 PM',
      duration: '3 hours',
      room: 'Room 103',
      invigilator: 'Dr. Emily Davis',
      totalMarks: 100,
      passingMarks: 40
    },
    {
      id: 4,
      date: '2024-04-18',
      day: 'Thursday',
      subject: 'Science',
      time: '09:00 AM - 12:00 PM',
      duration: '3 hours',
      room: 'Lab 1',
      invigilator: 'Mr. Michael Brown',
      totalMarks: 100,
      passingMarks: 40
    },
    {
      id: 5,
      date: '2024-04-19',
      day: 'Friday',
      subject: 'Social Studies',
      time: '09:00 AM - 12:00 PM',
      duration: '3 hours',
      room: 'Room 104',
      invigilator: 'Ms. Lisa Wilson',
      totalMarks: 100,
      passingMarks: 40
    }
  ];

  const classes = [
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
  ];

  const exams = [
    { value: 'First Terminal', label: 'First Terminal Exam' },
    { value: 'Second Terminal', label: 'Second Terminal Exam' },
    { value: 'Annual', label: 'Annual Exam' },
    { value: 'Unit Test 1', label: 'Unit Test 1' },
    { value: 'Unit Test 2', label: 'Unit Test 2' }
  ];

  useEffect(() => {
    setTimeout(() => {
      setSchedules(mockSchedules);
      setLoading(false);
    }, 500);
  }, [selectedClass, selectedExam]);

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    console.log('Export schedule');
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading exam schedule...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="exam-schedule animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Exam Schedule</h1>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-info" onClick={handlePrint}>
            <i className="bi bi-printer me-2"></i>
            Print Schedule
          </button>
          <button className="btn btn-outline-success" onClick={handleExport}>
            <i className="bi bi-download me-2"></i>
            Export
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/exams/add')}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Create Exam
          </button>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Select Class</label>
              <select 
                className="form-select"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                {classes.map(cls => (
                  <option key={cls.value} value={cls.value}>{cls.label}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Select Exam</label>
              <select 
                className="form-select"
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
              >
                {exams.map(exam => (
                  <option key={exam.value} value={exam.value}>{exam.label}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">&nbsp;</label>
              <div className="d-flex gap-2">
                <button className="btn btn-primary">
                  <i className="bi bi-search me-2"></i>
                  View Schedule
                </button>
                <button className="btn btn-outline-secondary">
                  <i className="bi bi-pencil me-2"></i>
                  Edit Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">
            <i className="bi bi-calendar-event me-2"></i>
            {selectedExam} - Class {selectedClass}
          </h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Date</th>
                  <th>Day</th>
                  <th>Subject</th>
                  <th>Time</th>
                  <th>Duration</th>
                  <th>Room</th>
                  <th>Invigilator</th>
                  <th>Marks</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((schedule) => (
                  <tr key={schedule.id}>
                    <td>
                      <div className="fw-semibold">{new Date(schedule.date).toLocaleDateString()}</div>
                    </td>
                    <td>
                      <span className="badge bg-primary">{schedule.day}</span>
                    </td>
                    <td>
                      <div className="fw-semibold">{schedule.subject}</div>
                    </td>
                    <td>{schedule.time}</td>
                    <td>
                      <span className="badge bg-info">{schedule.duration}</span>
                    </td>
                    <td>{schedule.room}</td>
                    <td>{schedule.invigilator}</td>
                    <td>
                      <div>
                        <div className="fw-semibold">Total: {schedule.totalMarks}</div>
                        <small className="text-muted">Pass: {schedule.passingMarks}</small>
                      </div>
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button className="btn btn-outline-primary" title="Edit">
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-outline-danger" title="Delete">
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h6 className="card-title mb-0">Exam Instructions</h6>
            </div>
            <div className="card-body">
              <ul className="list-unstyled mb-0">
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Students must arrive 30 minutes before exam time
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Bring valid ID card and admit card
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Mobile phones are strictly prohibited
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Use only blue or black pen
                </li>
                <li className="mb-0">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  No talking or cheating allowed
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h6 className="card-title mb-0">Exam Statistics</h6>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-6">
                  <div className="border-end">
                    <h4 className="text-primary">{schedules.length}</h4>
                    <small className="text-muted">Total Subjects</small>
                  </div>
                </div>
                <div className="col-6">
                  <h4 className="text-success">5 Days</h4>
                  <small className="text-muted">Exam Duration</small>
                </div>
              </div>
              <hr />
              <div className="row text-center">
                <div className="col-6">
                  <div className="border-end">
                    <h4 className="text-info">500</h4>
                    <small className="text-muted">Total Marks</small>
                  </div>
                </div>
                <div className="col-6">
                  <h4 className="text-warning">200</h4>
                  <small className="text-muted">Passing Marks</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamSchedule;