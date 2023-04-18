import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState{
    username: string | null;
    auth: boolean;
}

const initialState:UserState = {
    username: null,
    auth: false,
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
    }         
});

export const {auth, saveUsername} = userslice.actions;

export default userslice.reducer;