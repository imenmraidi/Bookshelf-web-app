import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "../node_modules/react-toastify/dist/ReactToastify.css";

import "./App.css";
import ProtectedRoute from "./utils/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
function App() {
  return (
    <div className="font-roboto-flex">
      <Routes>
        <Route path="/login" element={<Landing component={<Login />} />} />
        <Route path="/signup" element={<Landing component={<Signup />} />} />
        <Route path="/" element={<ProtectedRoute />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
