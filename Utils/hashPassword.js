const brycpt = require("bcrypt");

//Hash Password
const hashPassword = async (password) => {
  const hashedPW = await brycpt.hash(password, 10);
  return hashedPW;
};

//Compare Password
const comparePassword = async (password, hashedPassword) => {
  const isMatch = await brycpt.compare(password, hashedPassword);
  return isMatch;
};

module.exports = { hashPassword, comparePassword };
