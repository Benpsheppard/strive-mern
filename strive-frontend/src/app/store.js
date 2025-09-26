import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.js';
import workoutReducer from '../features/workouts/workoutsSlice.js';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        workout: workoutReducer
    }
});