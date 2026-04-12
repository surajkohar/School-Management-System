import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fees: [],
  feeStructures: [],
  payments: [],
  yearWiseFees: {}, // academicYear -> { studentId -> { class -> feeData } }
  studentFeeHistory: {}, // studentId -> { academicYear -> { class -> [payments] } }
  pendingFees: {}, // studentId -> { academicYear -> [pendingFees] }
  loading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
  pageSize: 10,
};

const feeSlice = createSlice({
  name: 'fees',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setFees: (state, action) => {
      state.fees = action.payload.fees;
      state.totalCount = action.payload.totalCount;
      state.loading = false;
    },
    setFeeStructures: (state, action) => {
      state.feeStructures = action.payload;
    },
    setPayments: (state, action) => {
      state.payments = action.payload;
    },
    
    // Set fee structure for specific academic year and class
    setYearWiseFeeStructure: (state, action) => {
      const { academicYear, classLevel, feeStructure } = action.payload;
      if (!state.yearWiseFees[academicYear]) {
        state.yearWiseFees[academicYear] = {};
      }
      state.yearWiseFees[academicYear][classLevel] = feeStructure;
    },

    // Add payment for specific student, year, and class
    addStudentPayment: (state, action) => {
      const { studentId, academicYear, classLevel, paymentData } = action.payload;
      
      if (!state.studentFeeHistory[studentId]) {
        state.studentFeeHistory[studentId] = {};
      }
      if (!state.studentFeeHistory[studentId][academicYear]) {
        state.studentFeeHistory[studentId][academicYear] = {};
      }
      if (!state.studentFeeHistory[studentId][academicYear][classLevel]) {
        state.studentFeeHistory[studentId][academicYear][classLevel] = [];
      }
      
      state.studentFeeHistory[studentId][academicYear][classLevel].unshift({
        ...paymentData,
        paymentDate: new Date().toISOString(),
        id: Date.now()
      });
    },

    // Set pending fees for student
    setStudentPendingFees: (state, action) => {
      const { studentId, academicYear, pendingFees } = action.payload;
      
      if (!state.pendingFees[studentId]) {
        state.pendingFees[studentId] = {};
      }
      state.pendingFees[studentId][academicYear] = pendingFees;
    },

    // Update fee structure when student is promoted
    updateFeeStructureOnPromotion: (state, action) => {
      const { studentId, fromYear, toYear, fromClass, toClass } = action.payload;
      
      // Get fee structure for new class
      const newFeeStructure = state.yearWiseFees[toYear]?.[toClass];
      
      if (newFeeStructure) {
        // Initialize fee history for new year/class if not exists
        if (!state.studentFeeHistory[studentId]) {
          state.studentFeeHistory[studentId] = {};
        }
        if (!state.studentFeeHistory[studentId][toYear]) {
          state.studentFeeHistory[studentId][toYear] = {};
        }
        if (!state.studentFeeHistory[studentId][toYear][toClass]) {
          state.studentFeeHistory[studentId][toYear][toClass] = [];
        }

        // Set pending fees for new class (typically admission fee is waived for promoted students)
        const pendingFees = [
          {
            id: Date.now(),
            feeType: 'Monthly Fee',
            month: 'April ' + toYear,
            totalAmount: newFeeStructure.monthlyFee,
            dueDate: new Date(toYear, 3, 5).toISOString(), // April 5th
            status: 'Pending'
          }
        ];

        if (!state.pendingFees[studentId]) {
          state.pendingFees[studentId] = {};
        }
        state.pendingFees[studentId][toYear] = pendingFees;
      }
    },

    // Get complete fee history for a student
    getStudentFeeHistory: (state, action) => {
      const { studentId } = action.payload;
      return {
        feeHistory: state.studentFeeHistory[studentId] || {},
        pendingFees: state.pendingFees[studentId] || {}
      };
    },

    // Calculate total fees for student across all years
    calculateStudentTotalFees: (state, action) => {
      const { studentId } = action.payload;
      const studentHistory = state.studentFeeHistory[studentId] || {};
      const studentPending = state.pendingFees[studentId] || {};
      
      let totalPaid = 0;
      let totalDue = 0;
      let totalDiscount = 0;

      // Calculate paid amounts
      Object.values(studentHistory).forEach(yearData => {
        Object.values(yearData).forEach(classData => {
          classData.forEach(payment => {
            totalPaid += payment.paidAmount || 0;
            totalDiscount += payment.discount || 0;
          });
        });
      });

      // Calculate due amounts
      Object.values(studentPending).forEach(yearPending => {
        yearPending.forEach(fee => {
          totalDue += fee.totalAmount || 0;
        });
      });

      return { totalPaid, totalDue, totalDiscount };
    },

    addPayment: (state, action) => {
      state.payments.unshift(action.payload);
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
  setFees,
  setFeeStructures,
  setPayments,
  setYearWiseFeeStructure,
  addStudentPayment,
  setStudentPendingFees,
  updateFeeStructureOnPromotion,
  getStudentFeeHistory,
  calculateStudentTotalFees,
  addPayment,
  setCurrentPage,
  setError,
} = feeSlice.actions;

export default feeSlice.reducer;