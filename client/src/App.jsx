import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AdminsDashboard from './pages/AdminDashboard'
import InstructorDashboard from './pages/InstructorDashboard'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
  return (
    <Router>
    <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminsDashboard />} />
        <Route path="/instructor/:id" element={<InstructorDashboard />} />
      </Routes>
    </Router>
  )
}

export default App