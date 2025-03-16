import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLecture } from '../redux/lecturesSlice';
import axios from 'axios';

const ScheduleLecture = () => {
  const dispatch = useDispatch();
  const instructors = useSelector((state) => state.instructors.list);
  const courses = useSelector((state) => state.courses.list); // Fetch courses from Redux
  const [lectureData, setLectureData] = useState({ courseId: '', instructorId: '', date: '', details: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/lecture', lectureData);
      dispatch(addLecture(response.data));
      console.log("Lecture scheduled", response.data);
      setLectureData({ courseId: '', instructorId: '', date: '', details: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Error scheduling lecture');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container mx-auto px-4">
        <div className="bg-white max-w-md mx-auto py-5">
          <form onSubmit={handleSubmit}>
            {/* Course Selection */}
            <div className="mb-4 relative">
              <select
                value={lectureData.courseId}
                onChange={(e) => setLectureData({ ...lectureData, courseId: e.target.value })}
                className="w-full text-sm border-[1.5px] px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-10"
                required
              >
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.name} ({course.level})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

            {/* Instructor Selection */}
            <div className="mb-4 relative">
              <select
                value={lectureData.instructorId}
                onChange={(e) => setLectureData({ ...lectureData, instructorId: e.target.value })}
                className="w-full text-sm border-[1.5px] px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-10"
                required
              >
                <option value="">Select Instructor</option>
                {instructors.map((inst) => (
                  <option key={inst._id} value={inst._id}>
                    {inst.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

            {/* Date Input */}
            <div className="mb-4">
              <input
                type="date"
                value={lectureData.date}
                onChange={(e) => setLectureData({ ...lectureData, date: e.target.value })}
                className="w-full text-sm border-[1.5px] px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                required
              />
            </div>

            {/* Details Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Details"
                value={lectureData.details}
                onChange={(e) => setLectureData({ ...lectureData, details: e.target.value })}
                className="w-full text-sm border-[1.5px] px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full text-sm text-white p-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition duration-200 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Scheduling...' : 'Schedule'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleLecture;