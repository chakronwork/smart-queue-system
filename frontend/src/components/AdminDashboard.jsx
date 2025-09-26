// File: smart-queue-system/frontend/src/components/AdminDashboard.jsx
// THIS IS THE COMPLETE, FULL FILE WITH THAI LANGUAGE.

import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import toast from 'react-hot-toast';

const API_URL = 'https://smart-queue-backend-gc5v.onrender.com';
const socket = io(API_URL);

function AdminDashboard() {
  const [queue, setQueue] = useState([]);
  
  const fetchQueue = async () => {
    try {
      const response = await fetch(`${API_URL}/queue/list`);
      const data = await response.json();
      setQueue(data.data || []);
    } catch (err) {
      console.error("Failed to fetch queue for admin:", err);
      toast.error('ไม่สามารถโหลดข้อมูลคิวได้');
    }
  };

  useEffect(() => {
    fetchQueue();
    socket.on('queue_updated', () => {
      fetchQueue();
    });

    return () => {
      socket.off('queue_updated');
    };
  }, []);

  const handleCall = async (id) => {
    try {
      await fetch(`${API_URL}/queue/call/${id}`, { method: 'PATCH' });
      toast.success(`เรียกคิวที่ ${id} สำเร็จ!`);
    } catch (err) {
      toast.error('เกิดข้อผิดพลาดในการเรียกคิว');
    }
  };
  
  const handleFinish = async (id) => {
    if (window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการปิดคิวที่ ${id}?`)) {
      try {
        await fetch(`${API_URL}/queue/finish/${id}`, { method: 'DELETE' });
        toast.success(`ปิดคิวที่ ${id} เรียบร้อย`);
      } catch (err) {
        toast.error('เกิดข้อผิดพลาดในการปิดคิว');
      }
    }
  };
  
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Admin Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-200">
              <tr className="text-slate-600">
                <th className="p-3">คิวที่</th>
                <th className="p-3">ชื่อ</th>
                <th className="p-3">เบอร์โทร</th>
                <th className="p-3">สถานะ</th>
                <th className="p-3 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {queue.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3 font-bold text-slate-700">Q-{String(item.id).padStart(3, '0')}</td>
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.phone}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      item.status === 'Waiting' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                    }`}>
                      {item.status === 'Waiting' ? 'รอคิว' : 'เรียกแล้ว'}
                    </span>
                  </td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => handleCall(item.id)}
                      disabled={item.status === 'Called'}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded disabled:bg-slate-300 disabled:cursor-not-allowed"
                    >
                      เรียกคิว
                    </button>
                    <button
                      onClick={() => handleFinish(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                    >
                      ปิดคิว
                    </button>
                  </td>
                </tr>
              ))}
              {queue.length === 0 && (
                <tr>
                  <td colSpan="5">
                    <p className="text-slate-400 text-center py-8">ไม่มีคิวในระบบ</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;