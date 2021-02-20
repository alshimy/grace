const mongoose = require("mongoose");

const DB_URL =
  "mongodb+srv://abdo:12345678Abdo@cluster0.3vro7.mongodb.net/grace?retryWrites=true&w=majority";

const categorySchema = mongoose.Schema({
  name: String,
  author: {
    type: String,
    default: "Abdelrahman",
  },
});

const Category = mongoose.model("category", categorySchema);

exports.getAllCategory = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        Category.find()
          .then((categories) => {
            mongoose.disconnect();
            resolve(categories);
          })
          .catch((err) => {
            mongoose.disconnect();
            reject(err);
          });
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.addNewCategory = (category) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        let cat = new Category(category);
        cat
          .save()
          .then((cat) => {
            mongoose.disconnect();
            resolve();
          })
          .catch((err) => {
            mongoose.disconnect();
            reject(err);
          });
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
