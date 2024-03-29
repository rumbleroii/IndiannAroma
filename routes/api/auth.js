const express = require("express");

const router = express.Router();

const passport = require("passport");

const jwt = require("jsonwebtoken");

const config = require("config");

const authController = require('../../controllers/auth');

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

router.get("/google/redirect", passport.authenticate("google"), authController.setJWT);

module.exports = router;
