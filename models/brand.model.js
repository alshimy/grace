const mongoose = require("mongoose");

const DB_URL =
  "mongodb+srv://abdo:12345678Abdo@cluster0.3vro7.mongodb.net/grace?retryWrites=true&w=majority";

const brandSchema = mongoose.Schema({
  name: String,
  author: {
    type: String,
    default: "Abdelrahman",
  },
});

const Brand = mongoose.model("brand", brandSchema);

exports.getAllBrand = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        Brand.find()
          .then((brands) => {
            mongoose.disconnect();
            resolve(brands);
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

exports.addNewBrand = (brande) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        let brand = new Brand(brande);
        brand
          .save()
          .then((brand) => {
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
