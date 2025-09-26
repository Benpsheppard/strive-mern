// workoutsSlice.js

// Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import workoutsService from './workoutsService'

// Initial state
const initialState = {
  workouts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new workout
export const createWorkout = createAsyncThunk('workouts/create', async (workoutData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await workoutsService.createWorkout(workoutData, token)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) 
      || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user workouts
export const getWorkouts = createAsyncThunk('workouts/getAll', async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await workoutsService.getWorkouts(token)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) 
      || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user workout
export const deleteWorkout = createAsyncThunk('workouts/delete', async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await workoutsService.deleteWorkout(id, token)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) 
      || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Add exercise to workout
export const addExercise = createAsyncThunk('workouts/addExercise', async ({ workoutId, exercise }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await workoutsService.addExercise(workoutId, exercise, token);
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) 
      || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
);


// Workouts Slice
export const workoutsSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createWorkout.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createWorkout.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.workouts.push(action.payload)
      })
      .addCase(createWorkout.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getWorkouts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getWorkouts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.workouts = action.payload
      })
      .addCase(getWorkouts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteWorkout.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteWorkout.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.workouts = state.workouts.filter(
          (workout) => workout._id !== action.payload.id
        )
      })
      .addCase(deleteWorkout.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(addExercise.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addExercise.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        const updatedWorkout = action.payload
        state.workouts = state.workouts.map((workout) =>
          workout._id === updatedWorkout._id ? updatedWorkout : workout
        )
      })
      .addCase(addExercise.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = workoutsSlice.actions
export default workoutsSlice.reducer