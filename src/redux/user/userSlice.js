import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: "",
    username: "",
    email: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateId: (state, action) => {
            state._id = action.payload;
        },
        updateUsername: (state, action) => {
            state.username = action.payload
        },
        updateEmail: (state, action) => {
            state.email = action.payload;
        },
        logoutUser: (state) => {
            state._id = "";
            state.email = "";
        },
    },
});

export const { updateId, updateUsername, updateEmail, logoutUser } = userSlice.actions;
export default userSlice.reducer;
