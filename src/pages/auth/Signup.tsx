import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertContext } from '../../providers/AlertProvider';

interface Form {
  name: string;
  email: string;
  password: string;
  role: string;
}

const Signup: React.FC = () => {
  const openSnackbar = useContext(AlertContext) as (message: string, severity: 'success' | 'error' | 'info' | 'warning') => void;
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Form>({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setValidation = (): boolean => {
    let isValid = true;
    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      isValid = false;
      openSnackbar('All fields are required!', 'error');
    }
    return isValid;
  };

  const handleSignup = async (): Promise<void> => {
    const isFormValid = setValidation();
    if (!isFormValid) return;

    try {
      const result = await window.apiClient.post('signup', formData);
      if (result.status === 201 && !result.data.error) {
        openSnackbar('Signup successful!', 'success');
        navigate('/login');
      } else {
        openSnackbar('Signup failed!', 'error');
      }
    } catch (error: any) {
      const errMsg = error.response?.data?.message || 'An error occurred';
      openSnackbar(errMsg, 'error');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select a role</option>
              <option value="retailer">Retailer</option>
              <option value="customer">Customer</option>
            </select>
          </div>
          <button
            type="button"
            onClick={handleSignup}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
