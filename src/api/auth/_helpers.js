const bcrypt = require('bcryptjs');
const models = require('../../../models/index');

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function createUser (req) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.Password, salt);
  return models.User.create({ email: req.body.Email, password: hash })
}

module.exports = {
  comparePass, createUser
};
