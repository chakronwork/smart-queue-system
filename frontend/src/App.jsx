// File: smart-queue-system/frontend/src/App.jsx
import { Routes, Route, Link } from 'react-router-dom';
import CustomerView from './components/CustomerView';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

function App() {
  const { isLoggedIn, logout } = useAuth();

  return (
    // Changed to light theme: bg-gray-100 and text-slate-800
    <div className="min-h-screen bg-gray-100 text-slate-800 font-sans">
      <nav className="bg-white/80 backdrop-blur-sm shadow-md p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">SmartQueue</Link>
          <div className="space-x-4">
            <Link to="/" className="text-slate-600 hover:text-blue-600">หน้าลูกค้า</Link>
            {isLoggedIn ? (
              <>
                <Link to="/admin" className="text-slate-600 hover:text-blue-600">Dashboard</Link>
                <button onClick={logout} className="text-slate-600 hover:text-blue-600">Logout</button>
              </>
            ) : (
              <Link to="/login" className="text-slate-600 hover:text-blue-600">Admin Login</Link>
            )}
          </div>
        </div>
      </nav>
      
      <main>
        <Routes>
          <Route path="/" element={<CustomerView />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/admin" 
            element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} 
          />
        </Routes>
      </main>
    </div>
  );
}
export default App;