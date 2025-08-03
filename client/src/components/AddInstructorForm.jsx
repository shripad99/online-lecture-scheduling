import React, { useState } from 'react';
import axios from 'axios';

const AddInstructorForm = ({ onInstructorAdded }) => {
  const [newInstructor, setNewInstructor] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddInstructor = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('https://online-lecture-scheduling-backend.onrender.com/instructor', newInstructor);
      setNewInstructor({ name: '', email: '' });
      if (onInstructorAdded) onInstructorAdded(response.data); // Callback to refresh list
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add instructor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleAddInstructor} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full text-sm border-[1.5px] px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            value={newInstructor.name}
            onChange={(e) => setNewInstructor({ ...newInstructor, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full text-sm border-[1.5px] px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            value={newInstructor.email}
            onChange={(e) => setNewInstructor({ ...newInstructor, email: e.target.value })}
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full mt-4 text-sm text-white p-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition duration-200 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Instructor'}
        </button>
        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default AddInstructorForm;
