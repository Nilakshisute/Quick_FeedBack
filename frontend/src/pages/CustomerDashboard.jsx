import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
// const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const { token, logout } = useContext(AuthContext);
  const [form, setForm] = useState({ category: '', comment: '', rating: 1 });
  const [myFeedback, setMyFeedback] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchMyFeedback = async () => {
    const res = await axios.get('http://localhost:8000/api/feedback/my', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMyFeedback(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8000/api/feedback/', form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setForm({ category: '', comment: '', rating: 1 });
    fetchMyFeedback();
  };

  const handleLogout = () => {
    logout();            // Clear token
    navigate('/login');  // ✅ Redirect to login page
  };

  useEffect(() => {
    fetchMyFeedback();
  }, []);

  return (
    <div>
      <h2>Submit Feedback</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <textarea
          name="comment"
          value={form.comment}
          onChange={handleChange}
          placeholder="Your comment"
          required
        />
        <input
          name="rating"
          type="number"
          min="1"
          max="5"
          value={form.rating}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>

      <hr />

      <h3>My Feedback</h3>
      <ul>
        {myFeedback.map((fb) => (
          <li key={fb._id}>
            <b>{fb.category}</b> - {fb.comment} ⭐{fb.rating}  
            <br />
            <i>Status: {fb.status}</i>  
            {fb.response && <p><b>Response:</b> {fb.response}</p>}
          </li>
        ))}
      </ul>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
