const router = require("express").Router();
const commentController = require("./../controllers/comments.controller");
const bodyParser = require("body-parser");

router.post(
  "/",
  bodyParser.urlencoded({ extended: false }),
  commentController.addComment
);

module.exports = router;
