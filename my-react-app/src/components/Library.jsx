import React from "react";
import Shelf from "./Shelf";
function Library({ booksByShelf, setBooksByShelf }) {
  return (
    <div className="flex h-full w-full overflow-auto p-2">
      <div className="bg-[#BF785E] w-4 rounded-md border-2 border-black shadow-black-2"></div>
      <div className="  flex flex-grow flex-col h-full overflow-y-auto overflow-auto scroll-smooth scrollbar-none pb-4 ">
        {booksByShelf.map(s => (
          <Shelf shelf={s} key={s._id}/>
        ))}
      </div>
      <div
        className="bg-[#BF785E] w-4 rounded-md border-2
     border-black shadow-black-2"
      ></div>
    </div>
  );
}

export default Library;
