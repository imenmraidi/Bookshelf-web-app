import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CustomNavigate } from "./utils/CustomNavigate";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <Provider store={store}>
          <CustomNavigate />
          <App />
        </Provider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
