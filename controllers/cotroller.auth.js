exports.getLogin = (req, res, next) => {
  let isLoggedIn = false;
//  isLoggedIn = req.get("Cookie").split("=")[1];
  res.render("auth/login", {
    path: "/auth/login",
    pageTitle: "Login",
    isAuthenticated: isLoggedIn
  });
};
exports.postLogin = (req, res, next) => {
  res.setHeader("set-Cookie", "loggedIn=true");
  res.redirect("/");
};
