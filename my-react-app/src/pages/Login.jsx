import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { googleLogin, localLogin } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { useEffect } from "react";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    const action = await dispatch(localLogin(data));
    if (localLogin.rejected.match(action)) {
      console.log(action.payload);
      toast.error(
        action.payload.response.status === 500
          ? "une erreur s'est prosuite essayez ultérieurement"
          : action.payload.response.data,
        {
          position: "top-right",
        }
      );
    } else {
      navigate("/", {
        replace: true,
      });
    }
  };

  const googleLog = useGoogleLogin({
    onSuccess: async token => {
      const action = await dispatch(googleLogin(token));
      if (googleLogin.rejected.match(action)) {
        console.log(action.payload);
        toast.error(
          action.payload.response.status === 500
            ? "une erreur s'est prosuite essayez ultérieurement"
            : action.payload.response.data,
          {
            position: "top-right",
          }
        );
      } else {
        navigate("/", {
          replace: true,
        });
      }
    },
  });
  return (
    <div
      className="rounded-tr-3xl rounded-bl-3xl rounded-br-3xl
             bg-[#FFD787] border-2 border-black shadow-black-2
             p-10 text-lg ml-20 flex flex-col items-center justify-center "
    >
      <h1 className="text-3xl mb-2">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Email"
          type="text"
          {...register("email", { required: true })}
          className={`input-login bg-[#FFEAB9]  shadow-yellowish-6 focus:shadow-yellowish-4 
            ${errors.email ? "text-red-700 border-red-700 border-2" : ""}`}
        />
        <input
          placeholder="Password"
          type="password"
          {...register("password", { required: true })}
          className={`input-login bg-[#FFEAB9] shadow-orange-6 focus:shadow-orange-4 
          ${errors.password ? "text-red-700 border-red-700 border-2" : ""}`}
        />
        <button
          type="submit"
          className="bg-[#FEB92E]  border-[#3D3D3D]  shadow-grey-6  text-white  p-2 mt-10
      border-2 w-full h-12 max-w-[32rem] transform flex items-center justify-center
      active:shadow-grey-2 active:translate-y-1 active:translate-x-1 transition duration-200"
        >
          Continue
          {loading && (
            <lord-icon
              src="https://cdn.lordicon.com/gkryirhd.json"
              trigger="loop"
              state="loop-snake-alt"
              class="size-8 ml-4"
              colors="primary:#ffffff"
            ></lord-icon>
          )}
        </button>
      </form>
      <h3 className="text-[#646867] mt-6 transform hover:scale-110 transition duration-300">
        Not register yet?{" "}
        <Link to="/signup">
          <span className="text-[#F5854E] font-bold hover:text-[#ff8244] ">
            {" "}
            Signup
          </span>
        </Link>
      </h3>
      <button
        className=" bg-[#FFEAB9]  w-1/2 shadow-orange-6 p-2 border-2 border-black h-12 transform 
        active:shadow-orange-2 active:translate-y-1 active:translate-x-1 transition duration-200 mt-6
        "
        onClick={() => {
          googleLog();
        }}
      >
        {loading && (
          <lord-icon
            src="https://cdn.lordicon.com/gkryirhd.json"
            trigger="loop"
            state="loop-snake-alt"
            class="size-8 ml-4"
            colors="primary:#ffffff"
          ></lord-icon>
        )}
        Continue in with Google 🚀
      </button>
    </div>
  );
}

export default Login;
