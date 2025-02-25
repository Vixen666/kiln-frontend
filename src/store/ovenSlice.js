// src/store/ovenSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import config from '../config';

export const fetchOvens = createAsyncThunk(
  'oven/fetchOvens',
  async (_, { rejectWithValue }) => {
    const url = `${config.apiUrl}/api/OvenService/Get_All`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      let data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Network problem while fetching ovens.');
    }
  }
);

export const saveOven = createAsyncThunk(
  'oven/saveOven',
  async (oven, { rejectWithValue }) => {
    console.log('saveOven thunk dispatched');
    const url = `${config.apiUrl}/api/OvenService/Save`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(oven),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue('Network problem while saving oven.');
    }
  }
);

const ovenSlice = createSlice({
  name: 'oven',
  initialState: {
    ovens: [],
    selectedOven: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    selectOven: (state, action) => {
      state.selectedOven = action.payload;
    },
    newOven: (state) => {
      state.selectedOven = {oven_id: null,
        name: null,
        max_temp_positive: null,
        max_temp_negative: null,
        location: null,
        power: null,
        thermometer_type: null,
        thermometer_pin: null,
        burner_pin: null,
        thermocouple_type: null,
        gpio_sensor_cs: null,
        gpio_sensor_clock: null,
        gpio_sensor_data: null,
        gpio_sensor_di: null,
        gpio_cool: null,
        gpio_hatchet: null,
        gpio_heat: null,
        gpio_failsafe: null,
        sensor_time_wait: null,
        pid_kp: null,
        pid_ki: null,
        pid_kd: null,
        temp_scale: null,
        emergency_shutoff_temp: null,
        kiln_must_catch_up: null,
        pid_control_window: null,
        thermocouple_offset: null,
        temperature_average_samples: null,
        ac_freq_50hz: null,
        automatic_restarts: null,
        automatic_restart_window: null,
        simulate: null,
        sim_t_env: null,
        sim_c_heat: null,
        sim_c_oven: null,
        sim_p_heat: null,
        sim_R_o_nocool: null,
        sim_R_o_cool: null,
        sim_R_ho_noair: null,
        sim_R_ho_air: null,
        kwh_rate: null,
        currency_type: null,
        kw_elements: null,
        hatchet_mode: null};
    },
    updateOvenField: (state, action) => {
      const { field, value } = action.payload;
      if (state.selectedOven) {
        state.selectedOven[field] = value;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOvens.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOvens.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.ovens = action.payload;
      })
      .addCase(fetchOvens.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(saveOven.pending, (state) => {
        state.status = 'loading';
        console.log('saveOven pending');
      })
      .addCase(saveOven.fulfilled, (state, action) => {
        
        // Optionally, handle the state update after save
      })
      .addCase(saveOven.rejected, (state, action) => {
        console.log('saveOven rejected');
        state.error = action.payload;
      });
  },
});

export const { selectOven, newOven, updateOvenField } = ovenSlice.actions;
export default ovenSlice.reducer;
