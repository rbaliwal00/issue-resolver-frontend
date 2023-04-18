import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IssueState{
    id: number;
}

const initialState:IssueState = {
    id: 0
};

const issueslice = createSlice({
    name: 'issue',      
    initialState,        
    reducers:{
        settingIssueId(state, action: PayloadAction<number>){
            state.id = action.payload;
        },
    }         
});

export const {settingIssueId} = issueslice.actions;

export default issueslice.reducer;