const commentModule = require("../models/comment.model");

exports.addComment = (req, res, next) => {
  let comment = {
    username: req.body.username,
    userId: req.session.userID,
    comment: req.body.comment,
    rate: req.body.rate,
    productId: req.body.productId,
  };
  commentModule
    .addComment(comment)
    .then((comments) => {
      res.status(200).redirect("/");
    })
    .catch((err) => {
      res.status(400).redirect("/");
    });
};
