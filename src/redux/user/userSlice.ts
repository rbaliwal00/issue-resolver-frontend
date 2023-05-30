import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState{
    username: string | null;
    auth: boolean | string | null;
    role: string | null;
}

const initialState:UserState = {
    username: localStorage.getItem('username'),
    auth: localStorage.getItem('user-details'),
    role: localStorage.getItem('user-role')
};

const userslice = createSlice({
    name: 'user',      
    initialState,        
    reducers:{
        auth(state, action: PayloadAction<boolean>){
            state.auth = action.payload;
        },
        saveUsername(state, action: PayloadAction<string | null>){
            state.username = action.payload;
        },
        saveRole(state, action: PayloadAction<string | null>){
            state.role = action.payload;
        }
    }         
});

export const {auth, saveUsername, saveRole} = userslice.actions;

export default userslice.reducer;