import { Routes, Route } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import * as jwt_decode from "jwt-decode";
import { useGoogleLogin } from "@react-oauth/google";
function Login() {
  const login = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
  });
  return (
    <div
      className="rounded-tr-3xl rounded-bl-3xl rounded-br-3xl
             bg-[#FFD787] border-2 border-black shadow-black-2
             p-8 text-lg ml-20 flex flex-col items-center justify-center "
    >
      <h1 className="text-3xl ">Login</h1>
      <input type="text" />
      <input type="text" />
      
      <button className=" " onClick={() => login()}>
        Sign in with Google 🚀
      </button>
    </div>
  );
}

export default Login;
