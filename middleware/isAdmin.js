const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const user = await User.findOne({ id: req.user });
    if (user.isAdmin) {
      next();
    } else {
      return res.status(401).json({
        errors: [{ msg: "Unauthorized Access" }],
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: [{ msg: "Server Error" }],
    });
  }
};
