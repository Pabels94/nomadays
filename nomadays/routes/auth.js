const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;


router.get('/login', (req, res, next) => {
  res.render('auth/login');
});


<<<<<<< HEAD
router.get('/signup', (req, res, next) => {
=======
router.get('/register', (req, res, next) => {
>>>>>>> 6e82006eef048735ff5dffc93c140662624e8789
  res.render('auth/register');
});

router.post('/signup', (req, res, next) => {
  const { email, password } = req.body;

  if (email === '' || password === '') {
    const error = 'usuario y password no pueden estar vacíos';
    res.render('auth/signup', { error });
  } else {
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          const salt = bcrypt.genSaltSync(bcryptSalt);
          const hashPass = bcrypt.hashSync(password, salt);
          const newUser = {
            email,
            password: hashPass,
          };

          User.create(newUser)
            .then((doc) => {
              res.redirect('/');
            })
            .catch((err) => {
              const error = 'Ha ocurrido un problema la crear el usuario';
              res.render('auth/signup', { error });
            });
        } else {
          const error = 'El usuario ya existe';
          res.render('auth/signup', { error });
        }
      })
      .catch((error) => {
        next(error);
      });
  }
});





module.exports = router;
