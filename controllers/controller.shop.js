const Product = require("../models/model.product");
const Order = require("../models/model.order");

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(rows => {
      res.render("shop/product-list", {
        prods: rows,
        pageTitle: "All Products",
        path: "/products",
        isAuthenticated: req.isLoggedIn
      });
    })
    .catch(err => console.error(err));
};

exports.getProduct = (req, res, next) => {
  let prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render("shop/product-detail", {
        product,
        pageTitle: product.title,
        path: "/products",
        isAuthenticated: req.isLoggedIn
      });
    })
    .catch(err => console.error(err));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(rows => {
      res.render("shop/index", {
        prods: rows,
        pageTitle: "Shop",
        path: "/",
        isAuthenticated: req.isLoggedIn
      });
    })
    .catch(err => console.error(err));
};

exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then(user => {
      const products = [...user.cart.items];
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products,
        isAuthenticated: req.isLoggedIn
      });
    })
    .catch(err => console.error(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect("/cart");
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.redirect("/cart");
    })
    .catch(err => console.error(err));
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user
        },
        products: products
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(result => {
      res.redirect("/orders");
    })
    .catch(err => console.error(err));
};

exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
    .then(orders => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
        isAuthenticated: req.isLoggedIn
      });
    })
    .catch(err => console.error(err));
};
