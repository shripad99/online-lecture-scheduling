import { createSlice } from '@reduxjs/toolkit';

const coursesSlice = createSlice({
  name: 'courses',
  initialState: { list: [], loading: false, error: null },
  reducers: {
    setCourses(state, action) {
      state.list = action.payload;
    },
    addCourse(state, action) {
      state.list.push(action.payload);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setCourses, addCourse, setLoading, setError } = coursesSlice.actions;
export default coursesSlice.reducer;