const express = require("express");

const auth = require("../../middleware/auth");
const isAdmin = require("../../middleware/isAdmin");

const orderController = require("../../controllers/order");

const router = express.Router();

router.get('/:id', auth, isAdmin, orderController.get_orders);
// router.post("/:id", auth, orderController.OrderCheckout);

module.exports = router;