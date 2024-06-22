const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    authors: { type: [String], required: true },
    description: { type: String, required: true },
    publishedDate: { type: String, required: true },
    pageCount: { type: Number, required: true },
    categories: { type: [String], required: true },
    cover: { type: String, required: true },
    startedAt : { type: Date, required: true },
    finishedAt : { type: Date, required: true },
    rating : { type: Number , required: true },
    notes: { type: String, required: true },
    userId: { type: String, required: true }
});


const Book = mongoose.model("books", bookSchema);

module.exports = Book;
