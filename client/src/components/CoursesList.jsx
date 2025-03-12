import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCourses, setLoading, setError } from '../redux/coursesSlice';
import axios from 'axios';

const CourseList = () => {
  const dispatch = useDispatch();
  const { list: courses, loading, error } = useSelector((state) => state.courses);

  useEffect(() => {
    const fetchCourses = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get('http://localhost:3000/course');
        dispatch(setCourses(response.data));
        dispatch(setError(null));
      } catch (err) {
        dispatch(setError('Failed to fetch courses'));
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchCourses();
  }, [dispatch]);

  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Course List</h2>
          {loading && !courses.length ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : courses.length > 0 ? (
            <ul className="space-y-4">
              {courses.map((course) => (
                <li
                  key={course._id}
                  className="bg-gray-50 p-4 rounded-lg shadow-md flex justify-between items-center hover:bg-gray-100 transition duration-200"
                >
                  <span>
                    {course.name} - {course.level} (Start Date: {new Date(course.startDate).toLocaleDateString()})
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No courses found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseList;