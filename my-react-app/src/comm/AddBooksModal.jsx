import React, { useState, useEffect } from "react";
import useAxios from "../utils/useAxios";
import { debounce } from "lodash";
import { useBooks } from "../context/booksContext";

const AddBooksModal = ({ isOpen, setOpen }) => {
  const { books } = useBooks();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [selectedShelf, setSelectedShelf] = useState("");
  const [status, setStatus] = useState("");
  const [newShelf, setNewShelf] = useState("");

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
  console.log(selectedBooks);
  if (!isOpen) return null;
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-0 flex items-center justify-center z-50">
      <div
        className="flex flex-col bg-[#F6E4BE] rounded-lg border-2 border-black shadow-black-4 overflow-hidden"
        style={{ width: "500px", height: "550px" }}
      >
        <div className="flex justify-between items-center flex-none p-4 border-b-2 border-black bg-[#A4D985] ">
          <h2 className="text-lg font-bold ">Add Books i've read</h2>

          <button
            className="text-gray-500 hover:text-black border-2 border-black rounded-full size-7 flex justify-center items-center bg-white"
            onClick={() => {
              setOpen(false);
              setQuery("");
              setSelectedBooks([]);
              setSelectedShelf("");
              setStatus("");
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
        <div className="p-5 flex flex-col flex-grow overflow-auto">
          <input
            className="outline-none bg-white flex rounded-xl h-10 shadow-black-2 border-black border-2 p-2 "
            type="text"
            placeholder="Search..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
            <div className=" w-full mt-4 bg-white shadow-lg overflow-y-auto h-72 scrollbar-none">
              <ul>
                {results.length > 0 ? (
                  results.map((result, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer
                       border-2 border-black h-20 flex "
                      onClick={() => {
                        setSelectedBooks(prevState => [...prevState, result]);
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
            <div className="flex flex-wrap mt-5 h-52 w-full overflow-y-auto bg-red-400 ">
              {selectedBooks.map(b => (
                <div
                  key={b._id}
                  className="flex relative m-2 h-28 w-20 rounded-md border-2 border-black shadow-black-2 overflow-hidden "
                >
                  <button
                    className="absolute right-1 top-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center
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
          {selectedBooks.length > 0 && (
            <>
              <div className="flex space-x-3">
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="status"
                    className=" text-sm font-medium text-gray-700"
                  >
                    Select a status :
                  </label>
                  <select
                    id="status"
                    value={status}
                    onChange={event => {
                      setStatus(event.target.value);
                    }}
                    className="flex bg-[#FDA79A] rounded-lg px-1 border-2
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
                {status && (
                  <div className="flex flex-col w-full">
                    <label className="block text-sm font-medium text-gray-700">
                      Select a shelf :
                    </label>
                    <select
                      value={selectedShelf}
                      onChange={event => {
                        setSelectedShelf(event.target.value);
                      }}
                      className="flex w-full bg-[#FDA79A] rounded-lg pr-1 pl-1 border-2
           border-[#3D3D3D] shadow-grey-2 outline-none"
                    >
                      <option value="" disabled>
                        Shelf
                      </option>
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
                )}
              </div>
              {status && (
                <div>
                  <p>
                    By default, the selected book(s) will be assigned to the
                    shelf "new reads". Yous can create a new shelf otherwise
                  </p>
                  <div className="flex">
                    <label className=" text-sm font-medium text-gray-700">
                      Create a new shelf
                    </label>
                    <input
                      type="text"
                      value={newShelf}
                      onChange={e => setNewShelf(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex flex-none justify-end items-center  p-4  bg-slate-300 ">
          <button
            className=" h-10 text-black bg-white font-bold py-2 px-4 rounded-md border-2 border-black shadow-black-2  "
            onClick={setOpen}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBooksModal;
