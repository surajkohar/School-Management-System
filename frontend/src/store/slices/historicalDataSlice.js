import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  studentHistory: {}, // studentId -> { academicYear -> { class, section, fees, results, etc } }
  feeHistory: {}, // studentId -> { academicYear -> { class -> [monthly fees] } }
  resultHistory: {}, // studentId -> { academicYear -> { class -> [exam results] } }
  promotionHistory: {}, // studentId -> [promotion records]
  academicYearData: {}, // academicYear -> { students, classes, fee_structures }
  loading: false,
  error: null,
};

const historicalDataSlice = createSlice({
  name: 'historicalData',
  initialState,
  reducers: {
    // Add complete student historical data when importing old records
    addStudentHistoricalData: (state, action) => {
      const { studentId, academicYear, data } = action.payload;
      if (!state.studentHistory[studentId]) {
        state.studentHistory[studentId] = {};
      }
      state.studentHistory[studentId][academicYear] = {
        ...data,
        importedAt: new Date().toISOString()
      };
    },

    // Add fee historical data for specific class and academic year
    addFeeHistoricalData: (state, action) => {
      const { studentId, academicYear, classLevel, feeData } = action.payload;
      if (!state.feeHistory[studentId]) {
        state.feeHistory[studentId] = {};
      }
      if (!state.feeHistory[studentId][academicYear]) {
        state.feeHistory[studentId][academicYear] = {};
      }
      if (!state.feeHistory[studentId][academicYear][classLevel]) {
        state.feeHistory[studentId][academicYear][classLevel] = [];
      }
      state.feeHistory[studentId][academicYear][classLevel].push({
        ...feeData,
        recordedAt: new Date().toISOString()
      });
    },

    // Add result historical data for specific class and academic year
    addResultHistoricalData: (state, action) => {
      const { studentId, academicYear, classLevel, results } = action.payload;
      if (!state.resultHistory[studentId]) {
        state.resultHistory[studentId] = {};
      }
      if (!state.resultHistory[studentId][academicYear]) {
        state.resultHistory[studentId][academicYear] = {};
      }
      if (!state.resultHistory[studentId][academicYear][classLevel]) {
        state.resultHistory[studentId][academicYear][classLevel] = [];
      }
      state.resultHistory[studentId][academicYear][classLevel].push({
        ...results,
        recordedAt: new Date().toISOString()
      });
    },

    // Record student promotion from one class to another
    addPromotionRecord: (state, action) => {
      const { studentId, promotionData } = action.payload;
      if (!state.promotionHistory[studentId]) {
        state.promotionHistory[studentId] = [];
      }
      state.promotionHistory[studentId].push({
        ...promotionData,
        promotionDate: new Date().toISOString()
      });
    },

    // Bulk import historical data (for schools migrating to the system)
    bulkImportHistoricalData: (state, action) => {
      const { type, data } = action.payload;
      switch (type) {
        case 'students':
          Object.keys(data).forEach(studentId => {
            if (!state.studentHistory[studentId]) {
              state.studentHistory[studentId] = {};
            }
            state.studentHistory[studentId] = { ...state.studentHistory[studentId], ...data[studentId] };
          });
          break;
        case 'fees':
          Object.keys(data).forEach(studentId => {
            if (!state.feeHistory[studentId]) {
              state.feeHistory[studentId] = {};
            }
            state.feeHistory[studentId] = { ...state.feeHistory[studentId], ...data[studentId] };
          });
          break;
        case 'results':
          Object.keys(data).forEach(studentId => {
            if (!state.resultHistory[studentId]) {
              state.resultHistory[studentId] = {};
            }
            state.resultHistory[studentId] = { ...state.resultHistory[studentId], ...data[studentId] };
          });
          break;
      }
    },

    // Set academic year specific data
    setAcademicYearData: (state, action) => {
      const { academicYear, data } = action.payload;
      state.academicYearData[academicYear] = data;
    },

    // Get student's complete journey across all years
    getStudentJourney: (state, action) => {
      const { studentId } = action.payload;
      return {
        personalHistory: state.studentHistory[studentId] || {},
        feeHistory: state.feeHistory[studentId] || {},
        resultHistory: state.resultHistory[studentId] || {},
        promotionHistory: state.promotionHistory[studentId] || []
      };
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
  addStudentHistoricalData,
  addFeeHistoricalData,
  addResultHistoricalData,
  addPromotionRecord,
  bulkImportHistoricalData,
  setAcademicYearData,
  getStudentJourney,
  setLoading,
  setError,
} = historicalDataSlice.actions;

export default historicalDataSlice.reducer;