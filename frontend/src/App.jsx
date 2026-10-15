import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import ProtectedRoute from './components/auth/ProtectedRoute';
import {
  DashboardPage,
  EmployeesPage,
  DepartmentsPage,
  AttendancePage,
  LeavesPage,
  LoginPage,
  UnauthorizedPage,
} from './pages/PagePlaceholders';

export default function App() {
  // Temporary Day 1 role state (Replaced by JWT AuthContext on Day 2)
  const [userRole, setUserRole] = useState('ADMIN');

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Authenticated Layout Wrapper */}
        <Route element={<AppShell userRole={userRole} setUserRole={setUserRole} />}>
          {/* Shared Routes (Admin + Employee) */}
          <Route element={<ProtectedRoute userRole={userRole} allowedRoles={['ADMIN', 'EMPLOYEE']} />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/leaves" element={<LeavesPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
          </Route>

          {/* Admin-Only Routes */}
          <Route element={<ProtectedRoute userRole={userRole} allowedRoles={['ADMIN']} />}>
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/departments" element={<DepartmentsPage />} />
          </Route>
        </Route>

        {/* Fallback 404 Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}