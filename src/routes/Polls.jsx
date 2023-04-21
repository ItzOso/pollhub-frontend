import { Box, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Poll from "../components/Poll";
import { getPolls } from "../redux/polls/pollsSlice";
function Polls() {
    const polls = useSelector((state) => state.polls);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchPolls = async () => {
            const token = localStorage.getItem("token");
            try {
                const { data } = await axios.get("https://pollhub-backend.onrender.com/api/polls", {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });
                dispatch(getPolls(data));
            } catch (error) {
                console.log(error);
            }
        };
        fetchPolls();
    }, []);
    return (
        <Box sx={{ width: "100vw", padding: "16px" }}>
            <Grid container spacing={2}>
                {polls?.map((poll) => (
                    <Grid key={poll._id} item xs={12} sm={6} lg={4} xl={3}>
                        <Poll poll={poll} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default Polls;
