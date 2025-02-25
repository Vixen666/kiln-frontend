// src/store/translationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import config from '../config';

export const fetchTranslations = createAsyncThunk(
  'translations/fetchTranslations',
  async (_, { rejectWithValue }) => {
    const url = `${config.apiUrl}/api/TranslationService/Get_All`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Network problem while fetching translations.');
    }
  }
);

export const updateTranslation = createAsyncThunk(
  'translations/updateTranslation',
  async ({ field, language, text }, { rejectWithValue }) => {
    const url = `${config.apiUrl}/api/TranslationService/Update`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input_field: field, input_language: language, input_text: text }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      await response.json();
      return { field, language, text };
    } catch (error) {
      return rejectWithValue('Network problem while updating translation.');
    }
  }
);

const getInitialLanguage = () => {
  const savedValue = localStorage.getItem('defaultLanguage');
  return savedValue ? savedValue : 'en';
};

const translationSlice = createSlice({
  name: 'translations',
  initialState: {
    data: [],
    selectedLanguage: getInitialLanguage(), // default language
    status: 'idle',
    error: null,
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
      localStorage.setItem('defaultLanguage', action.payload); // Save to localStorage
    },
    setTranslation: (state, action) => {
      const { field, language, text } = action.payload;
      const translationIndex = state.data.findIndex(
        (t) => t.field === field && t.lang === language
      );
      if (translationIndex >= 0) {
        state.data[translationIndex].text = text;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTranslations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTranslations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchTranslations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateTranslation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTranslation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { field, language, text } = action.payload;
        const translationIndex = state.data.findIndex(
          (t) => t.field === field && t.language === language
        );
        if (translationIndex >= 0) {
          state.data[translationIndex].text = text;
        }
      })
      .addCase(updateTranslation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { changeLanguage, setTranslation } = translationSlice.actions;
export default translationSlice.reducer;
