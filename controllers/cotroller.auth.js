exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/auth/login",
    pageTitle: "Login",
    isAuthenticated: req.isLoggedIn
  });
};
exports.postLogin = (req, res, next) => {
  req.isLoggedIn = true;
  res.redirect("/");
};
 