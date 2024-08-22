import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AuthForm = ({ isLogin }) => {
  const [isCompany, setIsCompany] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', companyName: '', username: '' });
  const { setAuthState } = useContext(AuthContext); // Get the setter for auth state from context
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    setIsCompany(!isCompany);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = { ...form, isCompany };
      const { data } = await axios.post(url, payload);

      // Store token in localStorage
      localStorage.setItem('token', data.token);

      const user = isCompany
        ? { name: form.companyName, role: 'company' }
        : { name: form.username, role: 'medical practitioner' };

      // Store user information in localStorage
      if (isCompany) {
        localStorage.setItem('companyName', form.companyName);
        localStorage.removeItem('username');
      } else {
        localStorage.setItem('username', form.username);
        localStorage.removeItem('companyName');
      }

      // Update global auth state
      setAuthState(user);

      // Navigate to the relevant dashboard
      navigate('/homepage');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-center text-2xl font-bold mb-6">
          {isLogin ? 'Login' : 'Register'} as {isCompany ? 'Company' : 'User'}
        </h2>
        <div className="flex justify-center mb-4">
          <span className="mr-2">User</span>
          <button
            onClick={handleToggle}
            className={`relative inline-flex items-center h-6 rounded-full w-11 ${isCompany ? 'bg-blue-600' : 'bg-gray-300'}`}
          >
            <span className="sr-only">Toggle Company</span>
            <span
              className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isCompany ? 'translate-x-6' : 'translate-x-1'}`}
            />
          </button>
          <span className="ml-2">Company</span>
        </div>
        <form onSubmit={handleSubmit}>
          {isCompany && !isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700">Company Name</label>
              <input
                name="companyName"
                onChange={handleChange}
                value={form.companyName}
                type="text"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>
          )}
          {!isCompany && !isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                name="username"
                onChange={handleChange}
                value={form.username}
                type="text"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              name="email"
              onChange={handleChange}
              value={form.email}
              type="email"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              name="password"
              onChange={handleChange}
              value={form.password}
              type="password"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <button
          onClick={() => navigate(isLogin ? '/register' : '/login')}
          className="mt-4 w-full text-center text-blue-600 hover:underline"
        >
          {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
}

export default AuthForm;
