import { Alert, Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Signup() {
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const onChange = (e) => {
        setValues({ ...values, [e.target.id]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post("https://pollhub-backend.onrender.com/auth/signup", {
                username: values.username,
                email: values.email,
                password: values.password,
            });

            console.log(result);
            setError("");
        } catch (error) {
            setError(error?.response?.data.error);
        }
    };

    return (
        <Box>
            <Container style={{ marginTop: "13rem" }} maxWidth="xs">
                <Grid container direction="column">
                    <Typography variant="h6">Sign Up</Typography>
                    <form onSubmit={handleSignup}>
                        <Grid item xs={12}>
                            <TextField
                                value={values.username}
                                onChange={onChange}
                                required
                                id="username"
                                label="Username"
                                margin="normal"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={values.email}
                                onChange={onChange}
                                required
                                id="email"
                                label="Email"
                                margin="dense"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={values.password}
                                onChange={onChange}
                                required
                                id="password"
                                label="Password"
                                type="password"
                                margin="dense"
                                fullWidth
                            />
                        </Grid>
                        {error && (
                            <Alert severity="error" margin="normal">
                                {error}
                            </Alert>
                        )}
                        <Grid item xs={12} style={{ marginTop: "10px" }}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Sign Up
                            </Button>
                        </Grid>
                    </form>

                    <Typography textAlign={"center"} fontSize="13px" style={{ marginTop: "7px" }}>
                        Already signed up?{" "}
                        <Typography component={"span"} fontSize="13px" color="primary">
                            <Link style={{ textDecoration: "none", color: "inherit", fontWeight: "bold" }} to="/login">
                                Login here
                            </Link>
                        </Typography>
                    </Typography>
                </Grid>
            </Container>
        </Box>
    );
}

export default Signup;
