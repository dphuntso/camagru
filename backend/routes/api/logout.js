
const express = require('express');
const router = express.Router();

const logoutService = require('../../src/Logout/logoutService');



// @route  GET camagru/login
// @descp  login
// @access Public
router.put('/', (req, res) => {
    const { id } = req.body;
    if (!id) {
        res.json({
            error: 'invalid request',
            message: 'wtf. WTF WTF!!!!!! send id please'
        })
    }
    logoutService.logout(id)
        .then(response => {
            res.json(response)
        })
        .catch(err => {
            res.json(err);
        })
    
})

module.exports = router;
