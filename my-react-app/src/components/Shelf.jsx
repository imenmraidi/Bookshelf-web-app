import React from "react";
import Book from "./Book";
import shelf1 from "../assets/images/shelf1.png";
import shelf3 from "../assets/images/shelf3.png";
import shelf4 from "../assets/images/shelf4.png";

function Shelf({ shelf, status }) {
  return (
    <div className="flex flex-col w-full py-1.5  ">
      <div className="flex flex-col  w-full  px-5 ">
        {shelf && status !== "C" && (
          <h2 className="italic font-light ">{shelf.shelf}</h2>
        )}
        <div className="flex space-x-4  w-full overflow-x-auto scrollbar-none scroll-smooth  py-3   ">
          {shelf && shelf.books.length > 0 ? (
            shelf.books.map(b => <Book key={b._id} book={b} />)
          ) : (
            <div className="w-full flex flex-col justify-center items-center">
              <img
                src={status === "R" ? shelf1 : status === "C" ? shelf3 : shelf4}
                alt=""
                className={status === "C" ? "h-11 w-40" : "w-48"}
              />
              <p className={`italic text-sm ${status === "C" ? "h-3" : ""}`}>
                {status === "C" ? "No books yet" : "No books were found"}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="min-h-3 bg-beige border-black border-t-2 border-b-2" />
    </div>
  );
}

export default Shelf;
