import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userEvents: [],
    otherEvents: [],
    event: null,
};

export const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        setEvents: (state, action) => {
            state.userEvents = action.payload.userEvents;
            state.otherEvents = action.payload.otherEvents;
        },
        setEvent: (state, action) => {
            state.event = action.payload.event;
        },
    },
});

export const { setEvents, setEvent } = eventSlice.actions;

export default eventSlice.reducer;
