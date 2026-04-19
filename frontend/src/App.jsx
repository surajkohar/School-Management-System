// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './layout/Layout.jsx';
import Login from './pages/auth/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import StudentList from './pages/students/StudentList.jsx';
import StudentAdd from './pages/students/StudentAdd.jsx';
import StudentEdit from './pages/students/StudentEdit.jsx';
import StudentView from './pages/students/StudentView.jsx';
import StudentPromotion from './pages/students/StudentPromotion.jsx';
import StudentHistoricalData from './pages/students/StudentHistoricalData.jsx';
import EmployeeList from './pages/employees/EmployeeList.jsx';
import EmployeeAdd from './pages/employees/EmployeeAdd.jsx';
import EmployeeEdit from './pages/employees/EmployeeEdit.jsx';
import EmployeeView from './pages/employees/EmployeeView.jsx';
import EmployeePayroll from './pages/employees/EmployeePayroll.jsx';
import EmployeeLeave from './pages/employees/EmployeeLeave.jsx';
import ExamList from './pages/exams/ExamList.jsx';
import FeeList from './pages/fees/FeeList.jsx';
import FeeCollection from './pages/fees/FeeCollection.jsx';
import FeeStructure from './pages/fees/FeeStructure.jsx';
import FeeReports from './pages/fees/FeeReports.jsx';
import RouteList from './pages/transport/RouteList.jsx';
import VehicleList from './pages/transport/VehicleList.jsx';
import DriverList from './pages/transport/DriverList.jsx';
import StudentTransport from './pages/transport/StudentTransport.jsx';
import ReportList from './pages/reports/ReportList.jsx';
import AnnouncementList from './pages/announcements/AnnouncementList.jsx';
import Settings from './pages/settings/Settings.jsx';
import RolePermissions from './pages/settings/RolePermissions.jsx';
import Calendar from './pages/calendar/Calendar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  const { isAuthenticated } = useSelector(state => state.auth);

  return (
    <div className="App">
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />

        {/* Protected Layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* Student Routes - Protected by 'student' resource permission */}
          <Route
            path="students"
            element={
              <ProtectedRoute requiredResource="student" requiredAction="read">
                <StudentList />
              </ProtectedRoute>
            }
          />
          <Route
            path="students/add"
            element={
              <ProtectedRoute requiredResource="student" requiredAction="create">
                <StudentAdd />
              </ProtectedRoute>
            }
          />
          <Route
            path="students/edit/:id"
            element={
              <ProtectedRoute requiredResource="student" requiredAction="update">
                <StudentEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="students/view/:id"
            element={
              <ProtectedRoute requiredResource="student" requiredAction="read">
                <StudentView />
              </ProtectedRoute>
            }
          />
          <Route
            path="students/promotion"
            element={
              <ProtectedRoute requiredResource="student" requiredAction="update">
                <StudentPromotion />
              </ProtectedRoute>
            }
          />
          <Route
            path="students/historical-data"
            element={
              <ProtectedRoute requiredResource="student" requiredAction="read">
                <StudentHistoricalData />
              </ProtectedRoute>
            }
          />

          {/* Employee Routes - Protected by 'employee' resource permission */}
          <Route
            path="employees"
            element={
              <ProtectedRoute requiredResource="employee" requiredAction="read">
                <EmployeeList />
              </ProtectedRoute>
            }
          />
          <Route
            path="employees/add"
            element={
              <ProtectedRoute requiredResource="employee" requiredAction="create">
                <EmployeeAdd />
              </ProtectedRoute>
            }
          />
          <Route
            path="employees/edit/:id"
            element={
              <ProtectedRoute requiredResource="employee" requiredAction="update">
                <EmployeeEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="employees/view/:id"
            element={
              <ProtectedRoute requiredResource="employee" requiredAction="read">
                <EmployeeView />
              </ProtectedRoute>
            }
          />
          <Route
            path="employees/payroll"
            element={
              <ProtectedRoute requiredResource="payroll" requiredAction="read">
                <EmployeePayroll />
              </ProtectedRoute>
            }
          />
          <Route
            path="employees/leave"
            element={
              <ProtectedRoute requiredResource="leave" requiredAction="read">
                <EmployeeLeave />
              </ProtectedRoute>
            }
          />

          {/* Fee Routes - Protected by 'fee' resource permission */}
          <Route
            path="fees"
            element={
              <ProtectedRoute requiredResource="fee" requiredAction="read">
                <FeeList />
              </ProtectedRoute>
            }
          />
          <Route
            path="fees/collection"
            element={
              <ProtectedRoute requiredResource="fee" requiredAction="create">
                <FeeCollection />
              </ProtectedRoute>
            }
          />
          <Route
            path="fees/structure"
            element={
              <ProtectedRoute requiredResource="fee" requiredAction="manage">
                <FeeStructure />
              </ProtectedRoute>
            }
          />
          <Route
            path="fees/reports"
            element={
              <ProtectedRoute requiredResource="report" requiredAction="read">
                <FeeReports />
              </ProtectedRoute>
            }
          />

          {/* Transport Routes - Protected by 'transport' resource permission */}
          <Route
            path="transport/routes"
            element={
              <ProtectedRoute requiredResource="transport" requiredAction="read">
                <RouteList />
              </ProtectedRoute>
            }
          />
          <Route
            path="transport/vehicles"
            element={
              <ProtectedRoute requiredResource="transport" requiredAction="read">
                <VehicleList />
              </ProtectedRoute>
            }
          />
          <Route
            path="transport/drivers"
            element={
              <ProtectedRoute requiredResource="transport" requiredAction="read">
                <DriverList />
              </ProtectedRoute>
            }
          />
          <Route
            path="transport/students"
            element={
              <ProtectedRoute requiredResource="transport" requiredAction="read">
                <StudentTransport />
              </ProtectedRoute>
            }
          />

          {/* Exam Routes - Protected by 'exam' resource permission */}
          <Route
            path="exams"
            element={
              <ProtectedRoute requiredResource="exam" requiredAction="read">
                <ExamList />
              </ProtectedRoute>
            }
          />

          {/* Report Routes - Protected by 'report' resource permission */}
          <Route
            path="reports"
            element={
              <ProtectedRoute requiredResource="report" requiredAction="read">
                <ReportList />
              </ProtectedRoute>
            }
          />

          {/* Announcement Routes - Protected by 'announcement' resource permission */}
          <Route
            path="announcements"
            element={
              <ProtectedRoute requiredResource="announcement" requiredAction="read">
                <AnnouncementList />
              </ProtectedRoute>
            }
          />

          {/* Settings - Protected by 'setting' resource permission */}
          <Route
            path="settings"
            element={
              <ProtectedRoute requiredResource="setting" requiredAction="manage">
                <Settings />
              </ProtectedRoute>
            }
          />

          {/* Role Permissions - Admin only or super admin */}
          <Route
            path="settings/roles"
            element={
              <ProtectedRoute requiredRoles={['admin']}>
                <RolePermissions />
              </ProtectedRoute>
            }
          />

          {/* Calendar - Protected by 'calendar' resource permission */}
          <Route
            path="calendar"
            element={
              <ProtectedRoute requiredResource="calendar" requiredAction="read">
                <Calendar />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </div>
  );
}

export default App;
