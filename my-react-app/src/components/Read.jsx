import React, { useEffect, useState } from "react";
import MiniTopBar from "./MiniTopBar";
import Library from "./Library";
import useAxios from "../utils/useAxios";
import { useSelector } from "react-redux";
import AddBooksModal from "../comm/AddBooksModal";
import { useBooks } from "../context/booksContext";
function Read() {
  const { readBooks } = useBooks();
  const [search, setSearch] = useState("");
  const [selectedShelf, setSelectedShelf] = useState("");
  console.log(selectedShelf);
  console.log(
    readBooks.filter(item => {
      return item.shelf.includes("fav");
    })
  );

  return (
    <div
      className=" w-1/2 flex flex-col h-full 
     space-y-4 p-2 overflow-auto"
    >
      <MiniTopBar
        shelves={readBooks.map(b => b.shelf)}
        search={search}
        setSearch={setSearch}
        selectedShelf={selectedShelf}
        setSelectedShelf={setSelectedShelf}
      />
      {search ? (
        <Library
          booksByShelf={readBooks.filter(item => {
            return (
              item.shelf.toLowerCase().includes(search) ||
              item.books.some(
                book =>
                  book.title.toLowerCase().includes(search) ||
                  book.authors.some(author =>
                    author.toLowerCase().includes(search)
                  )
              )
            );
          })}
        />
      ) : selectedShelf ? (
        <Library
          booksByShelf={readBooks.filter(item => {
            return item.shelf.includes(selectedShelf);
          })}
        />
      ) : (
        <Library booksByShelf={readBooks} />
      )}
    </div>
  );
}

export default Read;
