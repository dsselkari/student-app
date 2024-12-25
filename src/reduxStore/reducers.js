import { createSlice } from '@reduxjs/toolkit'
const studentSlice = createSlice({
    name: 'students',
    initialState: { studentsData: [] },
    reducers: {
        studentsAdd(state, action) {
            state.studentsData.push(action.payload);
        },
        studentsUpdate(state, action) {
            const studentId = action.payload.studentId
            const students = state.studentsData
            state.studentsData=   students.map((student) => {
                if (student?.studentId == studentId) {
                    return {
                        ...action.payload
                    }
                }else{
                    return student
                }
            })
        },


    },
})

export const { studentsAdd, studentsUpdate } = studentSlice.actions
export const students = studentSlice.reducer