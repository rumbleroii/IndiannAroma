const jwt = require('jsonwebtoken')
const config = require('config');
const router = require('../routes/api/auth');


module.exports = (req,res,next) => {
    if(!req.user){
        res.redirect('');
    }
    else{
        next();
    }
};

