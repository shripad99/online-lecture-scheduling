import { configureStore } from '@reduxjs/toolkit';
import instructorsReducer from './instructorsSlice';
import coursesReducer from './coursesSlice';
import lecturesReducer from './lecturesSlice';
import authReducer from './authSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    instructors: instructorsReducer,
    courses: coursesReducer,
    lectures: lecturesReducer,
    auth: authReducer,
    user : userReducer,
  },
});