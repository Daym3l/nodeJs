const path = require("path");

const express = require("express");

const body_parser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

//Routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

//Controllers
const errorControllers = require("./controllers/cotroller.error");
const sequelize = require("./helpers/helpers.database");

app.use(body_parser.urlencoded({ extended: true }));

//para incluir la carpeta public
app.use(express.static(path.resolve(__dirname, "public")));

app.use("/admin", adminRoutes);

app.use(shopRoutes);

app.use(errorControllers.get404);

sequelize
  .sync()
  .then(() => {
    app.listen(3001);
  })
  .catch(err => { 
    console.error("DATABASE_ERROR:" + err);
  });
