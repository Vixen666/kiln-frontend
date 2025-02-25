// src/store/scheduleSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import config from '../config';

// Async thunk to handle the API call
export const startReal = createAsyncThunk(
    'schedule/startReal',
    async (_, { getState, rejectWithValue }) => {
      const state = getState();
      const burnId = state.burn.data.selected.burnId;
      console.log('burnId:', burnId)
      const url = `${config.apiUrl}/start_real`;
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ burn_id: burnId }),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

export const stopReal = createAsyncThunk(
    'schedule/stopReal',
    async (burn_id, { rejectWithValue }) => {
      const url = `${config.apiUrl}/stop_real`;
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ burn_id }),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(startReal.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(startReal.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Handle successful start if needed
      })
      .addCase(startReal.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default scheduleSlice.reducer;
