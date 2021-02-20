const productModel = require("./../models/products.model");
const categoryModel = require("../models/category.model");
const brandModel = require("../models/brand.model");
const commentModel = require("../models/comment.model");
const userModel = require("../models/Auth/user.model");

exports.getAllProducts = (req, res, next) => {
  productModel
    .getProducts()
    .then((products) => {
      productModel
        .getBestSalesProducts()
        .then((props) => {
          categoryModel
            .getAllCategory()
            .then((cats) => {
              brandModel
                .getAllBrand()
                .then((brs) => {
                  res.render("users/index", {
                    isUser: req.session.userID,
                    products: products,
                    bestSeller: props,
                    categories: cats,
                    brands: brs,
                  });
                })
                .catch((err) => {
                  res.redirect("/");
                });
            })
            .catch((err) => {
              res.redirect("/");
            });
        })
        .catch((err) => {
          res.redirect("/");
        });
    })
    .catch((err) => {
      res.redirect("/");
    });
};

exports.addNewProduct = (req, res, next) => {
  let product = req.body;
  product.image = req.file.filename;
  productModel
    .addNewProuctOrUpdate(product)
    .then(() => {
      res.redirect("/custom");
    })
    .catch((err) => {
      res.redirect("/custom/products");
    });
};

exports.getAllProductsToAdmin = (req, res, next) => {
  productModel
    .getProducts()
    .then((products) => {
      res.render("admin/main", {
        isAdmin: req.session.adminID,
        products: products,
      });
    })
    .catch((err) => {
      log(err);
      res.redirect("/");
    });
};

exports.deleteProductPost = (req, res, next) => {
  productModel
    .deleteProduct(req.params.id)
    .then((product) => {
      res.redirect("/custom");
    })
    .catch((err) => {
      res.redirect("/custom");
    });
};

exports.updateProductPost = (req, res, next) => {
  productModel
    .getProduct(req.params.id)
    .then((product) => {
      categoryModel
        .getAllCategory()
        .then((cats) => {
          res.render("admin/addProduct", {
            categories: cats,
            product: product,
            isAdmin: req.session.adminID,
          });
        })
        .catch((err) => {
          res.redirect("/custom");
        });
    })
    .catch((err) => {
      res.redirect("/custom");
    });
};

exports.toAddProduct = (req, res, next) => {
  categoryModel
    .getAllCategory()
    .then((cats) => {
      brandModel.getAllBrand().then((brands) => {
        res.render("admin/addProduct", {
          categories: cats,
          brands: brands,
          isAdmin: req.session.adminID,
        });
      });
    })
    .catch((err) => {
      res.redirect("/");
    });
};

exports.getProduct = async (req, res, next) => {
  try {
    let product = await productModel.getProduct(req.params.id);
    let cats = await categoryModel.getAllCategory();
    let comments = await commentModel.getComments(req.params.id);
    let user = await userModel.getUserInfo(req.session.userID);
    let rate = 0;
    for (const comment of comments) {
      rate += parseInt(comment.rate);
    }

    res.status(200).render("users/product", {
      categories: cats,
      product: product,
      isUser: req.session.userID,
      comments: comments,
      rate: rate / comments.length,
      user: user[0],
    });
  } catch (err) {
    console.log(err);
    res.status(400).redirect("/");
  }
};
