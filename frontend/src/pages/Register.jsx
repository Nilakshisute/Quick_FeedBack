import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('http://localhost:8000/api/auth/register', form);
      alert('🎉 Registered successfully! Now login.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Customer Register</h2>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />

      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        required
        type="email"
      />

      <input
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        type="password"
        required
      />

      <button type="submit">Register</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <p>Already have an account? <a href="/login">Login</a></p>
    </form>
  );
}
