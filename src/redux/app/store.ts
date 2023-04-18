import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../user/userSlice';
import issueReducer from '../issue/issueSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        issue: issueReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;



