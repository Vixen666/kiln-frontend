// src/store/burnSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../config";

export const fetchAllBurns = createAsyncThunk(
  "burn/fetchAllBurns",
  async (_, { rejectWithValue }) => {
    const url = `${config.apiUrl}/api/BurnService/Get_All`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue("Network problem while fetching burns.");
    }
  }
);


export const fetchBurnTemperature = createAsyncThunk(
  "burn/fetchBurnTemperature",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const { burnId, temperatureData } = state.burn.data.selected;
    const latestSequence =
      temperatureData.length > 0
        ? temperatureData[temperatureData.length - 1].sequence
        : 0; // Default value if no data is present

    const url = `${config.apiUrl}/api/BurnTemperatureService/Get_By_Burn_And_Seq?burn_id_input=${burnId}&sequence_input=${latestSequence}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      data.reverse();

      // Iterate through the array and adjust the time values
      for (let i = 0; i < data.length - 1; i++) {
        data[i].time = data[i].time - data[i + 1].time;
      }

      // Restore original order
      data.reverse();
      return data;
    } catch (error) {
      return rejectWithValue(
        "Network problem while fetching burn temperature."
      );
    }
  }
);

export const fetchTemplateData = createAsyncThunk(
    'burn/fetchTemplateData',
    async (_, { getState, rejectWithValue }) => {
      const state = getState();
      const burnId = state.burn.data.selected.burnId;
      
      if (!burnId) {
        return rejectWithValue('No template ID found in selected burn.');
      }
  
      const url = `${config.apiUrl}/api/BurnCurveService/Get_Curve_By_Id?p_burn_id=${burnId}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue('Network problem while fetching template data.');
      }
    }
  );

  export const fetchBurnLogs = createAsyncThunk(
    'burn/fetchLogsById',
    async (_, { getState, rejectWithValue }) => {
      const state = getState();
      const burnId = state.burn.data.selected.burnId;
      
      if (!burnId) {
        return rejectWithValue('No burn ID found in selected burn.');
      }
  
      const url = `${config.apiUrl}/api/TemplateCurveService/Get_By_Id?p_burn_id=${burnId}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue('Network problem while fetching template data.');
      }
    }
  );
  
  const burnSlice = createSlice({
    name: 'burn',
    initialState: {
      data: { 
        burns: [], 
        selected: { 
          burnId: null, 
          templateId: null, 
          templateData: [], 
          templateDataFetched: false,
          temperatureData: [], 
          temperatureDataFetched: false, 
          logs: []
        } 
      },
      status: 'idle',
      error: null,
    },
    reducers: {
      selectBurn: (state, action) => {
        const selectedBurn = state.data.burns.find(burn => burn.burn_id === action.payload);
        if (selectedBurn && state.data.selected.burnId !== action.payload) {
          state.data.selected = { 
            burnId: action.payload, 
            templateId: selectedBurn.template_id, 
            templateData: [], 
            templateDataFetched: false,
            temperatureData: [], 
            temperatureDataFetched: false,
            parameters: selectedBurn,
          };
        }
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllBurns.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchAllBurns.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.data.burns = action.payload;
        })
        .addCase(fetchAllBurns.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })
        .addCase(fetchBurnTemperature.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchBurnTemperature.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.data.selected.temperatureData = [...state.data.selected.temperatureData, ...action.payload];
          state.data.selected.temperatureDataFetched = true;
        })
        .addCase(fetchBurnTemperature.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })
        .addCase(fetchTemplateData.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchTemplateData.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.data.selected.templateData = action.payload;
          state.data.selected.templateDataFetched = true;
        })
        .addCase(fetchTemplateData.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })
        .addCase(fetchBurnLogs.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchBurnLogs.fulfilled, (state, action) => {
          state.data.selected.logs = action.payload;
          state.status = 'succeeded';
        })
        .addCase(fetchBurnLogs.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
  });
  
  export const { selectBurn } = burnSlice.actions;
  export default burnSlice.reducer;
  