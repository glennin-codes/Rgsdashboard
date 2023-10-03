import {createSlice} from '@reduxjs/toolkit';
 const initialState={
    refreshUpdateId:0
 }
 const handleRefreshSlice=createSlice(
    {
        name:'refresh',
        initialState,
        reducers:{
            setRefreshUpdate: (state) => {
                // Use Immer to modify the state
                state.refreshUpdateId += 1;
              },
        }
        
    }
    
    )
    export const {setRefreshUpdate}=handleRefreshSlice.actions;
    export default handleRefreshSlice.reducer;