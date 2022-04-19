const express = require('express');

const router = express.Router();

const passport = require('passport');

const jwt = require('jsonwebtoken');

const config = require('config');

router.get('/google', passport.authenticate('google',{ scope: ['profile'] }));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    console.log(req.user);

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
});

module.exports = router;