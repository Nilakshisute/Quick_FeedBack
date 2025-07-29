import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
// const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function AdminDashboard() {
  const { token, logout } = useContext(AuthContext);
  const [feedbackList, setFeedbackList] = useState([]);
  const [response, setResponse] = useState({});
  
  const fetchAllFeedback = async () => {
    const res = await axios.get('http://localhost:8000/api/feedback', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("📦 Admin feedback response:", res.data); 
    setFeedbackList(res.data);
  };

  const handleRespond = async (id) => {
    await axios.patch(
      'http://localhost:8000/api/feedback/${id}/respond',
      { response: response[id] },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setResponse({ ...response, [id]: '' });
    fetchAllFeedback();
  };

  const handleDelete = async (id) => {
    await axios.delete('http://localhost:8000/api/feedback/${id}', {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchAllFeedback();
  };

  useEffect(() => {
    fetchAllFeedback();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <ul>
        {feedbackList.map((fb) => (
          <li key={fb._id}>
            <p><b>User:</b> {fb.user?.name || 'N/A'}</p>
            <p><b>Category:</b> {fb.category}</p>
            <p><b>Comment:</b> {fb.comment}</p>
            <p><b>Rating:</b> {fb.rating} ⭐</p>
            <p><i>Status:</i> {fb.status}</p>
            {fb.response && <p><b>Response:</b> {fb.response}</p>}
            
            {fb.status !== 'responded' && (
              <>
                <input
                  placeholder="Write response..."
                  value={response[fb._id] || ''}
                  onChange={(e) =>
                    setResponse({ ...response, [fb._id]: e.target.value })
                  }
                />
                <button onClick={() => handleRespond(fb._id)}>Respond</button>
              </>
            )}
            <button onClick={() => handleDelete(fb._id)}>Delete</button>
            <hr />
          </li>
        ))}
      </ul>

      <button onClick={logout}>Logout</button>
    </div>
  );
}
