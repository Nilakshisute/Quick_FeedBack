import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
// const BASE_URL = import.meta.env.VITE_API_URL;
// console.log(BASE_URL);




export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post('http://localhost:8000/api/auth/login', form);
    
    login(res.data.token); // Save token in AuthContext/localStorage
    const role = res.data.user.role;

    // Navigate based on user role
    navigate(role === 'admin' ? '/admin' : '/customer');
  } catch (err) {
    console.error("Login failed:", err.response?.data?.message || err.message);
    alert("Login failed: " + (err.response?.data?.message || "Server error"));
  }
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input name="email" onChange={handleChange} placeholder="Email" />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
