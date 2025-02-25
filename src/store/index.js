// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import ovenReducer from './ovenSlice';
import burnTemperatureSlice from './burnSlice';
import templateReducer  from './templateSlice';
import { fetchTranslations } from './translationSlice';
import translationSlice from './translationSlice';
import settingsReducer from './settingsSlice';

const store = configureStore({
  reducer: {
    oven: ovenReducer,
    burn: burnTemperatureSlice,
    template: templateReducer,
    translations: translationSlice,
    settings: settingsReducer
  },
});
store.dispatch(fetchTranslations());
export default store;