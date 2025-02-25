import { createSlice } from '@reduxjs/toolkit';

// Function to get the initial value from localStorage or default to 'YES'
const getInitialShowHelpFields = () => {
  const savedValue = localStorage.getItem('showHelpFields');
  return savedValue ? savedValue : 'YES';
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    showHelpFields: getInitialShowHelpFields(), // Retrieve initial value from localStorage
  },
  reducers: {
    setShowHelpFields: (state, action) => {
      state.showHelpFields = action.payload;
      localStorage.setItem('showHelpFields', action.payload); // Save to localStorage
    },
  },
});

export const { setShowHelpFields } = settingsSlice.actions;
export default settingsSlice.reducer;
