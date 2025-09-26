// File: smart-queue-system/frontend/src/components/CustomerView.jsx
// THIS IS THE COMPLETE, FULL FILE WITH THAI LANGUAGE.

import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = 'https://smart-queue-backend-gc5v.onrender.com';
const socket = io(API_URL);

function CustomerView() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [queue, setQueue] = useState([]);
  const [myQueueInfo, setMyQueueInfo] = useState(null);

  const fetchQueue = async () => {
    try {
      const response = await fetch(`${API_URL}/queue/list`);
      const data = await response.json();
      setQueue(data.data || []);
    } catch (err) {
      console.error("Failed to fetch queue:", err);
      toast.error('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone) {
      toast.error('กรุณากรอกชื่อและเบอร์โทรศัพท์');
      return;
    }
    const loadingToast = toast.loading('กำลังเพิ่มคิว...');

    try {
      const response = await fetch(`${API_URL}/queue/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Something went wrong');
      
      toast.dismiss(loadingToast);
      toast.success('คุณได้รับคิวเรียบร้อยแล้ว!');
      setMyQueueInfo(result.data);
      setName('');
      setPhone('');
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(err.message);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Waiting':
        return <span className="px-3 py-1 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full">รอคิว</span>;
      case 'Called':
        return <span className="px-3 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full">เรียกแล้ว</span>;
      default:
        return <span className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 rounded-full">{status}</span>;
    }
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600">รับคิวออนไลน์</h1>
        <p className="text-slate-500 mt-2">ไม่ต้องรอหน้าร้านอีกต่อไป</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-blue-500">จองคิวของคุณที่นี่</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-slate-600 mb-2">ชื่อ</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 bg-gray-50 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="เช่น สมชาย ใจดี"/>
            </div>
            <div className="mb-6">
              <label htmlFor="phone" className="block text-slate-600 mb-2">เบอร์โทรศัพท์</label>
              <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-3 bg-gray-50 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="เช่น 0812345678"/>
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300">รับบัตรคิว</button>
          </form>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-blue-500">คิวทั้งหมด</h2>
          <motion.div variants={listVariants} initial="hidden" animate="visible" className="space-y-3 max-h-96 overflow-y-auto pr-2">
            <AnimatePresence>
              {queue.length > 0 ? queue.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  layout
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: -50 }}
                  className={`p-4 rounded-md flex justify-between items-center transition-all ${myQueueInfo && myQueueInfo.id === item.id ? 'bg-blue-100 border border-blue-500' : 'bg-gray-50'}`}
                >
                  <div>
                    <p className="font-bold text-lg text-slate-700">Q-{String(item.id).padStart(3, '0')}</p>
                    <p className="text-slate-500">{item.name}</p>
                  </div>
                  {getStatusBadge(item.status)}
                </motion.div>
              )) : (
                <p className="text-slate-400 text-center py-8">ยังไม่มีใครอยู่ในคิว</p>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default CustomerView;