
const express = require('express');
const ActivateAccount = require('../../src/models/ActivateAccount');
const profileService = require('../../src/Profile/profileService');

const verifyToken = require('../../middleware/auth');

const router = express.Router();

router.get('/', verifyToken, (req, res) => {
    ActivateAccount.find()
        .then(response => res.json(response))
        .catch(err => {
            console.log('error response')
            console.log(err)
            res.json(err)
        });
})

// activate there account
router.post('/:hash', (req, res) => {
    let hash = req.params.hash;
    if (!hash) {
        res.json({
            error: 'Oops. Wrong direction',
            message: 'Are you lost?'
        })
        return ;
    }
    profileService.confirmAccount(hash).then(response => {
        res.json(response);
        return ;
    }).catch(err => res.json({
        error: 'server Error',
        message: 'resend link'
    }))
})

//delete all documents
router.delete('/all', verifyToken, (req, res) => {
    ActivateAccount.deleteMany({})
        .then(response => res.json(response))
        .catch(err => {
            console.log('error response')
            console.log(err)
            res.json(err)
        });
})
// delete one
router.delete('/:id', verifyToken, (req, res) => {
    if (!req.params.id || req.params.id != req.user.id) {
        res.json({
            error: 'not authorised',
            message: 'You are not allowed to delete other peoples profile.'
        })
        return ;
    }
    ActivateAccount.findById(id)
        .then(response => {
            response.remove().then(response1 => {
                res.json(response1)
            })
        })
        .catch(err => {
            console.log('error response')
            console.log(err)
            res.json(err)
        });
})

module.exports = router;