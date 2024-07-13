import React from "react";
function Book({ book }) {
  console.log(book);
  return (
    <div className="rounded-md flex-shrink-0 h-20 w-16  bg-beige">
         <img
    src={book.cover}
    className="h-full w-full shadow-md"
  />
    </div>
  );
}

export default Book;
