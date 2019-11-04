const path = require("path");

const express = require("express");

const body_parser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

//Routes
// const adminRoutes = require("./routes/admin");
// const shopRoutes = require("./routes/shop");

//Controllers
const errorControllers = require("./controllers/cotroller.error");

const mongoConnect = require("./helpers/helpers.database");

app.use(body_parser.urlencoded({ extended: true }));

//para incluir la carpeta public
app.use(express.static(path.resolve(__dirname, "public")));

//middlewares fro routes
app.use((req, res, next) => {
  // User.findByPk(1)
  //   .then(user => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch(err => console.error(err));
});

// app.use("/admin", adminRoutes);
// app.use(shopRoutes);

app.use(errorControllers.get404);

mongoConnect(client => {
  console.log(client);
  app.listen(3001);
});
