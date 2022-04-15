const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require("../models/User");

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email })

        if(user) {
            res.status(400).json({
                errors: [{ msg : 'User already exists'}]
            })
        }

        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtToken'), 
            { expiresIn: 360000 },
            (err, token) => {
                if(err) throw err;
                res.status(200).json({
                    msg : "User Registered" , token: token
                })
            }
        )

    } catch (e) {
        console.log(e.message);
        res.status(400).json({ 
            errors : [{ msg: 'Server Error'}]
        })
    }
}

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        errors: [{ msg: "Invalid Credentials" }],
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({
        errors: [{ msg: "Invalid Credentials" }],
      });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtToken"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          msg: "User Signed In",
        });
      }
    );
  } catch (e) {
    console.log(e.message);
    res.status(400).json({
      errors: [{ msg: "Server Error" }],
    });
  }
};

exports.allUsers = async (req, res) => {
  try {
    const users = await User.find({});

    if(!users){
      res.status(200).json({ msg: "No Users Found"});
    } else {
      res.status(200).json(users);
    }
  } catch (e) {
    console.log(e.message);
    res.status(400).json({
      errors: [{ msg: "Server Error" }],
    });
  }
}
