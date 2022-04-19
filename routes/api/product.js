const express = require('express');

const auth = require('../../middleware/auth');
const isAdmin = require("../../middleware/isAdmin");
const { validateProduct } =  require("../../middleware/validator");

const productController = require('../../controllers/product');

const router = express.Router();

// router.get("/", (req, res) => {
//     console.log("LOl");
// });  

router.get("/", auth, isAdmin, productController.getProduct);
router.post("/add-product", auth, isAdmin, validateProduct, productController.addProduct);
router.post("/edit-product/:id", auth, isAdmin, validateProduct, productController.editProduct);
router.delete("/delete-product/:id", auth, isAdmin, productController.deleteProduct);

module.exports = router;
