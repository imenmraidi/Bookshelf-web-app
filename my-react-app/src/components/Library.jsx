import React from "react";
import Shelf from "./Shelf";
function Library({ booksByShelf, setBooksByShelf }) {
  return (
    <div className="flex flex-grow p-2 overflow-auto">
      <div className="bg-[#BF785E] w-4 rounded-md border-2 border-black shadow-black-2"></div>
      <div className=" flex flex-grow flex-col w-full h-full overflow-y-auto scroll-smooth scrollbar-none pb-4 ">
        {booksByShelf && booksByShelf.map(s => (
          <Shelf shelf={s} key={s.shelf}/>
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
