const { User } = require("../../models/user");
const { HttpError, sendEmail, ctrlWrapper } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw HttpError(400, "Missing required field email");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  await sendEmail(email, user.verificationToken);

  return res.status(200).json({ message: "Verification email sent" });
};

module.exports = ctrlWrapper(resendVerifyEmail);
