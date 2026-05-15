import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(API_URL + '/auth/profile', { withCredentials: true })
      .then(() => {
        toast.success('✅ Google login successful!');
        navigate('/admin/dashboard');
      })
      .catch(() => {
        toast.error('❌ Login failed. Try again.');
        navigate('/admin/signin');
      });
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <p>Authenticating with Google...</p>
      <span className="loader" /> {/* Optional CSS spinner */}
    </div>
  );
}
