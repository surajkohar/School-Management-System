import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice.js';
import studentSlice from './slices/studentSlice.js';
import employeeSlice from './slices/employeeSlice.js';
import feeSlice from './slices/feeSlice.js';
import examSlice from './slices/examSlice.js';
import settingsSlice from './slices/settingsSlice.js';
import historicalDataSlice from './slices/historicalDataSlice.js';
import academicSlice from './slices/academicSlice.js';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    students: studentSlice,
    employees: employeeSlice,
    fees: feeSlice,
    exams: examSlice,
    settings: settingsSlice,
    historicalData: historicalDataSlice,
    academic: academicSlice,
  },
});