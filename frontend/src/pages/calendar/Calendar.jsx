import React, { useState } from 'react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarType, setCalendarType] = useState('nepal'); // nepal, gregorian
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'School Reopening',
      date: '2024-04-15',
      type: 'academic',
      description: 'School reopens after spring break'
    },
    {
      id: 2,
      title: 'Parent-Teacher Meeting',
      date: '2024-04-20',
      type: 'meeting',
      description: 'Monthly parent-teacher meeting'
    },
    {
      id: 3,
      title: 'Sports Day',
      date: '2024-05-05',
      type: 'event',
      description: 'Annual sports day celebration'
    },
    {
      id: 4,
      title: 'Buddha Jayanti',
      date: '2024-05-23',
      type: 'holiday',
      description: 'Public holiday - Buddha Jayanti'
    }
  ]);

  // Nepali holidays (sample data)
  const nepaliHolidays = [
    { date: '2024-04-13', name: 'Nepali New Year 2081', type: 'national' },
    { date: '2024-05-23', name: 'Buddha Jayanti', type: 'religious' },
    { date: '2024-08-26', name: 'Janai Purnima', type: 'religious' },
    { date: '2024-09-07', name: 'Teej', type: 'cultural' },
    { date: '2024-10-15', name: 'Dashain', type: 'national' },
    { date: '2024-11-01', name: 'Tihar', type: 'national' }
  ];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const nepaliMonths = [
    'Baisakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin',
    'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getEventsForDate = (date) => {
    const dateStr = formatDate(date);
    return events.filter(event => event.date === dateStr);
  };

  const getHolidaysForDate = (date) => {
    const dateStr = formatDate(date);
    return nepaliHolidays.filter(holiday => holiday.date === dateStr);
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateEvents = getEventsForDate(date);
      const dateHolidays = getHolidaysForDate(date);
      const isToday = formatDate(date) === formatDate(new Date());
      const isSelected = selectedDate && formatDate(date) === formatDate(selectedDate);

      days.push(
        <div
          key={day}
          className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${
            dateHolidays.length > 0 ? 'holiday' : ''
          }`}
          onClick={() => setSelectedDate(date)}
        >
          <div className="day-number">{day}</div>
          {dateEvents.length > 0 && (
            <div className="event-indicators">
              {dateEvents.slice(0, 2).map((event, index) => (
                <div
                  key={index}
                  className={`event-dot event-${event.type}`}
                  title={event.title}
                ></div>
              ))}
              {dateEvents.length > 2 && (
                <div className="event-more">+{dateEvents.length - 2}</div>
              )}
            </div>
          )}
          {dateHolidays.length > 0 && (
            <div className="holiday-indicator" title={dateHolidays[0].name}>
              <i className="bi bi-star-fill"></i>
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const getEventTypeColor = (type) => {
    const colors = {
      academic: 'primary',
      meeting: 'info',
      event: 'success',
      holiday: 'danger',
      exam: 'warning'
    };
    return colors[type] || 'secondary';
  };

  return (
    <div className="calendar-page animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">School Calendar</h1>
        <div className="d-flex gap-2">
          <select 
            className="form-select"
            value={calendarType}
            onChange={(e) => setCalendarType(e.target.value)}
            style={{ width: 'auto' }}
          >
            <option value="nepal">Nepali Calendar</option>
            <option value="gregorian">Gregorian Calendar</option>
          </select>
          <button className="btn btn-primary">
            <i className="bi bi-plus-circle me-2"></i>
            Add Event
          </button>
        </div>
      </div>

      <div className="row">
        {/* Calendar */}
        <div className="col-lg-8 mb-4">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">
                {calendarType === 'nepal' ? nepaliMonths[currentDate.getMonth()] : monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                {calendarType === 'nepal' && (
                  <small className="text-muted ms-2">(BS 2081)</small>
                )}
              </h5>
              <div className="d-flex gap-2">
                <button 
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => navigateMonth(-1)}
                >
                  <i className="bi bi-chevron-left"></i>
                </button>
                <button 
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => setCurrentDate(new Date())}
                >
                  Today
                </button>
                <button 
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => navigateMonth(1)}
                >
                  <i className="bi bi-chevron-right"></i>
                </button>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="calendar-grid">
                <div className="calendar-header">
                  <div className="calendar-day-header">Sun</div>
                  <div className="calendar-day-header">Mon</div>
                  <div className="calendar-day-header">Tue</div>
                  <div className="calendar-day-header">Wed</div>
                  <div className="calendar-day-header">Thu</div>
                  <div className="calendar-day-header">Fri</div>
                  <div className="calendar-day-header">Sat</div>
                </div>
                <div className="calendar-body">
                  {renderCalendarDays()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-lg-4">
          {/* Selected Date Events */}
          {selectedDate && (
            <div className="card mb-4">
              <div className="card-header">
                <h6 className="card-title mb-0">
                  Events for {selectedDate.toLocaleDateString()}
                </h6>
              </div>
              <div className="card-body">
                {getEventsForDate(selectedDate).length > 0 ? (
                  <div className="list-group list-group-flush">
                    {getEventsForDate(selectedDate).map((event) => (
                      <div key={event.id} className="list-group-item border-0 px-0">
                        <div className="d-flex align-items-start">
                          <div className={`badge bg-${getEventTypeColor(event.type)} me-3 mt-1`}>
                            <i className="bi bi-circle-fill"></i>
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="mb-1">{event.title}</h6>
                            <p className="mb-0 text-muted small">{event.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted mb-0">No events scheduled for this date.</p>
                )}

                {getHolidaysForDate(selectedDate).length > 0 && (
                  <div className="mt-3">
                    <h6 className="text-danger">
                      <i className="bi bi-star-fill me-2"></i>
                      Holidays
                    </h6>
                    {getHolidaysForDate(selectedDate).map((holiday, index) => (
                      <div key={index} className="text-danger">
                        <i className="bi bi-calendar-x me-2"></i>
                        {holiday.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Upcoming Events */}
          <div className="card mb-4">
            <div className="card-header">
              <h6 className="card-title mb-0">Upcoming Events</h6>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                {events.slice(0, 5).map((event) => (
                  <div key={event.id} className="list-group-item border-0 px-0">
                    <div className="d-flex align-items-start">
                      <div className={`badge bg-${getEventTypeColor(event.type)} me-3 mt-1`}>
                        <i className="bi bi-circle-fill"></i>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{event.title}</h6>
                        <p className="mb-0 text-muted small">
                          {new Date(event.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Nepali Holidays */}
          {calendarType === 'nepal' && (
            <div className="card">
              <div className="card-header">
                <h6 className="card-title mb-0">
                  <i className="bi bi-star-fill text-warning me-2"></i>
                  Nepali Holidays 2081
                </h6>
              </div>
              <div className="card-body">
                <div className="list-group list-group-flush">
                  {nepaliHolidays.slice(0, 6).map((holiday, index) => (
                    <div key={index} className="list-group-item border-0 px-0">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">{holiday.name}</h6>
                          <small className="text-muted">
                            {new Date(holiday.date).toLocaleDateString()}
                          </small>
                        </div>
                        <span className={`badge bg-${
                          holiday.type === 'national' ? 'danger' : 
                          holiday.type === 'religious' ? 'warning' : 'info'
                        }`}>
                          {holiday.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .calendar-grid {
          display: grid;
          grid-template-rows: auto 1fr;
        }

        .calendar-header {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          background-color: #f8f9fa;
          border-bottom: 1px solid #dee2e6;
        }

        .calendar-day-header {
          padding: 1rem;
          text-align: center;
          font-weight: 600;
          border-right: 1px solid #dee2e6;
        }

        .calendar-day-header:last-child {
          border-right: none;
        }

        .calendar-body {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          min-height: 400px;
        }

        .calendar-day {
          min-height: 80px;
          padding: 0.5rem;
          border-right: 1px solid #dee2e6;
          border-bottom: 1px solid #dee2e6;
          cursor: pointer;
          position: relative;
          transition: background-color 0.2s;
        }

        .calendar-day:hover {
          background-color: #f8f9fa;
        }

        .calendar-day:nth-child(7n) {
          border-right: none;
        }

        .calendar-day.empty {
          cursor: default;
        }

        .calendar-day.today {
          background-color: #e3f2fd;
        }

        .calendar-day.selected {
          background-color: #1976d2;
          color: white;
        }

        .calendar-day.holiday {
          background-color: #ffebee;
        }

        .day-number {
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .event-indicators {
          display: flex;
          flex-wrap: wrap;
          gap: 2px;
          margin-top: 0.25rem;
        }

        .event-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          display: inline-block;
        }

        .event-dot.event-academic {
          background-color: #007bff;
        }

        .event-dot.event-meeting {
          background-color: #17a2b8;
        }

        .event-dot.event-event {
          background-color: #28a745;
        }

        .event-dot.event-holiday {
          background-color: #dc3545;
        }

        .event-dot.event-exam {
          background-color: #ffc107;
        }

        .event-more {
          font-size: 0.7rem;
          color: #6c757d;
        }

        .holiday-indicator {
          position: absolute;
          top: 0.25rem;
          right: 0.25rem;
          color: #ffc107;
          font-size: 0.8rem;
        }
      `}</style>
    </div>
  );
};

export default Calendar;