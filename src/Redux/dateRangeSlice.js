import {createSlice} from '@reduxjs/toolkit'

const initialState={
    startDate:null,
    endDate:null
} 
const dateRangeSlice=createSlice(
    {
        name:'dateRange',
        initialState,
        reducers:{
            setStartDate:(state,action)=>{
                state.startDate=action.payload;
            },
            setEndDate:(state,action)=>{
                state.startDate=action.payload;

            }
        }
    }
);
export const {setStartDate,setEndDate}=dateRangeSlice.actions
export default dateRangeSlice.reducer