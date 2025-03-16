import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCourse } from '../redux/coursesSlice';
import axios from 'axios';

const AddCourseForm = () => {
  const dispatch = useDispatch();
  const [courseData, setCourseData] = useState({ name: '', level: '', description: '', image: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/course', courseData); // Updated endpoint to match your backend
      dispatch(addCourse(response.data));
      setCourseData({ name: '', level: '', description: '', image: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Error adding course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg max-w-md mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Course Name"
                className="w-full text-sm border-[1.5px] px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                value={courseData.name}
                onChange={(e) => setCourseData({ ...courseData, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Level (e.g., Beginner, Advanced)"
                className="w-full text-sm border-[1.5px] px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                value={courseData.level}
                onChange={(e) => setCourseData({ ...courseData, level: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <textarea
                placeholder="Description"
                className="w-full text-sm border-[1.5px] px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-y"
                rows="4"
                value={courseData.description}
                onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Image URL (optional)"
                className="w-full text-sm border-[1.5px] px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                value={courseData.image}
                onChange={(e) => setCourseData({ ...courseData, image: e.target.value })}
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
            <button
              type="submit"
              className={`w-full text-sm text-white p-3 rounded-lg bg-blue-500 hover:bg-blue-600 transition duration-200 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Adding Course...' : 'Add Course'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourseForm;