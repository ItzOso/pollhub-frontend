import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";
import axios from "axios";
import { logoutUser, updateEmail, updateId } from "../redux/user/userSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Root() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error?.response?.status === 401) {
                localStorage.removeItem("token");
                dispatch(logoutUser());
                toast.error("Server requested for you to login again");
                navigate("/login");
            } else {
                return Promise.reject(error);
            }
        }
    );

    useEffect(() => {
        const authenticateUser = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const { data } = await axios.get("https://pollhub-backend.onrender.com/auth/verifytoken", {
                        headers: {
                            authorization: `Bearer ${token}`,
                        },
                    });
                    dispatch(updateId(data._id));
                    dispatch(updateEmail(data.email));
                    navigate("/polls");
                } catch (error) {
                    if (Number(error?.response?.status) === 401) {
                        localStorage.removeItem("token");
                    } else {
                        console.log(error);
                    }
                }
            }
        };
        authenticateUser();
    }, []);
    return (
        <div>
            <Box>
                <Navbar />
            </Box>
            <Box>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
                <Outlet />
            </Box>
        </div>
    );
}

export default Root;
