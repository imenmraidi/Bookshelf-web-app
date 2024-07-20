import React from "react";
import Read from "../components/Read";
function Container({ books }) {
  return (
    <div className=" flex flex-grow mt-6 overflow-auto">
      {books && <Read books={books.find(b => b.status == "R")?.shelves} />}{" "}
      <div className=" h-full w-1/2 p-4 ">hola</div>
    </div>
  );
}

export default Container;
