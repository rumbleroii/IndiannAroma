const Product = require('../models/Product');

exports.getProduct = async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products = await Product.find();

        if(qNew){
            products = await Product.find().sort({ _id: -1 }).limit(5);
        }

        if(qCategory){
            products = await Product.find({
                categories: {
                    $in : [qCategory],
                }
            })
        }

      if (products){
        res.status(200).json({
            products
        });
      } else {
        res.status(200).json({
            msg: "No Products"
        })
      }

     
    } catch (e) {
      console.log(e.message);
      res.status(400).json({
        errors: [{ msg: "Server Error" }],
      });
    }
}

exports.addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    try {
      const product = await newProduct.save();
      res.status(200).json({msg:"Product Created", product});
    } catch (e) {
      console.error(e.message);
      res.status(500).json({
          errors : [{ msg: "Error, Product Not Created"}]
      });
    }
  } catch (e) {
    console.log(e.message);
    res.status(400).json({
      errors: [{ msg: "Server Error" }],
    });
  }

};

exports.editProduct = async (req, res) => {
  try {
    const editProduct = new Product.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        { new : true }
    )
    
    res.status(200).json({ 
        msg: "Product Updated", 
        editProduct 
    });

  } catch (e) {
    console.log(e.message);
    res.status(400).json({
      errors: [{ msg: "Server Error" }],
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
        msg: "Product Deleted"
    });
    
  } catch (e) {
    console.log(e.message);
    res.status(400).json({
      errors: [{ msg: "Server Error" }],
    });
  }
};


