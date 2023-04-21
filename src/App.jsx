import React from "react";
import { useSelector } from "react-redux";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import CreatePoll from "./routes/CreatePoll";
import Login from "./routes/Login";
import Polls from "./routes/Polls";
import Root from "./routes/Root";
import Signup from "./routes/Signup";

export function PrivateRoute({ children }) {
    const user = useSelector((state) => state.user.email);
    return user ? children : <Navigate to="/login" replace="true" />;
}

export function LoginCheck({ children }) {
    const user = useSelector((state) => state.user.email);
    return user ? <Navigate to="/polls" replace="true" /> : children;
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: (
                    <PrivateRoute>
                        <Navigate to="/polls" replace="true" />
                    </PrivateRoute>
                ),
            },
            {
                path: "/polls",
                element: (
                    <PrivateRoute>
                        <Polls />
                    </PrivateRoute>
                ),
            },
            {
                path: "/create-poll",
                element: (
                    <PrivateRoute>
                        <CreatePoll />
                    </PrivateRoute>
                ),
            },
            {
                path: "/signup",
                element: (
                    <LoginCheck>
                        <Signup />
                    </LoginCheck>
                ),
            },
            {
                path: "/login",
                element: (
                    <LoginCheck>
                        <Login />
                    </LoginCheck>
                ),
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
