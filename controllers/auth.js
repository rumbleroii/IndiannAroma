const jwt = require("jsonwebtoken");

const config = require("config");

exports.setJWT = (req, res) => {
  try {
    const payload = {
      user: {
        id: req.user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtToken"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          msg: "User Token Provided",
          token: token,
        });
      }
    );
  } catch (e) {
    console.log(e);
    res.status(400).json({
      errors: [
        {
          msg: "Server Error",
        },
      ],
    });
  }
};
