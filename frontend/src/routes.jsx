import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

export default function AppRoutes() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {user?.role === 'customer' && (
        <Route path="/customer" element={<CustomerDashboard />} />
      )}
       <Route path="/customer" element={<CustomerDashboard />} />

      {user?.role === 'admin' && (
        <Route path="/admin" element={<AdminDashboard />} />
      )}
       <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}
