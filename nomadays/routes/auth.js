const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const router = express.Router();

// Importamos el modelo de usuario
const User = require('../models/User');

// Definimos la constante  para bcrypt
const bcryptSalt = 10;


router.get('/login', (req, res, next) => {
  res.render('auth/login');
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/auth/login',
    failureFlash: true,
  })(req, res, next);
});

// esto está añadido por pablo cambiar luego

router.get('/profile', (req, res, next) => {
  res.render('auth/profile/profile');
});

router.get('/place', (req, res, next) => {
  res.render('auth/placeFile');
});

// esto está añadido por pablo cambiar luego

router.get('/register', (req, res, next) => {
  res.render('auth/register');
});

router.post('/register', (req, res, next) => {
  const errors = '';
  const { name, email, password, password2 } = req.body;

  if (password !== password2) {
    errors.push({ text: 'Password do not match' });
  }

  if (password.length < 4) {
    errors.push({ text: 'Password must be at least 4 characters' });
  }

  if (errors.length > 0) {
    res.render('auth/register', {
      errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2,
    });
  } else {
    User.findOne({ email })
      .then((user) => {
        if (user) {
          req.flash('error_msg', 'Email existente');
          res.redirect('/auth/login');
        } else {
          const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          };
          const salt = bcrypt.genSaltSync(bcryptSalt);
          const hashPass = bcrypt.hashSync(password, salt);
          newUser.password = hashPass;
          User.create(newUser)
            .then((userCreated) => {
              res.redirect('/auth/login');
            })
            .catch((error) => {
              req.flash('error_msg', 'Ha ocurrido un problema al crear el usuario');
              res.redirect('/auth/register');
            });
        }
      });
  }
});

// Logout user
router.get('/logout', (req, res, next) => {
  req.logout();
  req.flash('success-message', 'You are logged out');
  res.redirect('/auth/login');
});

module.exports = router;
