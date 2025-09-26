// File: smart-queue-system/frontend/src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    // If not logged in, redirect to the /login page
    return <Navigate to="/login" />;
  }

  // If logged in, show the component that was requested (e.g., AdminDashboard)
  return children;
};

export default ProtectedRoute;