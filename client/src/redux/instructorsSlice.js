import { createSlice } from '@reduxjs/toolkit';

const instructorsSlice = createSlice({
  name: 'instructors',
  initialState: { list: [], loading: false, error: null },
  reducers: {
    setInstructors(state, action) {
      state.list = action.payload;
    },
    addInstructor(state, action) {
      state.list.push(action.payload); // Add the new instructor to the list
    },
    updateInstructor(state, action) {
      const updatedInstructor = action.payload;
      const index = state.list.findIndex((inst) => inst._id === updatedInstructor._id);
      if (index !== -1) {
        state.list[index] = updatedInstructor; // Update the instructor in the list
      }
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setInstructors, addInstructor, updateInstructor, setLoading, setError } = instructorsSlice.actions;
export default instructorsSlice.reducer;