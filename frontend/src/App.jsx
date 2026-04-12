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
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="App">
      <Routes>
        <Route 
          path="/login" 
          element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} 
        />
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* Student Routes */}
          <Route path="students" element={<StudentList />} />
          <Route path="students/add" element={<StudentAdd />} />
          <Route path="students/edit/:id" element={<StudentEdit />} />
          <Route path="students/view/:id" element={<StudentView />} />
          <Route path="students/promotion" element={<StudentPromotion />} />
          <Route path="students/historical-data" element={<StudentHistoricalData />} />
          
          {/* Employee Routes */}
          <Route path="employees" element={<EmployeeList />} />
          <Route path="employees/add" element={<EmployeeAdd />} />
          <Route path="employees/edit/:id" element={<EmployeeEdit />} />
          <Route path="employees/view/:id" element={<EmployeeView />} />
          <Route path="employees/payroll" element={<EmployeePayroll />} />
          <Route path="employees/leave" element={<EmployeeLeave />} />
          
          {/* Fee Routes */}
          <Route path="fees" element={<FeeList />} />
          <Route path="fees/collection" element={<FeeCollection />} />
          <Route path="fees/structure" element={<FeeStructure />} />
          <Route path="fees/reports" element={<FeeReports />} />
          
          {/* Transport Routes */}
          <Route path="transport/routes" element={<RouteList />} />
          <Route path="transport/vehicles" element={<VehicleList />} />
          <Route path="transport/drivers" element={<DriverList />} />
          <Route path="transport/students" element={<StudentTransport />} />
          
          {/* Other Routes */}
          <Route path="exams" element={<ExamList />} />
          <Route path="reports" element={<ReportList />} />
          <Route path="announcements" element={<AnnouncementList />} />
          <Route path="settings" element={<Settings />} />
          <Route path="settings/roles" element={<RolePermissions />} />
          <Route path="calendar" element={<Calendar />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </div>
  );
}

export default App;