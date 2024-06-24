var express = require("express");
var cookieParser = require("cookie-parser");
const auth = require("../middleware/authMiddleware");
var app = express();
app.use(cookieParser());
const router = express.Router();
const Controller = require("../controllers/bookController");

router.get("/get/:userId", auth, Controller.getBooks);
router.get("/search/:search", auth, Controller.searchBook);
router.post("/add", auth, Controller.addBook);
router.post("/delete", Controller.deleteBook);
router.get("/booksByShelf", Controller.groupBooksByShelf);

module.exports = router;
