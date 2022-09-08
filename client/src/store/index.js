import { configureStore } from "@reduxjs/toolkit";
import authSlice from './slice/authSlice';
import getTicketSlice from "./slice/ticketSlice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ticket: getTicketSlice.reducer,
    }
})

export default store;