import React from "react";
import Read from "../components/Read";
import CurrentlyReading from "../components/CurrentlyReading";
import ToRead from "../components/ToRead";
function Container() {
  return (
    <div className=" flex flex-grow mt-6 overflow-auto ">
      <Read />
      <div className=" h-full w-1/2 flex flex-col  ">
        <div className="flex  w-full h-1/3 justify-end ">
          <CurrentlyReading />
        </div>
        <div className="flex w-full h-2/3 justify-end mt-0  ">
          <ToRead />
        </div>
      </div>
    </div>
  );
}

export default Container;
