import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import zxcvbn from 'zxcvbn';
import { signInWithGoogle } from '../../firebase/firebaseAuth';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export default function SignupPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agree: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.name) newErrors.name = 'Full name is required';
    if (!form.email) newErrors.email = 'Email is required';
    if (!form.phone || form.phone.replace(/\D/g, '').length < 10) newErrors.phone = 'Valid phone number is required';
    if (!form.password) newErrors.password = 'Password is required';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!form.agree) newErrors.agree = 'You must agree to terms';

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        setLoading(true);
        await axios.post(`${API_BASE}/auth/signup`, form);
        toast.success('Account created successfully!');
        setTimeout(() => navigate('/admin/signin'), 1500); // 🔁 Redirect to SignIn
      } catch (error) {
        console.error('Signup failed:', error);
        toast.error(error.response?.data?.message || 'Signup failed. Try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const token = await signInWithGoogle();
      await axios.post(`${API_BASE}/auth/google`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Signed in with Google!');
      setTimeout(() => navigate('/admin/dashboard'), 1500); // 🔁 Redirect to Dashboard
    } catch (err) {
      console.error('Google login error:', err);
      toast.error('Google login failed');
    }
  };

  const passwordStrength = zxcvbn(form.password);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <ToastContainer />
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center text-blue-900">Create an Account</h2>
        <p className="text-sm text-gray-600 text-center mb-6">Join us today and get start expanding your business</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input name="name" type="text" value={form.name} onChange={handleChange} placeholder="Enter your full name" className="w-full px-4 py-2 border rounded-lg" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className="w-full px-4 py-2 border rounded-lg" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your 10-digit phone number"
              className="w-full px-4 py-2 border rounded-lg"
              maxLength={10}
              pattern="\d{10}"
              inputMode="numeric"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Create a password" className="w-full px-4 py-2 border rounded-lg" />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            {form.password && (
              <div className="text-xs mt-1">
                <div className={`h-1 rounded ${['bg-red-500', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400', 'bg-green-600'][passwordStrength.score]} w-full`} />
                <p className="mt-1 text-gray-500">Strength: {['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'][passwordStrength.score]}</p>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm your password" className="w-full px-4 py-2 border rounded-lg" />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>
          <div className="flex items-center">
            <input name="agree" type="checkbox" checked={form.agree} onChange={handleChange} className="mr-2" />
            <label className="text-sm">I agree to the <a href="#" className="text-blue-600 underline">Terms of Service</a> and <a href="#" className="text-blue-600 underline">Privacy Policy</a></label>
          </div>
          {errors.agree && <p className="text-red-500 text-sm">{errors.agree}</p>}

          <button type="submit" disabled={loading} className={`w-full py-2 text-white rounded-lg ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-t" />
            <span className="mx-2 text-sm text-gray-500">Or continue with</span>
            <hr className="flex-grow border-t" />
          </div>

          <div className="flex gap-4">
            <button type="button" onClick={handleGoogleLogin} className="flex-1 py-2 border rounded-lg hover:bg-gray-100">Google</button>
            <button type="button" className="flex-1 py-2 border rounded-lg hover:bg-gray-100">Microsoft</button>
          </div>

          <p className="text-center text-sm mt-6">
            Already have an account?{' '}
            <a href="/admin/signin" className="text-blue-600 hover:underline">Sign In</a>
          </p>
        </form>
      </div>
    </div>
  );
}
