const passport = require('passport');
const User     = require('../../../models/user');

module.exports = () => {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.find(id)
    .then((user) => { done(null, user); })
    .catch((err) => { done(err, null); });
  });

};
