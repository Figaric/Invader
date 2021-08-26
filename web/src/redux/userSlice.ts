import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "userId",
    initialState: {
        userId: 0
    },
    reducers: {
        setUserId: (state, action: PayloadAction<number>) => {
            state.userId = action.payload;
        }
    }
});