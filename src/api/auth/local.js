const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const init = require('./passport');
const authHelpers = require('./_helpers');
// const knex = require('../db/connection');

const options = {};
const User = require('../../../models/user')

init();

passport.use(new LocalStrategy(options, (email, password, done) => {
  // check to see if the user exists
  User.find({ where: { email: email } })
  .then((user) => {
    if (!user) return done(null, false);
    if (!authHelpers.comparePass(password, user.password)) {
      return done(null, false);
    } else {
      return done(null, user);
    }
  })
  .catch((err) => { return done(err); });
}));

module.exports = passport;
