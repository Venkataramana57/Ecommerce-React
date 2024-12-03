import React, { useContext, useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../slices/authSlice';
import { AlertContext } from '../../providers/AlertProvider';
import { AuthContext } from '../../providers/AuthProvider';

const Login: React.FC = () => {
  const openSnackbar = useContext(AlertContext) as (message: string, severity: 'success' | 'error' | 'warning') => void;
  const { isUserLoggedIn } = useContext(AuthContext) as { isUserLoggedIn: boolean };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isUserLoggedIn) {
        openSnackbar('Your session is already active!', 'warning');
        navigate('/');
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [isUserLoggedIn, openSnackbar, navigate]);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async (): Promise<void> => {
    if (!email.length || !password.length) {
      openSnackbar('Please enter email and password', 'error');
      return;
    }
    try {
      const result = await window.apiClient.post('login', { email, password });
      if (result.status === 201 && !result.data.error) {
        dispatch(login(result.data));
        openSnackbar('Login successful!', 'success');
        navigate('/');
      } else {
        openSnackbar('Invalid credentials', 'error');
      }
    } catch (error: any) {
      const errMsg = error.response?.data?.message || 'An error occurred';
      openSnackbar(errMsg, 'error');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
        <p className="mt-4 text-sm text-center text-gray-600">
          <span>Don't have an account?</span> 
          <RouterLink to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </RouterLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
