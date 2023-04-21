import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import pollsReducer from "./polls/pollsSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        polls: pollsReducer,
    },
});
