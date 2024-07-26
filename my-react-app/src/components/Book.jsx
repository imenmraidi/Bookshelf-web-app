import React from "react";
function Book({ book }) {
  console.log(book);
  return (
    <div className="rounded-sm  flex-shrink-0 h-20 w-16  bg-beige overflow-hidden
     shadow-xl ">
         <img
    src={book.cover}
    className="h-full w-full shadow-md"
  />
    </div>
  );
}

export default Book;
