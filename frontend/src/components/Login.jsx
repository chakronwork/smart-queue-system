// File: smart-queue-system/frontend/src/components/Login.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const API_URL = 'https://smart-queue-backend-gc5v.onrender.com';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('กำลังเข้าสู่ระบบ...');
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Login failed');
      toast.dismiss(loadingToast);
      toast.success('เข้าสู่ระบบสำเร็จ!');
      login(data.token);
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]"><div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-blue-600">Admin Login</h1>
      <form onSubmit={handleLogin} className="space-y-6">
        <div><label className="block mb-2 text-sm font-medium text-slate-600">Username</label><input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-3 bg-gray-50 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="admin"/></div>
        <div><label className="block mb-2 text-sm font-medium text-slate-600">Password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 bg-gray-50 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••"/></div>
        <button type="submit" className="w-full py-3 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700">Login</button>
      </form>
    </div></div>
  );
}
export default Login;