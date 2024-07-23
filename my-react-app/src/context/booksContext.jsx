import React, { createContext, useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useAxios from "../utils/useAxios";

const BooksContext = createContext();

export const useBooks = () => {
  return useContext(BooksContext);
};
export default BooksContext;

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [readBooks, setReadBooks] = useState([]);
  const [currentlyReadingBooks, setCurrentlyReadingBooks] = useState([]);
  const [toReadBooks, setToReadBooks] = useState([]);

  const { user } = useSelector(state => state.auth);
  const api = useAxios();

  const fetchData = async () => {
    try {
      const response = await api.post(
        "http://localhost:3002/api/book/booksByShelf",
        { userId: user.id, status: "R" }
      );
      console.log("res", response.data);
      setBooks(response.data);
      setReadBooks(response.data.find(r => r.status === "R")?.shelves || []);
      setCurrentlyReadingBooks(
        response.data.find(r => r.status === "C")?.shelves || []
      );
      setToReadBooks(response.data.find(r => r.status === "T")?.shelves || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <BooksContext.Provider
      value={{
        books,
        setBooks,
        readBooks,
        setReadBooks,
        currentlyReadingBooks,
        setCurrentlyReadingBooks,
        toReadBooks,
        setToReadBooks,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};
