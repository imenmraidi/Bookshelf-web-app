import React, { useEffect, useState } from "react";
import MiniTopBar from "./MiniTopBar";
import Library from "./Library";
import useAxios from "../utils/useAxios";
import { useSelector } from "react-redux";
import AddBooksModal from "../comm/AddBooksModal";
function Read({ books }) {
  const [booksByShelf, setBooksByShelf] = useState([]);
  const [shelves, setShelves] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useSelector(state => state.auth);
  const [addBookModal, setAddBookModal] = useState(false);
  const api = useAxios();

  useEffect(() => {
    setBooksByShelf(books);
    setShelves(books?.map(b => b.shelf));
  }, [books]);
  return (
    <div
      className=" w-1/2 flex flex-col h-full 
     space-y-4 p-2 overflow-auto"
    >
      <MiniTopBar
        shelves={shelves}
        booksByShelf={booksByShelf}
        setBooksByShelf={setBooksByShelf}
        openAddBookModal={() => setAddBookModal(true)}
      />
      <Library booksByShelf={booksByShelf} setBooksByShelf={setBooksByShelf} />
    </div>
  );
}

export default Read;
