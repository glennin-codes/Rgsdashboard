import {createSlice} from '@reduxjs/toolkit'

const initialState={
  dateSearch:false
} 
const dateRangeSlice=createSlice(
    {
        name:'dateRange',
        initialState,
        reducers:{
            SetDateSearch:(state)=>{
                state.dateSearch=true;
            },
            setDateSearchFalse:(state)=>{
                state.dateSearch=false;
            },
            
        }
    }
);
export const {SetDateSearch,setDateSearchFalse}=dateRangeSlice.actions
export default dateRangeSlice.reducer