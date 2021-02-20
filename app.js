const express = require("express");
const path = require("path");
const session = require("express-session");
const port = process.env.PORT || 3000;
const SessionStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

const app = express();

// Detrmine Static Folder
app.use(express.static(path.join(__dirname, "assets")));

// Detrmine Static Folder
app.use(express.static(path.join(__dirname, "images")));

// Routes of users
const userRoutes = require("./routes/user.routes");

// Routes of Admin
const adminRoutes = require("./routes/admin/main.routes");
const productRoutes = require("./routes/admin/products.routes");
const categoriesRoutes = require("./routes/admin/category.routes");
const brandsRoutes = require("./routes/admin/brands.routes");

// Routes of homes
const HomeRoutes = require("./routes/home.routes");
const catRoutesOfUsers = require("./routes/category.routes");
const brandRoutesOfUsers = require("./routes/brand.routes");
const productRoutesOfUsers = require("./routes/product.routes");
const commentRoutesOfUsers = require("./routes/comment.routes");

// Determine view engine
app.set("view engine", "ejs");
app.set("views", "views");

// Connect DB To Session
const STORE = new SessionStore({
  uri:
    "mongodb+srv://abdo:12345678Abdo@cluster0.3vro7.mongodb.net/grace?retryWrites=true&w=majority",
  collection: "sessions",
});

// Configure Session
app.use(
  session({
    secret: "This is my secret ..... do it",
    saveUninitialized: false,
    store: STORE,
  })
);

// User Routes
app.use(userRoutes);

// Home Routes
app.use(HomeRoutes);

// Admin Routes
app.use("/custom", adminRoutes);
app.use("/custom", productRoutes);
app.use("/custom", categoriesRoutes);
app.use("/custom", brandsRoutes);
// user Routes
app.use("/category", catRoutesOfUsers);
app.use("/brand", brandRoutesOfUsers);
app.use("/product", productRoutesOfUsers);
app.use("/comment", commentRoutesOfUsers);

// Listen to server
app.listen(port, () => {
  console.log("server listen to port 3000");
});
