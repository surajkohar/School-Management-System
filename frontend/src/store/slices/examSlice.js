import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  exams: [],
  examResults: [],
  loading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
  pageSize: 10,
};

const examSlice = createSlice({
  name: 'exams',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setExams: (state, action) => {
      state.exams = action.payload.exams;
      state.totalCount = action.payload.totalCount;
      state.loading = false;
    },
    setExamResults: (state, action) => {
      state.examResults = action.payload;
    },
    addExam: (state, action) => {
      state.exams.unshift(action.payload);
      state.totalCount += 1;
    },
    updateExam: (state, action) => {
      const index = state.exams.findIndex(exam => exam.id === action.payload.id);
      if (index !== -1) {
        state.exams[index] = action.payload;
      }
    },
    deleteExam: (state, action) => {
      state.exams = state.exams.filter(exam => exam.id !== action.payload);
      state.totalCount -= 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setLoading,
  setExams,
  setExamResults,
  addExam,
  updateExam,
  deleteExam,
  setCurrentPage,
  setError,
} = examSlice.actions;

export default examSlice.reducer;