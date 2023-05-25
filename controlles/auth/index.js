const registration = require("./registration");
const login = require("./login");
const logout = require("./logout");
const currentUser = require("./currentUser");
const subscription = require("./subscription");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");

module.exports = {
  registration,
  login,
  logout,
  currentUser,
  subscription,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
};
