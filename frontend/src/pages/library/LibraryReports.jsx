import React, { useState, useEffect } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const LibraryReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [reportData, setReportData] = useState({});
  const [loading, setLoading] = useState(true);

  // Mock report data
  const mockReportData = {
    summary: {
      totalBooks: 2450,
      issuedBooks: 560,
      availableBooks: 1890,
      overdueBooks: 45,
      totalFine: 2250,
      activeMembers: 1250,
      newBooks: 125,
      popularBooks: 85
    },
    monthlyIssues: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Books Issued',
          data: [420, 380, 450, 520, 480, 560],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.1,
        },
        {
          label: 'Books Returned',
          data: [400, 360, 430, 490, 460, 520],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          tension: 0.1,
        }
      ]
    },
    categoryDistribution: {
      labels: ['Computer Science', 'Mathematics', 'Literature', 'Physics', 'Chemistry', 'Biology'],
      datasets: [
        {
          data: [450, 380, 320, 290, 250, 220],
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 205, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)',
          ],
          borderWidth: 0,
        }
      ]
    },
    popularBooks: [
      { id: 1, title: 'Introduction to Computer Science', author: 'John Smith', issues: 45, category: 'Computer Science' },
      { id: 2, title: 'Advanced Mathematics', author: 'Dr. Sarah Johnson', issues: 38, category: 'Mathematics' },
      { id: 3, title: 'Physics Fundamentals', author: 'Dr. Michael Brown', issues: 35, category: 'Physics' },
      { id: 4, title: 'English Literature', author: 'Emily Davis', issues: 32, category: 'Literature' },
      { id: 5, title: 'Chemistry Basics', author: 'Dr. Lisa Wilson', issues: 28, category: 'Chemistry' }
    ],
    overdueList: [
      { id: 1, student: 'Mike Johnson', book: 'Physics Fundamentals', daysOverdue: 25, fine: 250 },
      { id: 2, student: 'Sarah Wilson', book: 'Chemistry Basics', daysOverdue: 15, fine: 150 },
      { id: 3, student: 'David Brown', book: 'World History', daysOverdue: 10, fine: 100 },
      { id: 4, student: 'Emma Davis', book: 'Biology Concepts', daysOverdue: 8, fine: 80 },
      { id: 5, student: 'James Wilson', book: 'Mathematics Advanced', daysOverdue: 5, fine: 50 }
    ]
  };

  useEffect(() => {
    setTimeout(() => {
      setReportData(mockReportData);
      setLoading(false);
    }, 500);
  }, [selectedPeriod]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading library reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="library-reports animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Library Reports & Analytics</h1>
        <div className="d-flex gap-2">
          <select 
            className="form-select"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            style={{ width: 'auto' }}
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button className="btn btn-primary">
            <i className="bi bi-download me-2"></i>
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="stats-card card bg-primary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="stats-icon bg-white bg-opacity-25">
                    <i className="bi bi-book text-white"></i>
                  </div>
                  <h2 className="fw-bold mb-0">{reportData.summary.totalBooks.toLocaleString()}</h2>
                  <p className="mb-0 opacity-75">Total Books</p>
                </div>
                <div className="text-end">
                  <span className="badge bg-white bg-opacity-25">+5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="stats-card card bg-warning text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="stats-icon bg-white bg-opacity-25">
                    <i className="bi bi-bookmark-check text-white"></i>
                  </div>
                  <h2 className="fw-bold mb-0">{reportData.summary.issuedBooks}</h2>
                  <p className="mb-0 opacity-75">Issued Books</p>
                </div>
                <div className="text-end">
                  <span className="badge bg-white bg-opacity-25">+12%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="stats-card card bg-success text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="stats-icon bg-white bg-opacity-25">
                    <i className="bi bi-check-circle text-white"></i>
                  </div>
                  <h2 className="fw-bold mb-0">{reportData.summary.availableBooks.toLocaleString()}</h2>
                  <p className="mb-0 opacity-75">Available Books</p>
                </div>
                <div className="text-end">
                  <span className="badge bg-white bg-opacity-25">77%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="stats-card card bg-danger text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="stats-icon bg-white bg-opacity-25">
                    <i className="bi bi-exclamation-triangle text-white"></i>
                  </div>
                  <h2 className="fw-bold mb-0">{reportData.summary.overdueBooks}</h2>
                  <p className="mb-0 opacity-75">Overdue Books</p>
                </div>
                <div className="text-end">
                  <span className="badge bg-white bg-opacity-25">-8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="row mb-4">
        <div className="col-xl-8 mb-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="card-title mb-0">Monthly Issue & Return Trends</h5>
            </div>
            <div className="card-body">
              <div style={{ height: '300px' }}>
                <Line data={reportData.monthlyIssues} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 mb-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="card-title mb-0">Books by Category</h5>
            </div>
            <div className="card-body">
              <div style={{ height: '300px' }}>
                <Doughnut data={reportData.categoryDistribution} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-6 mb-4">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Most Popular Books</h5>
              <button className="btn btn-sm btn-outline-primary">View All</button>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>Book Title</th>
                      <th>Author</th>
                      <th>Category</th>
                      <th>Issues</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.popularBooks.map((book) => (
                      <tr key={book.id}>
                        <td className="fw-semibold">{book.title}</td>
                        <td>{book.author}</td>
                        <td>
                          <span className="badge bg-primary">{book.category}</span>
                        </td>
                        <td>
                          <span className="badge bg-success">{book.issues}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-6 mb-4">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Overdue Books</h5>
              <button className="btn btn-sm btn-outline-danger">Send Reminders</button>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Book</th>
                      <th>Days</th>
                      <th>Fine</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.overdueList.map((item) => (
                      <tr key={item.id}>
                        <td className="fw-semibold">{item.student}</td>
                        <td>{item.book}</td>
                        <td>
                          <span className="badge bg-warning">{item.daysOverdue} days</span>
                        </td>
                        <td>
                          <span className="text-danger fw-bold">NPR {item.fine}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Statistics */}
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h6 className="card-title mb-0">Library Statistics</h6>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-6">
                  <div className="border-end">
                    <h4 className="text-primary">{reportData.summary.activeMembers}</h4>
                    <small className="text-muted">Active Members</small>
                  </div>
                </div>
                <div className="col-6">
                  <h4 className="text-success">NPR {reportData.summary.totalFine.toLocaleString()}</h4>
                  <small className="text-muted">Total Fine Collected</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h6 className="card-title mb-0">Quick Actions</h6>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <button className="btn btn-outline-primary">
                  <i className="bi bi-envelope me-2"></i>
                  Send Overdue Reminders
                </button>
                <button className="btn btn-outline-success">
                  <i className="bi bi-file-pdf me-2"></i>
                  Generate Monthly Report
                </button>
                <button className="btn btn-outline-info">
                  <i className="bi bi-printer me-2"></i>
                  Print Library Statistics
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryReports;