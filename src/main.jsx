import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./redux/index";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#7c4dff",
        },
        secondary: {
            main: "#26a69a",
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Provider store={store}>
              <App />
            </Provider>
        </ThemeProvider>
    </React.StrictMode>
);
