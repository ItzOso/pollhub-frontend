import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/user/userSlice";

function Navbar() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.email);

    const handleLogout = () => {
        dispatch(logoutUser());
        localStorage.removeItem("token");
    };
    return (
        <AppBar position="static">
            <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">PollHub</Typography>
                <div style={{ display: "flex", gap: "10px" }}>
                    <Link to="/polls" style={{ color: "inherit", textDecoration: "none" }}>
                        <Button color="inherit">Polls</Button>
                    </Link>
                    <Link to="/create-poll" style={{ color: "inherit", textDecoration: "none" }}>
                        <Button color="inherit">Create Poll</Button>
                    </Link>
                    {user ? (
                        <Button variant="contained" onClick={handleLogout}>
                            Logout
                        </Button>
                    ) : (
                        <Link style={{ color: "inherit", textDecoration: "none" }} to="/login">
                            <Button variant="contained">Login</Button>
                        </Link>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
