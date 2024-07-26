import React, { useEffect, useState } from "react";
import MiniTopBar from "./MiniTopBar";
import Library from "./Library";
import useAxios from "../utils/useAxios";
import { useSelector } from "react-redux";
import AddBooksModal from "../comm/AddBooksModal";
import { useBooks } from "../context/booksContext";
function ToRead() {
  const { toReadBooks } = useBooks();

  return (
    <div
      className="  flex flex-col 
      p-2 overflow-auto w-5/6"
    >
      <Library booksByShelf={toReadBooks} status={"T"} />
    </div>
  );
}

export default ToRead;
