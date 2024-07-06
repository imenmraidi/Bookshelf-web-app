import { Routes, Route, Router } from "react-router-dom";

import "./App.css";
import ProtectedRoute from "./utils/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Landing from "./pages/Landing";
function App() {
  return (
    <div className="font-roboto-flex">
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="" element={<Landing component={<Login />} />} />
          <Route path="/signup" element={<Landing component={<Signup />} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
