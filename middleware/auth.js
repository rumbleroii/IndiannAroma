const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');

    if(!token){
        return res.status(401).json({
            errors: [{ msg: 'No token, Auth Denied'}]
        })
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtToken'));

        req.user = decoded.user;
        next();
    } catch(err){
        return res.status(401).json({
            errors: [{ msg: 'Token Invalid'}]
        })
    }
}

