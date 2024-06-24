const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const Book = require("../models/Book");
const axios = require("axios");
const bcrypt = require("bcrypt");

const searchBook = async (req, res) => {
  const { search } = req.params;
  try {
    const books = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${search}`
    );
    const items = books.items.map(item => {
      return {
        code: item.id,
        title: item.title,
        authors: item.authors,
        pageCount: item.pageCount,
        cover: item.imageLinks.thumbnail,
      };
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).send({ error });
  }
};
const getBooks = async (req, res) => {
  const { userId } = req.params;
  try {
    const books = await Book.find({ userId });
    if (!books || books.length === 0) {
      return res
        .status(404)
        .json({ error: "No books found with the specified userId" });
    }
    res.status(200).json(books);
  } catch (error) {
    res.status(500).send({ error });
  }
};
const addBook = async (req, res) => {
  const { book, shelf, status } = req.body;
  try {
    const existingBook = await Book.findOne({ code: book.code });
    if (existingBook) {
      return res.status(400).json({ error: "Book already exists" });
    }
    const newBook = new Book({ ...book, shelf, status });
    await newBook.save();

    res.status(200).json(newBook);
  } catch (error) {
    res.status(500).send({ error });
  }
};
const groupBooksByShelf = async (req, res) => {
  try {
    const groupedBooks = await Book.aggregate([
      {
        $group: {
          _id: "$shelf",
          books: { $push: "$$ROOT" },
        },
      },
    ]);
    res.status(200).json(groupedBooks);
  } catch (error) {
    res.status(500).send({ error });
  }
};
const deleteBook = async (req, res) => {
  const { bookId } = req.body;
  try {
    await Book.findOneAndDelete({ bookId });
    res.status(200);
  } catch (error) {
    res.status(500).send({ error });
  }
};

module.exports = {
  searchBook,
  addBook,
  groupBooksByShelf,
  deleteBook,
  getBooks,
};
