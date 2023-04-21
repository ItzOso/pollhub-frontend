import { Box, Button, Card, CardActions, CardContent, Snackbar, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removePoll, votePoll } from "../redux/polls/pollsSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
const Poll = ({ poll }) => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [voted, setVoted] = useState({ voted: false, index: null });

    useEffect(() => {
        // checks if user has voted on it and set voted so that correct button is outlined on load
        poll.options.forEach((option, index) => {
            option.voters.forEach((voter) => {
                if (voter === user._id) {
                    setVoted({ voted: true, index });
                }
            });
        });
    }, []);

    let totalVotes = 0;
    poll?.options.forEach((option) => {
        totalVotes += option.votes;
    });

    const isOwner = () => {
        if (poll.createdBy === user._id) return true;
        return false;
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.delete(`https://pollhub-backend.onrender.com/api/polls/${poll._id}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            dispatch(removePoll(poll._id));
        } catch (error) {
            console.log(error);
        }
    };

    const handleVote = async (index) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `https://pollhub-backend.onrender.com/api/polls/${poll._id}`,
                { index },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
            dispatch(votePoll({ pollId: poll._id, optionIndex: index, voterId: user._id }));
            setVoted({ voted: true, index });
        } catch (error) {
            console.log(error);
            const status = Number(error?.response?.status);
            if (status === 404) {
                toast.error("The poll you tried voting on was deleted by the user! :(");
                dispatch(removePoll(poll._id));
            } else if (status === 403) {
                toast.error("Already voted on this poll!");
            }
        }
    };
    return (
        <Card>
            <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        {poll?.username}
                    </Typography>
                    {isOwner() && (
                        <Button
                            onClick={handleDelete}
                            sx={{ padding: "2px", fontSize: "12px" }}
                            color="error"
                            variant="contained">
                            delete
                        </Button>
                    )}
                </Stack>
                <Typography variant="subtitle1">{poll?.question}</Typography>
                <CardActions>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
                        {poll?.options.map((option, index) => (
                            <Button
                                onClick={() => handleVote(index)}
                                key={option._id}
                                variant={voted.voted && voted.index === index ? "outlined" : "contained"}
                                sx={{ display: "flex", justifyContent: "space-between" }}>
                                <span>{option?.text}</span>
                                <span>{option?.votes}</span>
                            </Button>
                        ))}
                    </Box>
                </CardActions>
                <Typography alignSelf={"flex-end"} variant="body" color="text.secondary">
                    total votes: {totalVotes}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Poll;
