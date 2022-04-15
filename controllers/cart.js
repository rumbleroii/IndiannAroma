const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.getCartItems = async (req, res) => {
  const userId = req.params.id;
  try {
    let cart = await Cart.findOne({ userId });
    if (cart && cart.products.length > 0) {
      res.status(200).json({ msg: "Item added to cart", cart });
    } else {
      res.status(200).json({ msg: "Cart empty" });
    }
  } catch (e) {
    console.error(e.message);
    res.status(500).json({
      errors: [{ msg: "Server error" }],
    });
  }
};

exports.addCartItems = async (req, res) => {
  const userId = req.params.id;
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    let product = await Product.findOne({ _id: productId });
    if (!product) {
      res.status(404).json({
        errors: [{ msg: "Item Not Found" }],
      });
    }

    const price = product.price;
    const title = product.title;

    if (cart) {
      let itemIndex = cart.products.findIndex((p) => p.productId == productId);

      if (itemIndex > -1) {
        let productItem = cart.products[itemIndex];
        productItem.quantity += quantity;
        cart.products[itemIndex] = productItem;
      } else {
        cart.products.push({ productId, title, quantity, price });
      }
      cart.bill += quantity * price;
      cart = await cart.save();

      return res.status(200).json({ msg: "Item Added To Cart", cart });
    } else {

      const newCart = await Cart.create({
        userId,
        products: [{ productId, title, quantity, price }],
        bill: quantity * price,
      });

      cart = await newCart.save();
      return res.status(200).json({ msg: "Item Added To Cart", cart });
    }
  } catch (e) {
    console.error(e.message);
    res.status(500).json({
      errors: [{ msg: "Server error" }],
    });
  }
};

exports.deleteCartItems = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;
  try {
    let cart = await Cart.findOne({ userId });
    let itemIndex = cart.products.findIndex((p) => p.productId == productId);
    if (itemIndex > -1) {
      let productItem = cart.products[itemIndex];
      cart.bill -= productItem.quantity * productItem.price;
      cart.products.splice(itemIndex, 1);
    }
    cart = await cart.save();
    return res.status(200).json({ msg: "Item Removed From Cart", cart });
    
  } catch (e) {
    console.error(e.message);
    res.status(500).json({
      errors: [{ msg: "Server error" }],
    });
  }
};
