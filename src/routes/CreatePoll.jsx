import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPoll } from "../redux/polls/pollsSlice";

function CreatePoll() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [question, setQuestion] = useState("");
    const [optionFields, setOptionFields] = useState([""]);
    const [error, setError] = useState("");

    const handleFormChange = (index, e) => {
        let data = [...optionFields];
        data[index] = e.target.value;
        setOptionFields(data);
    };

    const addOption = () => {
        if (optionFields.length >= 6) {
            setError("Cannnot have more then 6 options");
        } else {
            setError("");
            let newfield = "";
            setOptionFields([...optionFields, newfield]);
        }
    };

    const removeOption = (index) => {
        setError("");

        let data = [...optionFields];
        data.splice(index, 1);
        setOptionFields(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!question) return setError("Must not leave question blank.");
        let fields = optionFields.filter((option) => option !== "");
        if (fields.length < 2) return setError("Must have at least 2 options!");
        try {
            const token = localStorage.getItem("token");
            const data = {
                question,
                options: optionFields,
            };
            const { data: createdPoll } = await axios.post("https://pollhub-backend.onrender.com/api/polls", data, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            dispatch(addPoll(createdPoll));

            navigate("/polls");
        } catch (error) {
            setError(error?.response?.data.error);
        }
    };
    return (
        <Container maxWidth="md">
            <Grid container direction="column">
                <Typography variant="h6" marginTop={2}>
                    Create a Poll
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <Grid item xs={12}>
                        <TextField
                            name="question"
                            placeholder="Question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            required
                            id="question"
                            label="Question"
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                    {optionFields.map((input, index) => {
                        return (
                            <Grid
                                item
                                xs={12}
                                key={index}
                                sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "16px" }}>
                                <TextField
                                    name="option"
                                    placeholder="Option"
                                    value={input}
                                    onChange={(e) => handleFormChange(index, e)}
                                    id="option"
                                    label="Option"
                                    margin="dense"
                                    fullWidth
                                />
                                <Button onClick={() => removeOption(index)}>REMOVE</Button>
                            </Grid>
                        );
                    })}
                    <Button sx={{ marginTop: "16px" }} onClick={addOption} variant="outlined" fullWidth>
                        Add more..
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        size="large"
                        type="submit"
                        variant="contained"
                        sx={{ marginTop: "16px" }}
                        fullWidth>
                        SUBMIT
                    </Button>
                </form>
            </Grid>
        </Container>
    );
}

export default CreatePoll;
