import { Routes, Route, Router } from "react-router-dom";

import "./App.css";
import ProtectedRoute from "./utils/ProtectedRoute";
import Login from "./pages/Login";
function App() {
  return (
    <div className="font-roboto-flex">
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/" element={<ProtectedRoute />} />
      </Routes>
    </div>
  );
}

export default App;
