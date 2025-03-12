import React from 'react';
import InstructorList from './InstructorList';
import AddCourseForm from './AddCourseForm';
import ScheduleLecture from './ScheduleLecture';
import CourseList from './CoursesList';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
          {/* Instructor List Card */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Instructor List</h2>
            <InstructorList />
          </div>

          {/* Add Course Form Card */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Course</h2>
            <AddCourseForm />
          </div>

          {/* Schedule Lecture Card */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Schedule Lecture</h2>
            <ScheduleLecture />
          </div>

          {/* Course List Card */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Course List</h2>
            <CourseList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;