import { Routes, Route } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import * as jwt_decode from "jwt-decode";
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
