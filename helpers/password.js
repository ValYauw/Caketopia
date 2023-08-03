const bcrypt = require('bcryptjs');

function hashPassword(pass) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(pass, salt);
  return hash;
}

function comparePassword(comparedPassword, hashedPassword) {
  return bcrypt.compareSync(comparedPassword, hashedPassword);
}

module.exports = { hashPassword, comparePassword };