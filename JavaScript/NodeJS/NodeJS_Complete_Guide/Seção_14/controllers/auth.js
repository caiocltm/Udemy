const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res) => {
  User.findById("5dcc9de1a924cb32b492b04c")
  .then(user => {
    req.session.isLoggedIn = true;
    req.session.user = user;
    req.session.save(_ => {
      res.redirect('/');
    });
  })
  .catch(err => console.log(err));
};

exports.postLogout = (req, res) => {
  req.session.destroy((error) => {
    console.log(error);
    res.redirect('/');
  });
};

