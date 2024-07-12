var express = require("express");
var cookieParser = require("cookie-parser");
const auth = require("../middleware/authMiddleware");
var app = express();
app.use(cookieParser());
const router = express.Router();
const Controller = require("../controllers/bookController");

router.get("/search/:search", Controller.searchBook);
router.get("/get/:userId", Controller.getBooks);
router.post("/add", Controller.addBook);
router.post("/delete", Controller.deleteBook);
router.post("/booksByShelf", auth, Controller.groupBooksByShelf);

module.exports = router;
