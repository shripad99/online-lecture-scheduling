import React, { useState } from 'react';
import InstructorList from './InstructorList';
import AddCourseForm from './AddCourseForm';
import ScheduleLecture from './ScheduleLecture';
import CourseList from './CoursesList';
import AddInstructorForm from './AddInstructorForm';

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [modalState, setModalState] = useState({
    addInstructor: false,
    addCourse: false,
    scheduleLecture: false,
  });
  const [refreshKey, setRefreshKey] = useState(0); // To trigger InstructorList refresh

  const openModal = (modalName) => {
    setModalState(prev => ({
      ...prev,
      [modalName]: true
    }));
  };

  const closeModal = (modalName) => {
    setModalState(prev => ({
      ...prev,
      [modalName]: false
    }));
  };

  const handleInstructorAdded = () => {
    setRefreshKey(prev => prev + 1); // Trigger refresh
    closeModal('addInstructor'); // Close modal on success
  };

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div className='flex justify-between'>
        <h1 className="text-3xl font-normal text-center text-gray-800 mb-10">Dashboard</h1>
        
        {/* Buttons Section */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
          <button
            onClick={() => openModal('addInstructor')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Add Instructor
          </button>
          <button
            onClick={() => openModal('addCourse')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Add Course
          </button>
          <button
            onClick={() => openModal('scheduleLecture')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Schedule Lecture
          </button>
        </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
          <div>
            <InstructorList key={refreshKey} />
          </div>

          <div>
            <CourseList />
          </div>
        </div>

        {/* Modals */}
        <Modal
          isOpen={modalState.addInstructor}
          onClose={() => closeModal('addInstructor')}
          title="Add Instructor"
        >
          <AddInstructorForm onInstructorAdded={handleInstructorAdded} />
        </Modal>

        <Modal
          isOpen={modalState.addCourse}
          onClose={() => closeModal('addCourse')}
          title="Add Course"
        >
          <AddCourseForm />
        </Modal>

        <Modal
          isOpen={modalState.scheduleLecture}
          onClose={() => closeModal('scheduleLecture')}
          title="Schedule Lecture"
        >
          <ScheduleLecture />
        </Modal>
      </div>
    </div>
  );
};

export default AdminDashboard;