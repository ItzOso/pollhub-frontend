import { createSlice } from "@reduxjs/toolkit";

const initialState = []



const pollsSlice = createSlice({
    name: "polls",
    initialState,
    reducers: {
        getPolls: (state, action) => {
            return action.payload
        },
        addPoll: (state, action) => {
            state.push(action.payload);
        },
        votePoll: (state, action) => {
            const { pollId, optionIndex, voterId } = action.payload;
            const pollIndex = state.findIndex((poll) => poll._id === pollId);
            const option = state[pollIndex].options[optionIndex];
            if (!option.voters.includes(voterId)) {
                state[pollIndex].options[optionIndex].votes += 1;
                state[pollIndex].options[optionIndex].voters.push(voterId);
            }
        },
        removePoll: (state, action) => {
            const pollIndex = state.findIndex((poll) => poll._id === action.payload);
            if (pollIndex !== -1) {
                state.splice(pollIndex, 1);
            }
            // state.filter(poll => poll._id === action.payload)
        },
    },
});

export const {  getPolls, addPoll, votePoll, removePoll } = pollsSlice.actions;

export default pollsSlice.reducer;
