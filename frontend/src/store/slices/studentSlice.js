import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  students: [],
  currentStudent: null,
  loading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
  pageSize: 10,
  searchQuery: '',
  sortField: 'name',
  sortOrder: 'asc',
  filters: {},
};

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setStudents: (state, action) => {
      state.students = action.payload.students;
      state.totalCount = action.payload.totalCount;
      state.loading = false;
    },
    setCurrentStudent: (state, action) => {
      state.currentStudent = action.payload;
    },
    addStudent: (state, action) => {
      state.students.unshift(action.payload);
      state.totalCount += 1;
    },
    updateStudent: (state, action) => {
      const index = state.students.findIndex(student => student.id === action.payload.id);
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter(student => student.id !== action.payload);
      state.totalCount -= 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setSorting: (state, action) => {
      state.sortField = action.payload.field;
      state.sortOrder = action.payload.order;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
      state.currentPage = 1;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setLoading,
  setStudents,
  setCurrentStudent,
  addStudent,
  updateStudent,
  deleteStudent,
  setCurrentPage,
  setSearchQuery,
  setSorting,
  setFilters,
  setError,
} = studentSlice.actions;

export default studentSlice.reducer;