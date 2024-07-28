import React, { useEffect, useState } from "react";
import MiniTopBar from "./MiniTopBar";
import Library from "./Library";
import useAxios from "../utils/useAxios";
import { useSelector } from "react-redux";
import AddBooksModal from "../comm/AddBooksModal";
import { useBooks } from "../context/booksContext";
function CurrentlyReading() {
  const { currentlyReadingBooks } = useBooks();
  console.log("currentlyReadingBooks", currentlyReadingBooks);
  return (
    <div
      className="  flex  flex-col 
      p-2 overflow-auto w-1/2"
    >
      <Library booksByShelf={currentlyReadingBooks} status={"C"} />
    </div>
  );
}

export default CurrentlyReading;
