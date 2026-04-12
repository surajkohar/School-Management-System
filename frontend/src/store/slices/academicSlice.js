import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  academicYears: ['2021-22', '2022-23', '2023-24', '2024-25'],
  currentAcademicYear: '2024-25',
  studentPromotions: [],
  classTransitions: {}, // Track student movements between classes
  yearWiseStudents: {}, // academicYear -> { class -> [students] }
  
  // Subject management
  subjectsByClass: {
    '1': ['English', 'Nepali', 'Mathematics', 'Science', 'Social Studies', 'Health Education', 'Art'],
    '2': ['English', 'Nepali', 'Mathematics', 'Science', 'Social Studies', 'Health Education', 'Art'],
    '3': ['English', 'Nepali', 'Mathematics', 'Science', 'Social Studies', 'Health Education', 'Art'],
    '4': ['English', 'Nepali', 'Mathematics', 'Science', 'Social Studies', 'Health Education', 'Art'],
    '5': ['English', 'Nepali', 'Mathematics', 'Science', 'Social Studies', 'Health Education', 'Art'],
    '6': ['English', 'Nepali', 'Mathematics', 'Science', 'Social Studies', 'Health Education', 'Computer Science'],
    '7': ['English', 'Nepali', 'Mathematics', 'Science', 'Social Studies', 'Health Education', 'Computer Science'],
    '8': ['English', 'Nepali', 'Mathematics', 'Science', 'Social Studies', 'Health Education', 'Computer Science'],
    '9': ['English', 'Nepali', 'Mathematics', 'Science', 'Social Studies', 'Health Education', 'Computer Science', 'Optional Mathematics'],
    '10': ['English', 'Nepali', 'Mathematics', 'Science', 'Social Studies', 'Health Education', 'Computer Science', 'Optional Mathematics'],
    '11': ['English', 'Nepali', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Economics', 'Accountancy'],
    '12': ['English', 'Nepali', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Economics', 'Accountancy']
  },
  
  // Year-wise subject assignments for students
  studentSubjects: {}, // studentId -> { academicYear -> { class -> [subjects] } }
  
  // Subject changes tracking
  subjectChanges: {}, // studentId -> [{ fromYear, toYear, fromClass, toClass, addedSubjects, removedSubjects }]
  
  loading: false,
  error: null,
};

const academicSlice = createSlice({
  name: 'academic',
  initialState,
  reducers: {
    setAcademicYears: (state, action) => {
      state.academicYears = action.payload;
    },
    setCurrentAcademicYear: (state, action) => {
      state.currentAcademicYear = action.payload;
    },
    
    // Set subjects for a specific class
    setSubjectsForClass: (state, action) => {
      const { classLevel, subjects } = action.payload;
      state.subjectsByClass[classLevel] = subjects;
    },
    
    // Set student subjects for specific academic year and class
    setStudentSubjects: (state, action) => {
      const { studentId, academicYear, classLevel, subjects } = action.payload;
      
      if (!state.studentSubjects[studentId]) {
        state.studentSubjects[studentId] = {};
      }
      if (!state.studentSubjects[studentId][academicYear]) {
        state.studentSubjects[studentId][academicYear] = {};
      }
      
      state.studentSubjects[studentId][academicYear][classLevel] = subjects;
    },
    
    // Update student subjects (for mid-year changes)
    updateStudentSubjects: (state, action) => {
      const { studentId, academicYear, classLevel, subjects, reason } = action.payload;
      
      // Store the old subjects for tracking changes
      const oldSubjects = state.studentSubjects[studentId]?.[academicYear]?.[classLevel] || [];
      
      // Update subjects
      if (!state.studentSubjects[studentId]) {
        state.studentSubjects[studentId] = {};
      }
      if (!state.studentSubjects[studentId][academicYear]) {
        state.studentSubjects[studentId][academicYear] = {};
      }
      
      state.studentSubjects[studentId][academicYear][classLevel] = subjects;
      
      // Track changes
      const addedSubjects = subjects.filter(s => !oldSubjects.includes(s));
      const removedSubjects = oldSubjects.filter(s => !subjects.includes(s));
      
      if (addedSubjects.length > 0 || removedSubjects.length > 0) {
        if (!state.subjectChanges[studentId]) {
          state.subjectChanges[studentId] = [];
        }
        
        state.subjectChanges[studentId].push({
          academicYear,
          classLevel,
          addedSubjects,
          removedSubjects,
          reason: reason || 'Manual Update',
          changeDate: new Date().toISOString()
        });
      }
    },
    
    // Promote students from one class to another
    promoteStudents: (state, action) => {
      const { students, fromClass, toClass, fromAcademicYear, toAcademicYear } = action.payload;
      
      students.forEach(student => {
        const promotionRecord = {
          studentId: student.id,
          fromClass,
          toClass,
          fromAcademicYear,
          toAcademicYear,
          promotionDate: new Date().toISOString(),
          status: 'Promoted',
          remarks: `Promoted from Class ${fromClass} to Class ${toClass}`
        };
        
        state.studentPromotions.push(promotionRecord);
        
        // Track class transitions
        if (!state.classTransitions[student.id]) {
          state.classTransitions[student.id] = [];
        }
        state.classTransitions[student.id].push(promotionRecord);
        
        // Auto-assign subjects for new class
        const newClassSubjects = state.subjectsByClass[toClass] || [];
        const oldClassSubjects = state.studentSubjects[student.id]?.[fromAcademicYear]?.[fromClass] || [];
        
        // Set subjects for new academic year and class
        if (!state.studentSubjects[student.id]) {
          state.studentSubjects[student.id] = {};
        }
        if (!state.studentSubjects[student.id][toAcademicYear]) {
          state.studentSubjects[student.id][toAcademicYear] = {};
        }
        
        state.studentSubjects[student.id][toAcademicYear][toClass] = newClassSubjects;
        
        // Track subject changes due to promotion
        const addedSubjects = newClassSubjects.filter(s => !oldClassSubjects.includes(s));
        const removedSubjects = oldClassSubjects.filter(s => !newClassSubjects.includes(s));
        
        if (addedSubjects.length > 0 || removedSubjects.length > 0) {
          if (!state.subjectChanges[student.id]) {
            state.subjectChanges[student.id] = [];
          }
          
          state.subjectChanges[student.id].push({
            fromYear: fromAcademicYear,
            toYear: toAcademicYear,
            fromClass,
            toClass,
            addedSubjects,
            removedSubjects,
            reason: 'Promotion',
            changeDate: new Date().toISOString()
          });
        }
      });
    },

    // Set year-wise student distribution
    setYearWiseStudents: (state, action) => {
      const { academicYear, classWiseStudents } = action.payload;
      state.yearWiseStudents[academicYear] = classWiseStudents;
    },

    // Add student to specific academic year and class
    addStudentToYear: (state, action) => {
      const { studentId, academicYear, classLevel, studentData, subjects } = action.payload;
      
      if (!state.yearWiseStudents[academicYear]) {
        state.yearWiseStudents[academicYear] = {};
      }
      if (!state.yearWiseStudents[academicYear][classLevel]) {
        state.yearWiseStudents[academicYear][classLevel] = [];
      }
      
      state.yearWiseStudents[academicYear][classLevel].push({
        ...studentData,
        addedAt: new Date().toISOString()
      });
      
      // Set subjects for the student
      if (subjects) {
        if (!state.studentSubjects[studentId]) {
          state.studentSubjects[studentId] = {};
        }
        if (!state.studentSubjects[studentId][academicYear]) {
          state.studentSubjects[studentId][academicYear] = {};
        }
        state.studentSubjects[studentId][academicYear][classLevel] = subjects;
      }
    },

    // Transfer student between classes within same academic year
    transferStudent: (state, action) => {
      const { studentId, fromClass, toClass, academicYear, reason } = action.payload;
      
      const transferRecord = {
        studentId,
        fromClass,
        toClass,
        academicYear,
        transferDate: new Date().toISOString(),
        reason,
        type: 'Transfer'
      };
      
      state.studentPromotions.push(transferRecord);
      
      if (!state.classTransitions[studentId]) {
        state.classTransitions[studentId] = [];
      }
      state.classTransitions[studentId].push(transferRecord);
      
      // Update subjects for transferred class
      const newClassSubjects = state.subjectsByClass[toClass] || [];
      const oldClassSubjects = state.studentSubjects[studentId]?.[academicYear]?.[fromClass] || [];
      
      if (!state.studentSubjects[studentId]) {
        state.studentSubjects[studentId] = {};
      }
      if (!state.studentSubjects[studentId][academicYear]) {
        state.studentSubjects[studentId][academicYear] = {};
      }
      
      state.studentSubjects[studentId][academicYear][toClass] = newClassSubjects;
      
      // Track subject changes due to transfer
      const addedSubjects = newClassSubjects.filter(s => !oldClassSubjects.includes(s));
      const removedSubjects = oldClassSubjects.filter(s => !newClassSubjects.includes(s));
      
      if (addedSubjects.length > 0 || removedSubjects.length > 0) {
        if (!state.subjectChanges[studentId]) {
          state.subjectChanges[studentId] = [];
        }
        
        state.subjectChanges[studentId].push({
          academicYear,
          fromClass,
          toClass,
          addedSubjects,
          removedSubjects,
          reason: `Transfer: ${reason}`,
          changeDate: new Date().toISOString()
        });
      }
    },
    
    // Get student's complete subject history
    getStudentSubjectHistory: (state, action) => {
      const { studentId } = action.payload;
      return {
        subjects: state.studentSubjects[studentId] || {},
        changes: state.subjectChanges[studentId] || []
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
  setAcademicYears,
  setCurrentAcademicYear,
  setSubjectsForClass,
  setStudentSubjects,
  updateStudentSubjects,
  promoteStudents,
  setYearWiseStudents,
  addStudentToYear,
  transferStudent,
  getStudentSubjectHistory,
  setLoading,
  setError,
} = academicSlice.actions;

export default academicSlice.reducer;