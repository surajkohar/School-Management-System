import React, { useState, useEffect } from 'react';
import FilterDropdown from '../../components/FilterDropdown.jsx';

const Timetable = () => {
  const [selectedClass, setSelectedClass] = useState('10');
  const [selectedSection, setSelectedSection] = useState('A');
  const [showFilters, setShowFilters] = useState(false);
  const [timetable, setTimetable] = useState({});
  const [loading, setLoading] = useState(true);

  const timeSlots = [
    '08:00 - 08:45',
    '08:45 - 09:30',
    '09:30 - 10:15',
    '10:15 - 10:30', // Break
    '10:30 - 11:15',
    '11:15 - 12:00',
    '12:00 - 12:45',
    '12:45 - 01:30', // Lunch
    '01:30 - 02:15',
    '02:15 - 03:00',
    '03:00 - 03:45'
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Mock timetable data
  const mockTimetable = {
    Monday: {
      '08:00 - 08:45': { subject: 'Mathematics', teacher: 'Mr. John Smith', room: 'Room 101' },
      '08:45 - 09:30': { subject: 'English', teacher: 'Ms. Sarah Johnson', room: 'Room 102' },
      '09:30 - 10:15': { subject: 'Science', teacher: 'Dr. Emily Davis', room: 'Lab 1' },
      '10:15 - 10:30': { subject: 'Break', teacher: '', room: '' },
      '10:30 - 11:15': { subject: 'Nepali', teacher: 'Ms. Lisa Wilson', room: 'Room 103' },
      '11:15 - 12:00': { subject: 'Social Studies', teacher: 'Mr. Michael Brown', room: 'Room 104' },
      '12:00 - 12:45': { subject: 'Computer Science', teacher: 'Mr. David Lee', room: 'Computer Lab' },
      '12:45 - 01:30': { subject: 'Lunch Break', teacher: '', room: '' },
      '01:30 - 02:15': { subject: 'Physical Education', teacher: 'Mr. James Wilson', room: 'Playground' },
      '02:15 - 03:00': { subject: 'Art', teacher: 'Ms. Maria Garcia', room: 'Art Room' },
      '03:00 - 03:45': { subject: 'Study Hall', teacher: 'Class Teacher', room: 'Room 101' }
    },
    Tuesday: {
      '08:00 - 08:45': { subject: 'Science', teacher: 'Dr. Emily Davis', room: 'Lab 1' },
      '08:45 - 09:30': { subject: 'Mathematics', teacher: 'Mr. John Smith', room: 'Room 101' },
      '09:30 - 10:15': { subject: 'English', teacher: 'Ms. Sarah Johnson', room: 'Room 102' },
      '10:15 - 10:30': { subject: 'Break', teacher: '', room: '' },
      '10:30 - 11:15': { subject: 'Social Studies', teacher: 'Mr. Michael Brown', room: 'Room 104' },
      '11:15 - 12:00': { subject: 'Nepali', teacher: 'Ms. Lisa Wilson', room: 'Room 103' },
      '12:00 - 12:45': { subject: 'Mathematics', teacher: 'Mr. John Smith', room: 'Room 101' },
      '12:45 - 01:30': { subject: 'Lunch Break', teacher: '', room: '' },
      '01:30 - 02:15': { subject: 'Computer Science', teacher: 'Mr. David Lee', room: 'Computer Lab' },
      '02:15 - 03:00': { subject: 'Music', teacher: 'Ms. Anna Taylor', room: 'Music Room' },
      '03:00 - 03:45': { subject: 'Library', teacher: 'Librarian', room: 'Library' }
    }
    // Add more days as needed
  };

  useEffect(() => {
    setTimeout(() => {
      setTimetable(mockTimetable);
      setLoading(false);
    }, 500);
  }, [selectedClass, selectedSection]);

  const filterOptions = {
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
    ]
  };

  const handleFiltersApply = (newFilters) => {
    if (newFilters.class) setSelectedClass(newFilters.class);
    if (newFilters.section) setSelectedSection(newFilters.section);
    setShowFilters(false);
  };

  const getSubjectColor = (subject) => {
    const colors = {
      'Mathematics': 'bg-primary',
      'English': 'bg-success',
      'Science': 'bg-info',
      'Nepali': 'bg-warning',
      'Social Studies': 'bg-secondary',
      'Computer Science': 'bg-dark',
      'Physical Education': 'bg-danger',
      'Art': 'bg-purple',
      'Music': 'bg-pink',
      'Library': 'bg-teal',
      'Study Hall': 'bg-light',
      'Break': 'bg-light',
      'Lunch Break': 'bg-light'
    };
    return colors[subject] || 'bg-light';
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading timetable...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="timetable animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Class Timetable</h1>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary">
            <i className="bi bi-pencil me-2"></i>
            Edit Timetable
          </button>
          <button className="btn btn-primary">
            <i className="bi bi-plus-circle me-2"></i>
            Create Timetable
          </button>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="d-flex gap-2">
                <select 
                  className="form-select"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                >
                  <option value="">Select Class</option>
                  {filterOptions.class.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                <select 
                  className="form-select"
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                >
                  <option value="">Select Section</option>
                  {filterOptions.section.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
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
                  filters={{ class: selectedClass, section: selectedSection }}
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

      {selectedClass && selectedSection && (
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">
              <i className="bi bi-calendar-week me-2"></i>
              Timetable for Class {selectedClass} - Section {selectedSection}
            </h5>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-bordered mb-0">
                <thead className="table-dark">
                  <tr>
                    <th style={{ width: '120px' }}>Time</th>
                    {days.map(day => (
                      <th key={day} className="text-center">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map(timeSlot => (
                    <tr key={timeSlot}>
                      <td className="fw-bold text-center align-middle bg-light">
                        {timeSlot}
                      </td>
                      {days.map(day => {
                        const period = timetable[day]?.[timeSlot];
                        const isBreak = timeSlot.includes('Break') || timeSlot.includes('Lunch');
                        
                        return (
                          <td key={`${day}-${timeSlot}`} className="p-2">
                            {period ? (
                              <div className={`p-2 rounded text-center ${
                                isBreak ? 'bg-light text-dark' : getSubjectColor(period.subject) + ' text-white'
                              }`}>
                                <div className="fw-bold">{period.subject}</div>
                                {period.teacher && (
                                  <small className="d-block">{period.teacher}</small>
                                )}
                                {period.room && (
                                  <small className="d-block">{period.room}</small>
                                )}
                              </div>
                            ) : (
                              <div className="p-2 text-center text-muted">
                                <small>Free Period</small>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {(!selectedClass || !selectedSection) && (
        <div className="card">
          <div className="card-body text-center py-5">
            <i className="bi bi-calendar-week display-1 text-muted"></i>
            <h4 className="mt-3">Select Class and Section</h4>
            <p className="text-muted">Choose a class and section to view the timetable.</p>
          </div>
        </div>
      )}

      <style jsx>{`
        .bg-purple { background-color: #6f42c1 !important; }
        .bg-pink { background-color: #e83e8c !important; }
        .bg-teal { background-color: #20c997 !important; }
      `}</style>
    </div>
  );
};

export default Timetable;