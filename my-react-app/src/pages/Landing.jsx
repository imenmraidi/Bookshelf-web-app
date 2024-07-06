import React from "react";
import Header from "../components/Header";

function Landing({ component }) {
  return (
    <div className="bg-bg-1 m-0 p-10 min-h-screen w-screen flex flex-col">
      <Header />
      <div className="flex flex-col mt-10 md:flex-row">
        <div className="w-1/3 flex flex-col m-6">
          <h1 className="text-4xl ml-2">Bookshelf</h1>
          <div
            className="rounded-tl-3xl rounded-bl-3xl rounded-br-3xl
             bg-bg-2 border-2 border-black shadow-black--2 mt-6 p-6 text-lg
          "
          >
            <p>
              Welcome to Bookshelf ! your virtual library where you can organize
              you books in a very interactive and funny way !
            </p>
          </div>
        </div>
        <div className="w-2/3 ml-20 mt-6 mr-10">{component}</div>
      </div>
    </div>
  );
}

export default Landing;
