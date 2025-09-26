// File: smart-queue-system/frontend/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast'; // Import Toaster
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-center" reverseOrder={false} /> {/* Add Toaster here */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);