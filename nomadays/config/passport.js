const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// Load user model
const User = require('../models/User');
module.exports = (passport) => {
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({
      email,
    }).then((user) => {
      if (!user) {
        return done(null, false, { message: 'El usuario no existe' });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: 'El password es incorrecto' });
      }
      return done(null, user);
    });
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};

