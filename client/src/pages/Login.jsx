import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://online-lecture-scheduling-backend.onrender.com/auth/login', { username, password });
      const { token, user } = response.data;

      // Store token and user data in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Dispatch login action to update Redux state
      dispatch(login.fulfilled({ token, user }));

      // Redirect based on role
      if (user.role === 'administrator') {
        navigate('/admin');
      } else if (user.role === 'instructor') {
        navigate(`/instructor/${user._id}`);
      }
    } catch (err) {
      setError(err.response?.data || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center mt-16">
      <div className="w-96 border border-gray-400 rounded bg-white px-7 py-10 drop-shadow-md">
        <form onSubmit={handleSubmit}>
          <h4 className="text-2xl mb-7">Login</h4>
          <input
            type="text"
            placeholder="Username"
            className="w-full text-sm bg-transparent border-[1.5px] border-gray-400 px-5 py-3 rounded mb-4 outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full text-sm bg-transparent border-[1.5px] border-gray-400 px-5 py-3 rounded mb-4 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
          <button type="submit" className="w-full text-sm text-white p-2 rounded my-1 bg-green-600" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <p className="text-sm text-center mt-4">
            Not registered yet?{' '}
            <Link to="/register" className="font-medium text-primary underline">
              Create an Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
