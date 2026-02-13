const User = require("../models/User");

exports.acceptValentine = async (req, res) => {
  let user = await User.findOne();
  if (!user) user = await User.create({});

  user.valentineAccepted = true;
  await user.save();

  res.json({ accepted: true });
};
