import React from "react";
import Read from "../components/Read";
function Container() {
  return (
    <div
      className=" flex flex-grow mt-6 flex-col 
      md:flex-row md:space-x-4 h-full overflow-auto"
    >
      <Read />
      <div className="w-full h-full md:w-1/2 p-4 bg-gray-300"></div>
    </div>
  );
}

export default Container;
