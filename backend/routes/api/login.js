
const express = require('express');
const router = express.Router();

const loginService = require('../../src/Login/loginService');



// @route  GET camagru/login
// @descp  login
// @access Public
router.post('/', (req, res) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
        res.status(504).json({
            error: 'invalid request',
            message: 'provide both userName or email with password'
        });
        return ;
    }
    loginService.login(userName, password)
        .then(response => {
            console.log('response => ', response);
            console.log('password => ', password)
            res.json(response)
        })
        .catch(err => {
            res.json(err);
        })
    
})

module.exports = router;
