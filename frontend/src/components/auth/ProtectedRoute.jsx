import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ userRole, allowedRoles }) {
  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}