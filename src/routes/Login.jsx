import { Alert, Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateEmail, updateId, updateUsername } from "../redux/user/userSlice";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const onChange = (e) => {
        setValues({ ...values, [e.target.id]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("https://pollhub-backend.onrender.com/auth/login", {
                email: values.email,
                password: values.password,
            });

            localStorage.setItem("token", data.token);
            dispatch(updateId(data._id));
            dispatch(updateUsername(data.username));
            dispatch(updateEmail(data.email));
            setError("");
            navigate("/polls");
        } catch (error) {
            setError(error?.response?.data.error);
        }
    };

    return (
        <Box>
            <Container style={{ marginTop: "13rem" }} maxWidth="xs">
                <Grid container direction="column">
                    <Typography variant="h6">Login</Typography>
                    <form onSubmit={handleLogin}>
                        <Grid item xs={12}>
                            <TextField
                                value={values.email}
                                onChange={onChange}
                                required
                                id="email"
                                label="Email"
                                margin="normal"
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
                        {error && <Alert severity="error">{error}</Alert>}
                        <Grid item xs={12} style={{ marginTop: "10px" }}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Login
                            </Button>
                        </Grid>
                    </form>
                    <Typography textAlign={"center"} fontSize="13px" style={{ marginTop: "7px" }}>
                        Dont have an account?{" "}
                        <Typography component={"span"} fontSize="13px" color="primary">
                            <Link style={{ textDecoration: "none", color: "inherit", fontWeight: "bold" }} to="/signup">
                                Signup here
                            </Link>
                        </Typography>
                    </Typography>
                </Grid>
            </Container>
        </Box>
    );
}

export default Login;
