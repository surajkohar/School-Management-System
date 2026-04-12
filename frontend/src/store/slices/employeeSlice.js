import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employees: [],
  currentEmployee: null,
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

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setEmployees: (state, action) => {
      state.employees = action.payload.employees;
      state.totalCount = action.payload.totalCount;
      state.loading = false;
    },
    setCurrentEmployee: (state, action) => {
      state.currentEmployee = action.payload;
    },
    addEmployee: (state, action) => {
      state.employees.unshift(action.payload);
      state.totalCount += 1;
    },
    updateEmployee: (state, action) => {
      const index = state.employees.findIndex(employee => employee.id === action.payload.id);
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(employee => employee.id !== action.payload);
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
  setEmployees,
  setCurrentEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  setCurrentPage,
  setSearchQuery,
  setSorting,
  setFilters,
  setError,
} = employeeSlice.actions;

export default employeeSlice.reducer;