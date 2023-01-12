import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userToken: null,
    userInfo: {},
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userInfo = action.payload.userInfo;
            state.userToken = action.payload.token;
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
