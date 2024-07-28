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
    if (!(books.data.totalItems > 0)) res.status(200).json([]);
    else {
      const items = books.data.items.map(item => {
        return {
          code: item?.id,
          title: item.volumeInfo?.title,
          authors: item.volumeInfo?.authors,
          pageCount: item.volumeInfo?.pageCount,
          cover: item.volumeInfo?.imageLinks?.thumbnail,
          publishedDate: item.volumeInfo?.publishedDate,
        };
      });
      res.status(200).json(items);
    }
  } catch (error) {
    res.status(500).send(error.message);
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
const addBooks = async (req, res) => {
  const { books, shelf, status, userId } = req.body;
  try {
    const existingBooks = await Book.find({
      code: { $in: books.map(book => book.code) },
    });

    if (existingBooks.length > 0) {
      const existingTitles = existingBooks.map(book => book.title);
      return res.status(400).json({
        error: `Books with titles "${existingTitles.join(", ")}" already exist`,
      });
    }

    const newBooks = books.map(book => ({ ...book, shelf, status, userId }));
    const insertedBooks = await Book.insertMany(newBooks);

    res.status(200).json(insertedBooks);
  } catch (error) {
    res.status(500).send({ error });
  }
};
const groupBooksByShelf = async (req, res) => {
  try {
    const groupedBooks = await Book.aggregate([
      {
        $group: {
          _id: {
            status: "$status",
            shelf: "$shelf",
          },
          books: {
            $push: "$$ROOT",
          },
        },
      },
      {
        $group: {
          _id: "$_id.status",
          shelves: {
            $push: {
              shelf: "$_id.shelf",
              books: "$books",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          status: "$_id",
          shelves: 1,
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
    await Book.findOneAndDelete({ _id: bookId });
    res.status(200);
  } catch (error) {
    res.status(500).send({ error });
  }
};

module.exports = {
  searchBook,
  addBooks,
  groupBooksByShelf,
  deleteBook,
  getBooks,
};
