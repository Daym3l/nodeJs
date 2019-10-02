const path = require("path");
const express = require("express");
const body_parser = require("body-parser");

const app = express();

const expresHbs = require("express-handlebars");

// hace fata definir un main-laypout por default
// app.engine("hbs", expresHbs());
// app.set("view engine", "hbs");
// app.set("views", "views/hbs");

// PUG ENGINE
// app.set("view engine", "pug");
// app.set("views", "views/pug");

app.set("view engine", "ejs");
app.set("views", "views/ejs");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { docTitle: "Not Page Found!!!" });
});

app.listen(3001);
