const { HttpError, ctrlWrapper, sendEmail } = require("../../helpers");
const { User } = require("../../models/user");

const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const registration = async (req, res) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  await sendEmail(email, verificationToken);

  res.status(201).json({
    email: result.email,
    subscription: result.subscription,
  });
};

module.exports = ctrlWrapper(registration);
