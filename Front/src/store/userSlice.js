import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userToken: null,
    userInfo: {
        username: "",
        email: "",
        userId: "",
    },
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userInfo = action.payload.user;
            state.userToken = action.payload.token;
        },
        logout: (state) => {
            state.userInfo = {};
            state.userToken = null;
        },
    },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
