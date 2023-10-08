const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

function hashPassword(pass) {
  const hash = bcrypt.hashSync(pass, salt);
  return hash;
}

function comparePassword(plaintext, hashed) {
  return bcrypt.compareSync(plaintext, hashed);
}

module.exports = { hashPassword, comparePassword };