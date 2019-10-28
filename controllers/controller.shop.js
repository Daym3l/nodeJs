const Product = require("../models/model.product");
const Cart = require("../models/model.cart");

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(rows => {
      res.render("shop/product-list", {
        prods: rows,
        pageTitle: "All Products",
        path: "/products"
      });
    })
    .catch(err => console.error(err));
};

exports.getProduct = (req, res, next) => {
  let prodId = req.params.productId;
  Product.findByPk(prodId)
    .then(product => {
      res.render("shop/product-detail", {
        product,
        pageTitle: product.title,
        path: "/products"
      });
    })
    .catch(err => console.error(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(rows => {
      res.render("shop/index", {
        prods: rows,
        pageTitle: "Shop",
        path: "/"
      });
    })
    .catch(err => console.error(err));
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders"
  });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      return cart
        .getProducts()
        .then(products => {
          res.render("shop/cart", {
            path: "/cart",
            pageTitle: "Your Cart",
            products
          });
        })
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      let newQuantity = 1;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        //...
      }
      return Product.findByPk(prodId)
        .then(product => {
          return fetchedCart.addProduct(product, {
            through: { quantity: newQuantity }
          });
        })
        .catch(err => console.error(err));
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch(err => console.error(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then(product => {
      Cart.deleteProduct(prodId, product.price);
      res.redirect("/cart");
    })
    .catch(err => {
      console.error(err);
    });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", { path: "/checkout", pageTitle: "Checkout" });
};
