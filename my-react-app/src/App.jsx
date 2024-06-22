import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { GoogleLogin } from "@react-oauth/google";
import * as jwt_decode from "jwt-decode";
import { useGoogleLogin } from "@react-oauth/google";
import "./App.css";
function App() {
  const login = useGoogleLogin({
  onSuccess: tokenResponse => console.log(tokenResponse),
});
  return (
    <div className="App">
      <button onClick={() => login()}>Sign in with Google 🚀</button>
    </div>
  );
}

export default App;
