const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const bookSchema = new mongoose.Schema({
  code: { type: String, required: true },
  title: { type: String, required: true },
  authors: { type: [String], required: true },
  pageCount: { type: Number, required: true },
  cover: { type: String, required: true },
  userId: { type: String, required: true },
  startedAt: { type: Date },
  finishedAt: { type: Date },
  rating: { type: Number },
  notes: { type: String },
  status: { type: String },
  shelf: { type: String },
  tag: { type: String },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
