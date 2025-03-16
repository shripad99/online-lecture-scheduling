import { createSlice } from '@reduxjs/toolkit';

const lecturesSlice = createSlice({
  name: 'lectures',
  initialState: { list: [], loading: false, error: null },
  reducers: {
    setLectures(state, action) {
      state.list = action.payload;
    },
    addLecture(state, action) {
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

export const { setLectures, addLecture, setLoading, setError } = lecturesSlice.actions;
export default lecturesSlice.reducer;