const Order = require('../models/Order');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

exports.get_orders = async (req, res) => {
  const userId = req.params.id;
  try {
    const orders = await Order.find({ userId }).sort({ id: -1 });

    if(orders){
        res.status(200).json({
            orders
        })
    } else {
        res.status(200).json({
            msg: "No Orders Placed"
        })
    }
  } catch (e) {
    console.error(e.message);
    res.status(500).json({
      errors: [{ msg: "Server error" }],
    });
  }
};
