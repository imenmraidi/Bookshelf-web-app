import React from "react";
import Book from "./Book";
function Shelf({ shelf }) {
  return (
    <div className="flex flex-col w-full   ">
      <div className="flex flex-col  w-full p-4 pb-2 space-y-3  ">
        <h2 className="italic font-light ">{shelf._id}</h2>
        <div className="flex space-x-4  w-full overflow-x-auto scrollbar-none scroll-smooth">
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
