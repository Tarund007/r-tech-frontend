import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export default function SignPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        setLoading(true);
        const response = await axios.post(`${API_BASE}/auth/signin`, {
          email: email.trim(),
          password: password.trim(),
        });
        localStorage.setItem('token', response.data.token);
        toast.success('Login successful!');
        setTimeout(() => navigate('/admin/dashboard'), 1500);
      } catch (error) {
        console.error('Login failed:', error);
        toast.error('Invalid email or password');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE}/auth/google`;
  };

  return (
    <div className="flex h-screen w-full relative">
      <ToastContainer position="top-right" autoClose={2000} />

      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="w-1/2 bg-gray-100 p-8 hidden lg:flex items-center justify-center">
        <img
          src="/assets/adminpanel.png"
          alt="Analytics Dashboard"
          className="max-w-full h-auto rounded-lg shadow-lg"
        />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full px-8">
          <h2 className="text-3xl font-semibold text-center mb-1">Welcome Back</h2>
          <p className="text-sm text-gray-600 text-center mb-6">Sign in</p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {errors.form && <p className="text-red-500 text-sm text-center">{errors.form}</p>}

            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium">Password</label>
                <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-sm">Remember me</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 text-white rounded-lg transition ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            <div className="flex items-center my-4">
              <hr className="flex-grow border-t" />
              <span className="mx-2 text-sm text-gray-500">Or continue with</span>
              <hr className="flex-grow border-t" />
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex-1 py-2 border rounded-lg hover:bg-gray-100"
              >
                Google
              </button>
              <button
                type="button"
                className="flex-1 py-2 border rounded-lg hover:bg-gray-100"
              >
                Microsoft
              </button>
            </div>

            <p className="text-center text-sm mt-6">
              Don&apos;t have an account?{' '}
              <Link to="/admin/signup" className="text-blue-600 hover:underline">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
