const userModel = require("../../models/Auth/user.model");
const validatorResult = require("express-validator").validationResult;

exports.postLoginUser = (req, res, next) => {
  if (!validatorResult(req).array().length > 0) {
    userModel
      .LoginUser(req.body.email, req.body.password)
      .then((user) => {
        req.session.userID = user._id;
        res.redirect("/");
      })
      .catch((err) => {
        res.render("users/login", {
          err: "Email or password not correct",
          isUser: req.session.userID,
        });
      });
  } else {
    res.render("users/login", {
      validateErrors: validatorResult(req).array(),
    });
  }
};

exports.postNewUser = (req, res, next) => {
  if (!validatorResult(req).array().length > 0) {
    userModel
      .addNewUser(req.body)
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        res.render("users/register", {
          err: err,
        });
      });
  } else {
    res.render("users/register", {
      validateErrors: validatorResult(req).array(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
    });
  }
};
