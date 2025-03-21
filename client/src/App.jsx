import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AdminsDashboard from './pages/AdminDashboard'
import InstructorDashboard from './pages/InstructorDashboard'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminsDashboard />} />
        <Route path="/instructor/:id" element={<InstructorDashboard />} />
      </Routes>
    </Router>
  );
};

export default App