const mongoose = require("mongoose");

const DB_URL =
  "mongodb+srv://abdo:12345678Abdo@cluster0.3vro7.mongodb.net/grace?retryWrites=true&w=majority";

const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
  brand: String,
  category: String,
  numberOfSales: {
    type: Number,
    default: 0,
  },
  author: {
    type: String,
    default: "Abdelrahman",
  },
});

const Product = mongoose.model("product", productSchema);

exports.getProductsOfCategory = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        Product.find({ category: id })
          .sort({ _id: -1 })
          .then((products) => {
            mongoose.disconnect();
            resolve(products);
          })
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
};
exports.getProductsOfBrand = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        Product.find({ brand: id })
          .sort({ _id: -1 })
          .then((products) => {
            mongoose.disconnect();
            resolve(products);
          })
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
};

exports.getBestSalesProducts = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        Product.find()
          .limit(2)
          .sort({ numberOfSales: -1 })
          .then((products) => {
            mongoose.disconnect();
            resolve(products);
          })
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
};

exports.getProducts = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        Product.find()
          .sort({ _id: -1 })
          .then((products) => {
            mongoose.disconnect();
            resolve(products);
          })
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
};
exports.getProduct = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        Product.findOne({ _id: id })
          .then((product) => {
            mongoose.disconnect();
            resolve(product);
          })
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
};
exports.deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        Product.deleteOne({ _id: id })
          .then((product) => {
            mongoose.disconnect();
            resolve(product);
          })
          .catch((err) => {
            mongoose.disconnect();
            reject("err2");
          });
      })
      .catch((err) => {
        mongoose.disconnect();
        reject("err2");
      });
  });
};
exports.addNewProuctOrUpdate = (product) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(DB_URL).then(() => {
      if (product.id !== "") {
        Product.findOne({ _id: product.id })
          .then((productGet) => {
            if (productGet) {
              Product.updateOne(
                { _id: product.id },
                {
                  $set: {
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    category: product.category,
                  },
                }
              )
                .then(() => {
                  mongoose.disconnect();
                  resolve();
                })
                .catch((err) => {
                  mongoose.disconnect();
                  reject("err1");
                });
            } else {
              mongoose.disconnect();
              reject("Name is already taken!");
            }
          })
          .catch((err) => {
            mongoose.disconnect();
            reject("err2");
          });
      } else {
        Product.findOne({ name: product.name })
          .then((productGet) => {
            if (productGet) {
              mongoose.disconnect();
              reject("Name is already taken!");
            } else {
              let newProduct = new Product(product);
              newProduct
                .save()
                .then(() => {
                  mongoose.disconnect();
                  resolve();
                })
                .catch((err) => {
                  mongoose.disconnect();
                  reject("err1");
                });
            }
          })
          .catch((err) => {
            mongoose.disconnect();
            reject("err2");
          });
      }
    });
  });
};
