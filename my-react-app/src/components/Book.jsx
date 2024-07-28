import React, { useState } from "react";
import useAxios from "../utils/useAxios";
import { useBooks } from "../context/booksContext";
import ConfirmModal from "../comm/ConfirmModal";

function Book({ book }) {
  const [openDelete, setOpenDelete] = useState(false);
  console.log(openDelete);
  const {
    books,
    setReadBooks,
    setCurrentlyReadingBooks,
    setToReadBooks,
  } = useBooks();
  const api = useAxios();
  const updateBooksState = setState => {
    setState(prevItems => {
      return prevItems.map(s => {
        const hasBookToRemove = s.books.some(b => b._id === book._id);
        return hasBookToRemove
          ? {
              ...s,
              books: s.books.filter(b => b._id !== book._id),
            }
          : s;
      });
    });
  };
  const deleteBook = async () => {
    try {
      switch (book.status) {
        case "R":
          updateBooksState(setReadBooks);
          break;
        case "C":
          updateBooksState(setCurrentlyReadingBooks);
          break;
        case "T":
          updateBooksState(setToReadBooks);
          break;
        default:
          break;
      }
      const response = await api.post("http://localhost:3002/api/book/delete", {
        bookId: book._id,
      });
      
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        alert(error?.response?.data?.error);
      } else {
        alert(`Error: ${error?.response?.statusText}`);
      }
    }
  };
  return (
    <>
      <div className="group relative rounded-sm flex-shrink-0 h-20 w-16 bg-beige  shadow-xl">
        <img src={book.cover} className="h-full w-full rounded-sm shadow-md" />
        <button
          className="absolute -top-2 -right-1 size-7 bg-[#ff6961] p-1 rounded-full
        opacity-0 flex items-center justify-center border border-grey 
        shadow-grey-1 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none
        transform transition duration-200 group-hover:opacity-100"
          onClick={() => setOpenDelete(true)}
        >
          <lord-icon
            src="https://cdn.lordicon.com/skkahier.json"
            trigger="hover"
            delay="1500"
            colors="primary:#ffffff"
          ></lord-icon>
        </button>
      </div>
      <ConfirmModal
        isOpen={openDelete}
        setOpen={setOpenDelete}
        hanldeDelete={deleteBook}
      />
    </>
  );
}

export default Book;
