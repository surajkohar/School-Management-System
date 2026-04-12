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

const FeeReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedClass, setSelectedClass] = useState('all');
  const [reportData, setReportData] = useState({});
  const [loading, setLoading] = useState(true);

  // Mock report data
  const mockReportData = {
    summary: {
      totalCollection: 2500000,
      pendingAmount: 350000,
      overdueAmount: 125000,
      collectionRate: 87.5,
      totalStudents: 1250,
      paidStudents: 1095,
      pendingStudents: 155
    },
    monthlyCollection: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Collection (NPR)',
          data: [2200000, 2350000, 2100000, 2500000, 2400000, 2300000],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.1,
        }
      ]
    },
    classWiseCollection: {
      labels: ['Class 1-5', 'Class 6-8', 'Class 9-10', 'Class 11-12'],
      datasets: [
        {
          label: 'Collection (NPR)',
          data: [800000, 650000, 600000, 450000],
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 205, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
          ],
          borderWidth: 0,
        }
      ]
    },
    paymentMethods: {
      labels: ['Cash', 'Bank Transfer', 'Online', 'Cheque'],
      datasets: [
        {
          data: [45, 30, 20, 5],
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 205, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
          ],
          borderWidth: 0,
        }
      ]
    },
    defaultersList: [
      { id: 1, name: 'John Doe', class: '10-A', amount: 15000, months: 3 },
      { id: 2, name: 'Jane Smith', class: '9-B', amount: 8000, months: 2 },
      { id: 3, name: 'Mike Johnson', class: '11-A', amount: 22000, months: 4 },
      { id: 4, name: 'Sarah Wilson', class: '8-C', amount: 6000, months: 1 },
      { id: 5, name: 'David Brown', class: '12-A', amount: 18000, months: 3 }
    ]
  };

  useEffect(() => {
    setTimeout(() => {
      setReportData(mockReportData);
      setLoading(false);
    }, 500);
  }, [selectedPeriod, selectedClass]);

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
          <p className="mt-3 text-muted">Loading fee reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fee-reports animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Fee Reports & Analytics</h1>
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
          <select 
            className="form-select"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            style={{ width: 'auto' }}
          >
            <option value="all">All Classes</option>
            <option value="1-5">Class 1-5</option>
            <option value="6-8">Class 6-8</option>
            <option value="9-10">Class 9-10</option>
            <option value="11-12">Class 11-12</option>
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
          <div className="stats-card card bg-success text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="stats-icon bg-white bg-opacity-25">
                    <i className="bi bi-currency-dollar text-white"></i>
                  </div>
                  <h2 className="fw-bold mb-0">NPR {(reportData.summary.totalCollection / 1000000).toFixed(1)}M</h2>
                  <p className="mb-0 opacity-75">Total Collection</p>
                </div>
                <div className="text-end">
                  <span className="badge bg-white bg-opacity-25">+8%</span>
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
                    <i className="bi bi-clock text-white"></i>
                  </div>
                  <h2 className="fw-bold mb-0">NPR {(reportData.summary.pendingAmount / 1000).toFixed(0)}K</h2>
                  <p className="mb-0 opacity-75">Pending Amount</p>
                </div>
                <div className="text-end">
                  <span className="badge bg-white bg-opacity-25">-5%</span>
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
                  <h2 className="fw-bold mb-0">NPR {(reportData.summary.overdueAmount / 1000).toFixed(0)}K</h2>
                  <p className="mb-0 opacity-75">Overdue Amount</p>
                </div>
                <div className="text-end">
                  <span className="badge bg-white bg-opacity-25">-12%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="stats-card card bg-info text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="stats-icon bg-white bg-opacity-25">
                    <i className="bi bi-percent text-white"></i>
                  </div>
                  <h2 className="fw-bold mb-0">{reportData.summary.collectionRate}%</h2>
                  <p className="mb-0 opacity-75">Collection Rate</p>
                </div>
                <div className="text-end">
                  <span className="badge bg-white bg-opacity-25">+3%</span>
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
              <h5 className="card-title mb-0">Monthly Fee Collection Trend</h5>
            </div>
            <div className="card-body">
              <div style={{ height: '300px' }}>
                <Line data={reportData.monthlyCollection} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 mb-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="card-title mb-0">Payment Methods</h5>
            </div>
            <div className="card-body">
              <div style={{ height: '300px' }}>
                <Doughnut data={reportData.paymentMethods} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-8 mb-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Class-wise Fee Collection</h5>
            </div>
            <div className="card-body">
              <div style={{ height: '300px' }}>
                <Bar data={reportData.classWiseCollection} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 mb-4">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Top Defaulters</h5>
              <button className="btn btn-sm btn-outline-primary">View All</button>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                {reportData.defaultersList.map((defaulter) => (
                  <div key={defaulter.id} className="list-group-item border-0 py-3">
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{defaulter.name}</h6>
                        <p className="mb-1 text-muted small">Class {defaulter.class}</p>
                        <small className="text-danger">
                          NPR {defaulter.amount.toLocaleString()} ({defaulter.months} months)
                        </small>
                      </div>
                      <button className="btn btn-sm btn-outline-primary">
                        <i className="bi bi-envelope"></i>
                      </button>
                    </div>
                  </div>
                ))}
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
              <h6 className="card-title mb-0">Collection Statistics</h6>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-6">
                  <div className="border-end">
                    <h4 className="text-success">{reportData.summary.paidStudents}</h4>
                    <small className="text-muted">Paid Students</small>
                  </div>
                </div>
                <div className="col-6">
                  <h4 className="text-warning">{reportData.summary.pendingStudents}</h4>
                  <small className="text-muted">Pending Students</small>
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
                  Send Fee Reminders
                </button>
                <button className="btn btn-outline-success">
                  <i className="bi bi-file-pdf me-2"></i>
                  Generate Fee Report
                </button>
                <button className="btn btn-outline-info">
                  <i className="bi bi-printer me-2"></i>
                  Print Collection Summary
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeReports;