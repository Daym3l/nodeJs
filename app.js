const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const body_parser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

//Routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

//Controllers
const errorControllers = require("./controllers/cotroller.error");

app.use(body_parser.urlencoded({ extended: true }));

//para incluir la carpeta public
app.use(express.static(path.resolve(__dirname, "public")));

//middlewares for routes
// app.use((req, res, next) => {
//   // User.findByPk(1)
//   //   .then(user => {
//   //     req.user = user;
//   //     next();
//   //   })
//   //   .catch(err => console.error(err));
// });

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorControllers.get404);

mongoose
  .connect("mongodb://localhost:27017/shop")
  .then(resustl => {
    app.listen(3001);
  })
  .catch(err => console.error(err));
