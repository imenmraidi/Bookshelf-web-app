import React from "react";
import Book from "./Book";
function Shelf({ shelf,status }) {
  return (
    <div className="flex flex-col w-full py-1.5  ">
      <div className="flex flex-col  w-full  px-5 ">
       { status!=="C"&&
        <h2 className="italic font-light ">{shelf.shelf}</h2>}
        <div className="flex space-x-4  w-full overflow-x-auto scrollbar-none scroll-smooth  py-3   ">
          {shelf.books.map(b => (
            <Book key={b._id} book={b}/>
          ))}
        </div>
      </div>
      <div className="min-h-3 bg-beige border-black border-t-2 border-b-2" />
    </div>
  );
}

export default Shelf;
