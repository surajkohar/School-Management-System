import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: localStorage.getItem('theme') || 'light',
  schoolInfo: {
    name: 'Modern School Management System',
    address: 'Kathmandu, Nepal',
    phone: '+977-1-4567890',
    email: 'info@modernschool.edu.np',
    logo: null,
  },
  emailSettings: {
    smtp_host: '',
    smtp_port: 587,
    smtp_username: '',
    smtp_password: '',
  },
  academicYear: '2024-2025',
  calendarType: 'nepal', // nepal or india
  loading: false,
  error: null,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
      document.documentElement.setAttribute('data-theme', action.payload);
    },
    setSchoolInfo: (state, action) => {
      state.schoolInfo = { ...state.schoolInfo, ...action.payload };
    },
    setEmailSettings: (state, action) => {
      state.emailSettings = { ...state.emailSettings, ...action.payload };
    },
    setAcademicYear: (state, action) => {
      state.academicYear = action.payload;
    },
    setCalendarType: (state, action) => {
      state.calendarType = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setTheme,
  setSchoolInfo,
  setEmailSettings,
  setAcademicYear,
  setCalendarType,
  setLoading,
  setError,
} = settingsSlice.actions;

export default settingsSlice.reducer;