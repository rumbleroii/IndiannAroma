const express = require('express');

const { validateSignUp, validateSignIn } = require('../../middleware/validator');
const auth = require('../../middleware/auth');

const userController = require('../../controllers/user')

const router = express.Router();

router.post("/register", validateSignUp, userController.signup);
router.post("/login", validateSignIn, userController.signin);
router.get("/all", auth, userController.allUsers);

module.exports = router;
