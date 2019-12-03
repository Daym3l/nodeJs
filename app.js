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
const authRoutes = require("./routes/auth");

//Controllers
const errorControllers = require("./controllers/cotroller.error");
const User = require("./models/model.user");

app.use(body_parser.urlencoded({ extended: true }));

//para incluir la carpeta public
app.use(express.static(path.resolve(__dirname, "public")));

//middlewares for routes
app.use((req, res, next) => {
  User.findById("5dd460f5e3f89130ecd485b2")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.error(err));
});

app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);
app.use(shopRoutes);

app.use(errorControllers.get404);

mongoose
  .connect("mongodb://localhost:27017/shop")
  .then(resustl => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: "Daymel",
          email: "daymel@test.cu",
          cart: {
            items: []
          }
        });
        user.save();
      }
    });

    app.listen(3001);
  })
  .catch(err => console.error(err));
