import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../redux/slices/authSlice";
import useAxios from "../utils/useAxios";

function TopBar({ addBook }) {
  const api = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await api.post("http://localhost:3001/api/auth/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      console.log(response);
      dispatch(clearUser());
      navigate("/");
    } catch (err) {
      console.error("Failed to log out:", err);
    }
  };
  return (
    <div className=" h-20 flex justify-between items-center p-4 ">
      <div className="flex space-x-4">
        <div
          className="bg-beige p-2 shadow-black-2 border-2 border-black 
      rounded-md "
        >
          immy's bookshelf
        </div>
        <div
          className="bg-orange-100 p-2 shadow-black-2 border-2 border-black 
      rounded-md "
        >
          +100
        </div>
        <div
          className="bg-orange-100 p-2 shadow-black-2 border-2 border-black 
      rounded-md "
        >
          +200
        </div>
        <button
          className="bg-[#A4D985] rounded-md border-2
        border-black shadow-black-2 flex justify-center items-center p-1
        active:shadow-none active:translate-y-0.5 active:translate-x-0.5 transform transition duration-200"
          onClick={addBook}
        >
          <lord-icon
            src="https://cdn.lordicon.com/zyzoecaw.json"
            trigger="morph"
            state="morph-book"
            class="size-8"
          ></lord-icon>
        </button>
      </div>
      <div>
        <button
          className="bg-beige rounded-md border-2
        border-black shadow-black-2 flex justify-center items-center p-1
        active:shadow-none active:translate-y-0.5 active:translate-x-0.5 transform transition duration-200"
          onClick={handleLogout}
        >
          logout
        </button>
      </div>
    </div>
  );
}

export default TopBar;
