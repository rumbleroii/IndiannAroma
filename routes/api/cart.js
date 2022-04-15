const express = require("express");

const auth = require("../../middleware/auth");

const cartController = require("../../controllers/cart");

const router = express.Router();

// router.get("/", (req, res) => {
//     console.log("LOl");
// });

router.get("/:id", auth, cartController.getCartItems);
router.post("/:id", auth, cartController.addCartItems);
router.post("/:userId/:id", auth, cartController.deleteCartItems);

module.exports = router;
