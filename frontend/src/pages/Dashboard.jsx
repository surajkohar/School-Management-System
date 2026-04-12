import React, { useEffect, useState } from 'react';
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

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 1250,
    totalEmployees: 85,
    totalRevenue: 125000,
    pendingFees: 25000,
  });

  const [recentActivities] = useState([
    { id: 1, text: 'New student admission: John Doe in Class 10', time: '2 hours ago', type: 'success' },
    { id: 2, text: 'Fee payment received from Sarah Smith', time: '4 hours ago', type: 'info' },
    { id: 3, text: 'Exam results published for Class 8', time: '1 day ago', type: 'warning' },
    { id: 4, text: 'New employee joined: Mark Johnson (Math Teacher)', time: '2 days ago', type: 'success' },
  ]);

  const attendanceData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Student Attendance',
        data: [95, 92, 98, 89, 94, 96],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
      },
      {
        label: 'Employee Attendance',
        data: [98, 95, 97, 94, 96, 99],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.1,
      },
    ],
  };

  const feeCollectionData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Fee Collection (NPR)',
        data: [120000, 115000, 125000, 130000, 122000, 135000],
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const classDistributionData = {
    labels: ['Class 1-5', 'Class 6-8', 'Class 9-10', 'Class 11-12'],
    datasets: [
      {
        data: [350, 300, 250, 200],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 205, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="dashboard animate-slide-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Dashboard</h1>
        <div className="text-muted">
          <i className="bi bi-calendar3 me-1"></i>
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="stats-card card bg-primary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="stats-icon bg-white bg-opacity-25">
                    <i className="bi bi-people-fill text-white"></i>
                  </div>
                  <h2 className="fw-bold mb-0">{stats.totalStudents.toLocaleString()}</h2>
                  <p className="mb-0 opacity-75">Total Students</p>
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
                    <i className="bi bi-person-badge-fill text-white"></i>
                  </div>
                  <h2 className="fw-bold mb-0">{stats.totalEmployees}</h2>
                  <p className="mb-0 opacity-75">Total Employees</p>
                </div>
                <div className="text-end">
                  <span className="badge bg-white bg-opacity-25">+5%</span>
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
                    <i className="bi bi-currency-dollar text-white"></i>
                  </div>
                  <h2 className="fw-bold mb-0">NPR {(stats.totalRevenue / 1000).toFixed(0)}K</h2>
                  <p className="mb-0 opacity-75">Total Revenue</p>
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
                    <i className="bi bi-exclamation-triangle-fill text-white"></i>
                  </div>
                  <h2 className="fw-bold mb-0">NPR {(stats.pendingFees / 1000).toFixed(0)}K</h2>
                  <p className="mb-0 opacity-75">Pending Fees</p>
                </div>
                <div className="text-end">
                  <span className="badge bg-white bg-opacity-25">-3%</span>
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
            <div className="card-header bg-white">
              <h5 className="card-title mb-0">Attendance Overview</h5>
            </div>
            <div className="card-body">
              <div style={{ height: '300px' }}>
                <Line data={attendanceData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 mb-4">
          <div className="card h-100">
            <div className="card-header bg-white">
              <h5 className="card-title mb-0">Class Distribution</h5>
            </div>
            <div className="card-body">
              <div style={{ height: '300px' }}>
                <Doughnut data={classDistributionData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-8 mb-4">
          <div className="card">
            <div className="card-header bg-white">
              <h5 className="card-title mb-0">Monthly Fee Collection</h5>
            </div>
            <div className="card-body">
              <div style={{ height: '300px' }}>
                <Bar data={feeCollectionData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 mb-4">
          <div className="card">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Recent Activities</h5>
              <a href="#" className="btn btn-sm btn-outline-primary">View All</a>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="list-group-item border-0 py-3">
                    <div className="d-flex align-items-start">
                      <div className={`badge bg-${activity.type} rounded-pill me-3 mt-1`}
                           style={{ width: '8px', height: '8px' }}></div>
                      <div className="flex-grow-1">
                        <p className="mb-1 text-dark">{activity.text}</p>
                        <small className="text-muted">{activity.time}</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;