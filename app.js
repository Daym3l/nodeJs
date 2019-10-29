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
const Product = require("./models/model.product");
const User = require("./models/model.user");
const Cart = require("./models/model.cart");
const CartItem = require("./models/model.cart-item");
const OrderItem = require("./models/model.order-item");
const Order = require("./models/model.order");

app.use(body_parser.urlencoded({ extended: true }));

//para incluir la carpeta public
app.use(express.static(path.resolve(__dirname, "public")));

//middlewares fro routes
app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.error(err));
});

app.use("/admin", adminRoutes);

app.use(shopRoutes);

app.use(errorControllers.get404);

//Relations
User.hasMany(Product);
User.hasOne(Cart);
Product.belongsToMany(Cart, { through: CartItem });
Cart.belongsToMany(Product, { through: CartItem });
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });


sequelize
  .sync()
  // .sync({ force: true })

  .then(() => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: "daymel", email: "daymel@node.cu" });
    }
    return user;
  })
  .then(user => {
    return user.createCart();
  })
  .then(cart => {
    app.listen(3001);
  })
  .catch(err => {
    console.error("DATABASE_ERROR:" + err);
  });
