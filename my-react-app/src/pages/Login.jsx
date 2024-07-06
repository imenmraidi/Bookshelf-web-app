import { Routes, Route, Link } from "react-router-dom";
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
             pr-32 pl-32 pt-10 pb-10 text-lg ml-20 flex flex-col items-center justify-center "
    >
      <h1 className="text-3xl mb-6">Login</h1>
      <input
      placeholder="Email"
        type="text"
        className="bg-[#FFEAB9] border-2 border-black w-full shadow-yellowish-6 h-12 p-4
      mt-6 focus:outline-none"
      />
      <input
      placeholder="Password"
        type="text"
        className="bg-[#FFEAB9] border-2 border-black w-full shadow-orange-6 h-12 p-4
      mt-6 focus:outline-none"
      />
      <button
        className="bg-[#FEB92E] border-2 border-[#3D3D3D] w-full shadow-grey-6 h-12 p-2
      mt-6 text-white"
      >
        Continue
      </button>
      <h3 className="text-[#646867] mt-5">
        Not register yet?{" "}
        <Link to="/signup">
          <span className="text-[#F5854E] font-bold">Signup</span>
        </Link>
      </h3>
      <button
        className=" bg-[#FFEAB9] border-2 border-black w-1/2 shadow-orange-6 h-12 p-2
      mt-6"
        onClick={() => {}}
      >
        Continue in with Google 🚀
      </button>
    </div>
  );
}

export default Login;
