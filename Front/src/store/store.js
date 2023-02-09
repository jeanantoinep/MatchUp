import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import eventReducer from "./eventSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        event: eventReducer,
    },
});
