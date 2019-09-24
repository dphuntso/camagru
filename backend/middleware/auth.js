
const config = require('config');
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    let token = req.header('Authorization');

    // check for token
    if (!token)
    {
        res.status(401).json({ message: 'No token, authorization denied'});
        return ;
    }
    token = token.split(' ')[1];
    try {
        const decoded = jwt.verify(token, config.get('jwtToken'));
        req.user = decoded;
        console.log(req.user)
        next();

    } catch (e) {
        res.status(400).json({ message: 'Token is not valid'})
    }

    // verify token
}


module.exports = verifyToken;