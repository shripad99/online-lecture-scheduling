import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/register', {
        username,
        email,
        role,
        password,
      });
      const { token, user } = response.data;

      // Store token and user data in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect to login or dashboard based on role
      if (user.role === 'administrator') {
        navigate('/admin');
      } else if (user.role === 'instructor') {
        navigate(`/instructor/${user._id}`);
      }
    } catch (err) {
      setError(err.response?.data || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center mt-16">
      <div className="w-96 border border-gray-400 rounded bg-white px-7 py-10 drop-shadow-md">
        <form onSubmit={handleSubmit}>
          <h4 className="text-2xl mb-7">Sign Up</h4>
          <input
            type="text"
            placeholder="Username"
            className="w-full text-sm bg-transparent border-[1.5px] border-gray-400 px-5 py-3 rounded mb-4 outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full text-sm bg-transparent border-[1.5px] border-gray-400 px-5 py-3 rounded mb-4 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative">
            <select
              value={role}
              onChange={handleRoleChange}
              className="w-full text-sm bg-transparent border-[1.5px] border-gray-400 px-5 py-3 rounded mb-4 outline-none appearance-none pr-10"
              required
            >
              <option value="" disabled>Select Role</option>
              <option value="instructor">Instructor</option>
              <option value="administrator">Administrator</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 bottom-[10px] right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          <input
            type="password"
            placeholder="Password"
            className="w-full text-sm bg-transparent border-[1.5px] border-gray-400 px-5 py-3 rounded mb-4 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
          <button
            type="submit"
            className="w-full text-sm text-white p-2 rounded my-1 bg-green-600"
          >
            Create Account
          </button>
          <p className="text-sm text-center mt-4">
            Already have an account?{' '}
            <Link to="/" className="font-medium text-primary underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;