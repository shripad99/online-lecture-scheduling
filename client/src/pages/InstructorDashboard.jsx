import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setLectures, setLoading, setError } from '../redux/lecturesSlice';
import axios from 'axios';

const InstructorDashboard = () => {
  const { id } = useParams(); // Instructor ID from the URL
  const dispatch = useDispatch();
  const { list: lectures, loading, error } = useSelector((state) => state.lectures);

  useEffect(() => {
    const fetchLectures = async () => {
      dispatch(setLoading(true));
      console.log('Fetching lectures for instructorId:', id); // Debug log
      try {
        const response = await axios.get(`http://localhost:3000/lecture`, {
          params: { instructorId: id }, // Use query parameter
        });
        console.log('API Response:', response.data); // Debug log
        dispatch(setLectures(response.data));
        dispatch(setError(null));
      } catch (err) {
        console.log('API Error:', err); // Debug log
        dispatch(setError('Failed to fetch lectures'));
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchLectures();
  }, [id, dispatch]);

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-normal text-center text-gray-800 mb-8">Instructor Dashboard</h1>
        <div className="bg-white shadow-lg rounded-lg p-6">
          {loading && !lectures.length ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="py-3 px-4 border-b">Course Name</th>
                  <th className="py-3 px-4 border-b">Date</th>
                  <th className="py-3 px-4 border-b">Details</th>
                </tr>
              </thead>
              <tbody>
                {lectures.length > 0 ? (
                  lectures.map((lecture) => (
                    <tr
                      key={lecture._id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="py-3 px-4 border-b">
                        {lecture.courseId && lecture.courseId.name
                          ? lecture.courseId.name
                          : lecture.courseId || 'N/A'}
                      </td>
                      <td className="py-3 px-4 border-b">
                        {new Date(lecture.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 border-b">{lecture.details || 'N/A'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="py-3 px-4 text-center text-gray-500">
                      No lectures assigned.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;