import React, { useState, useEffect } from "react";
import useAxios from "../utils/useAxios";
import { debounce } from "lodash";
import { useBooks } from "../context/booksContext";
import { useSelector } from "react-redux";

const AddBooksModal = ({ isOpen, setOpen }) => {
  const { books, setReadBooks, setCurrentlyReadingBooks, setToReadBooks } =
    useBooks();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [selectedShelf, setSelectedShelf] = useState("");
  const [status, setStatus] = useState("");
  const [newShelf, setNewShelf] = useState("");
  const { user } = useSelector(state => state.auth);
  const api = useAxios();

  useEffect(() => {
    const fetchResults = debounce(async () => {
      if (query.length > 0) {
        try {
          const response = await api.get(
            `http://localhost:3002/api/book/search/${query}`
          );
          console.log(response.data);
          setResults(response.data);
        } catch (error) {
          console.error("Error fetching search results:", error);
          setResults([]);
        }
      }
    }, 300);
    fetchResults();
  }, [query]);
  const updateBooksState = (addedShelf, setState) => {
    setState(prev =>
      prev.some(item => item.shelf === addedShelf.shelf)
        ? prev.map(item =>
            item.shelf === addedShelf.shelf
              ? { ...item, books: [...item.books, ...addedShelf.books] }
              : item
          )
        : [...prev, addedShelf]
    );
  };
  const addbooks = async () => {
    if (selectedBooks.length === 0) alert("No books selected");
    else if (!status) alert("Please select a status");
    else {
      try {
        const shelf =
          !selectedShelf && !newShelf
            ? status === "C"
              ? ""
              : "New reads"
            : newShelf
            ? newShelf
            : selectedShelf;
        const response = await api.post("http://localhost:3002/api/book/add", {
          userId: user.id,
          books: selectedBooks,
          status,
          shelf,
        });
        const addedShelf = { shelf: shelf, books: response.data };
        switch (status) {
          case "R":
            updateBooksState(addedShelf, setReadBooks);
            break;
          case "C":
            updateBooksState(addedShelf, setCurrentlyReadingBooks);
            break;
          case "T":
            updateBooksState(addedShelf, setToReadBooks);
            break;
          default:
            break;
        }
      } catch (error) {
        if (error.response.status === 400) {
          alert(error?.response?.data?.error);
        } else {
          alert(`Error: ${error?.response?.statusText}`);
        }
      }
    }
  };
  if (!isOpen) return null;
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-0 flex items-center justify-center z-50">
      <div
        className="flex flex-col bg-[#F6E4BE] rounded-lg border-2 border-black shadow-black-4 overflow-hidden"
        style={{ width: "500px", height: "550px" }}
      >
        <div className="flex justify-between items-center flex-none py-3 px-5 border-b-2 border-black bg-[#A4D985] ">
          <h2 className="text-lg font-bold ">Add Books</h2>

          <button
            className="text-gray-500 hover:text-black border-2 border-black rounded-full size-7 flex justify-center items-center bg-white"
            onClick={() => {
              setOpen(false);
              setQuery("");
              setSelectedBooks([]);
              setSelectedShelf("");
              setStatus("");
              setNewShelf("");
            }}
          >
            <svg
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-5 flex flex-col flex-grow space-y-4 overflow-auto">
          <input
            className="outline-none bg-white flex rounded-xl h-10 shadow-black-2 border-black border-2 p-2 "
            type="text"
            placeholder="Search..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
            <div className=" w-full mb-10  bg-white shadow-lg overflow-y-auto  scrollbar-none">
              <ul>
                {results.length > 0 ? (
                  results.map((result, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer
                      border-2 border-black h-20 flex "
                      onClick={() => {
                        setSelectedBooks(prevState => {
                          const bookExists = prevState.some(
                            book => book.code === result.code
                          );
                          if (!bookExists) {
                            return [...prevState, result];
                          }
                          return prevState;
                        });
                        setQuery("");
                      }}
                    >
                      <div className="rounded-md flex-shrink-0 h-19 w-14 bg-beige">
                        <img
                          src={result.cover}
                          className="h-full w-full shadow-md"
                        />
                      </div>
                      <div className="px-6">
                        <h1 className="font-bold">{result.title}</h1>
                        <p className="">
                          {result.authors?.map(a => a)}
                          {result.publishedDate}
                        </p>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex justify-center italic">
                    No books found
                  </li>
                )}
              </ul>
            </div>
          )}
          {!query && selectedBooks.length > 0 && (
            <div className="flex flex-wrap mt-5 h-36 w-full overflow-y-auto ">
              {selectedBooks.map(b => (
                <div
                  key={b._id}
                  className="flex relative m-2 h-28 w-20 rounded-md border-2 border-black shadow-black-2 overflow-hidden "
                >
                  <button
                    className="absolute right-1 top-1 size-6 bg-red-500 text-white rounded-full flex items-center justify-center
                     text-lg border border-black shadow-black-1 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transform transition duration-200"
                    onClick={() =>
                      setSelectedBooks(prev =>
                        prev.filter(l => l.code !== b.code)
                      )
                    }
                  >
                    &times;
                  </button>
                  <img
                    src={b.cover}
                    className="w-full h-full"
                    alt="Book cover"
                  />
                </div>
              ))}
            </div>
          )}
          {selectedBooks.length > 0 && !query && (
            <>
              <div className="flex flex-col w-full">
                <label
                  htmlFor="status"
                  className=" text-sm font-medium text-gray-700"
                >
                  Select a status
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={event => {
                    setStatus(event.target.value);
                  }}
                  className="flex h-7 bg-[#FFD787] rounded-lg px-1 border-2
                     border-[#3D3D3D] shadow-grey-2 outline-none w-full"
                >
                  <option value="" disabled>
                    Status
                  </option>
                  <option value="R">Read</option>
                  <option value="C">Currently reading</option>
                  <option value="T">To read</option>
                </select>
              </div>

              {status && status !== "C" && (
                <div className="flex flex-col space-y-3">
                  <div className="flex space-x-3 items-center">
                    <div className="flex flex-col w-full  ">
                      <label className="block text-sm font-medium text-gray-700">
                        Assign to a shelf
                      </label>
                      <select
                        value={selectedShelf}
                        onChange={event => {
                          setSelectedShelf(event.target.value);
                        }}
                        className="flex w-full h-7 bg-[#FDA79A] rounded-lg pr-1 pl-1 border-2
                      border-[#3D3D3D] shadow-grey-2 outline-none"
                      >
                        <option value="">Shelf</option>
                        {books
                          .find(s => s.status === status)
                          ?.shelves?.map(b => b.shelf)
                          ?.map(shelf => (
                            <option key={shelf} value={shelf}>
                              {shelf}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="flex flex-col w-full ">
                      <label className=" text-sm font-medium text-gray-700">
                        Create a new shelf
                      </label>
                      <input
                        className="outline-none bg-white flex rounded-lg  shadow-black-2 border-black border-2 px-2  "
                        type="text"
                        value={newShelf}
                        onChange={e => setNewShelf(e.target.value)}
                      />
                    </div>
                  </div>
                  <p>
                    By default, the selected book(s) will be assigned to the
                    shelf "New Reads." You can create a new shelf if you prefer.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex flex-none justify-end items-center p-5 ">
          <button
            className=" h-10 text-black bg-white font-bold py-2 px-4 rounded-md border-2 border-black shadow-black-2
            active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transform transition duration-200"
            onClick={addbooks}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBooksModal;
