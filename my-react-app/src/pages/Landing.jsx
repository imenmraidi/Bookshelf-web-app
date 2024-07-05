import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Login from "./Login";
function Landing() {
  const location = useLocation();
  const showLogin = location.pathname === "/";
  const showSignup = location.pathname === "/signup";

  return (
    <div className="bg-bg-1 m-0 p-10 min-h-screen w-screen flex flex-col">
      <Header />
      <div className="flex mt-10">
        <div className="w-1/3 flex flex-col m-6">
          {/* Left content */}
          <h1 className="text-4xl ml-2">Bookshelf</h1>
          <div
            className="rounded-tl-3xl rounded-bl-3xl rounded-br-3xl
             bg-bg-2 border-2 border-black shadow-black--2
             mt-6 p-6 text-lg
             
          "
          >
            <p>
              Welcome to Bookshelf ! your virtual library where you can organize
              you books in a very interactive and funny way !
            </p>
          </div>
        </div>
        <div className="w-2/3 ml-20 mt-6 mr-10">
        {showLogin && <Login/> }
        {/* {showSignup && <Signup/> } */}

        </div>
      </div>
    </div>
  );
}

export default Landing;
