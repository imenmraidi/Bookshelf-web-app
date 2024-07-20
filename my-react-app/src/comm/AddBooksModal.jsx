import React, { useState, useEffect } from "react";
import useAxios from "../utils/useAxios";
import { debounce } from "lodash";

const AddBooksModal = ({ isOpen, setOpen, setBooksByShelf }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
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
        className="bg-white p-5 rounded-lg shadow-lg "
        style={{ width: "500px", height: "500px" }}
      >
        <div className="flex justify-between items-center h-10 p-3 ">
          <h2 className="text-lg font-bold ">Add Books i've read</h2>

          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => {
              setOpen(false);
              setQuery("");
              setSelectedBooks([]);
            }}
          >
            <svg
              className="h-6 w-6"
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
        <div className="p-2 flex flex-col h-[24rem] overflow-y-auto bg-yellow-200 ">
          <input
            className="outline-none bg-white flex rounded-xl h-10 shadow-black-2 border-black border-2 p-2 "
            type="text"
            placeholder="Search..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
            <div className=" w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg overflow-y-auto h-48">
              <ul>
                {results.length > 0 ? (
                  results.map((result, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        setSelectedBooks(prevState => [...prevState, result]);
                        setQuery("");
                      }}
                    >
                      {result.title}
                    </li>
                  ))
                ) : (
                  <li
                   
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  >
                    No books found
                  </li>
                )}
              </ul>
            </div>
          )}
          {!query && selectedBooks.map(b => <div>{b.title}</div>)}
        </div>
        <div className="flex justify-end ">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded   "
            onClick={setOpen}
          >
            Close Modal
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBooksModal;
