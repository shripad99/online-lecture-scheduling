import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInstructors, addInstructor, updateInstructor, setLoading, setError } from '../redux/instructorsSlice';
import axios from 'axios';

const InstructorList = () => {
  const dispatch = useDispatch();
  const { list: instructors, loading, error } = useSelector((state) => state.instructors);
  const [newInstructor, setNewInstructor] = useState({ name: '', email: '' });
  const [editInstructor, setEditInstructor] = useState(null);

  useEffect(() => {
    const fetchInstructors = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get('http://localhost:3000/instructor');
        dispatch(setInstructors(response.data));
        dispatch(setError(null));
      } catch (err) {
        dispatch(setError('Failed to fetch instructors'));
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchInstructors();
  }, [dispatch]);

  

  const handleEditInstructor = (instructor) => {
    setEditInstructor({ ...instructor });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editInstructor) return;
    dispatch(setLoading(true));
    try {
      const response = await axios.put(`http://localhost:3000/instructor/${editInstructor._id}`, editInstructor);
      dispatch(updateInstructor(response.data));
      setEditInstructor(null);
      dispatch(setError(null));
    } catch (err) {
      dispatch(setError(err.response?.data?.error || 'Failed to update instructor'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-lg rounded-lg p-6 mx-auto max-w-full">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-left">Instructors</h2>
          {/* Instructor List */}
          {loading && !instructors.length ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <ul className="space-y-4">
              {instructors.length > 0 ? (
                instructors.map((instructor) => (
                  <li
                    key={instructor._id}
                    className="bg-gray-50 p-4 rounded-lg shadow-md flex justify-between items-center hover:bg-gray-100 transition duration-200"
                  >
                    {editInstructor && editInstructor._id === instructor._id ? (
                      <form onSubmit={handleSaveEdit} className="w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            value={editInstructor.name}
                            onChange={(e) => setEditInstructor({ ...editInstructor, name: e.target.value })}
                            className="w-full text-sm border-[1.5px] px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                          <input
                            type="email"
                            value={editInstructor.email}
                            onChange={(e) => setEditInstructor({ ...editInstructor, email: e.target.value })}
                            className="w-full text-sm border-[1.5px] px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                          <button
                            type="submit"
                            className={`text-sm text-white p-2 rounded-lg bg-green-500 hover:bg-green-600 transition duration-200 ${
                              loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            disabled={loading}
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditInstructor(null)}
                            className="text-sm text-white p-2 rounded-lg bg-red-500 hover:bg-red-600 transition duration-200"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <span>
                          {instructor.name} - {instructor.email}
                        </span>
                        <button
                          onClick={() => handleEditInstructor(instructor)}
                          className="text-sm text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-lg transition duration-200"
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </li>
                ))
              ) : (
                <p className="text-center text-gray-500">No instructors found.</p>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorList;