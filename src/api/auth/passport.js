const passport = require('passport');
const models   = require('../../../models/index');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    models.User.find(id)
    .then((user) => { done(null, user); })
    .catch((err) => { done(err, null); });
  });

};
