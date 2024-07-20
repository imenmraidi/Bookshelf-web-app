import React, { Component } from "react";
import TopBar from "../components/TopBar";
import Container from "./Container";
import AddBooksModal from "../comm/AddBooksModal";
import useAxios from "../utils/useAxios";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

function Home() {
  const [books, setBooks] = useState([]);
  const { user } = useSelector(state => state.auth);
  const [addBookModal, setAddBookModal] = useState(false);
  const api = useAxios();

  const fetchData = async () => {
    try {
      const response = await api.post(
        "http://localhost:3002/api/book/booksByShelf",
        { userId: user.id, status: "R" }
      );
      console.log("res", response.data);
      setBooks(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="bg-bg-2 m-0 p-4 h-screen w-screen flex flex-col overflow-auto">
      <TopBar addBook={() => setAddBookModal(true)} />
      {books && <Container books={books} />}
      <AddBooksModal
        isOpen={addBookModal}
        setOpen={setAddBookModal}
        setBooks={setBooks}
      />
    </div>
  );
}

export default Home;
