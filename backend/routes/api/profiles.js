const express = require('express');
const profileService = require('./../../src/Profile/profileService');
const profileAction = require('./../../src/Profile/action');

const verifyToken = require('../../middleware/auth');

const router = express.Router();

// @route  GET camagru/profiles
// @descp  GET all profiles
// @access Should be private
router.get('/', (req, res) => {
    profileService.getAllProfiles()
        .then(response => res.json(response))
    
})

// @route POST camagru/porfiles
// @desc  Create/Register a profile
// @access public 
router.post('/create', (req ,res) => {
    let {userName, email, password, confirmPassword} = req.body;
    console.log('server.js => ', req.body)
    if (!userName || !email || !password || !confirmPassword) {
        res.status(400).json({
            error: 'error input',
            message: 'please enter all fields'
        });
        return ;
    }
    profileService
        .createProfile(req.body)
        .then(response => res.json(response))
        .catch(err => res.json({
            error: 'server error',
            message: 'Sorry. Please try again. Server error.'
        }));
})

// @route DELETE camagru/profiles/:id
// @desc  Delete user Profile
// @access Private
// router.delete('/:id', verifyToken, (req, res) => {
//     profileService.deleteProfile(req.params.id)
//         .then(response => res.json({response, message: 'User profile successfully deleted'}))
//         .catch(err => res.json({error: err, message: 'server error. Please try again'}));
// })

router.delete('/:id', (req, res) => {
    profileService.deleteProfile(req.params.id)
        .then(response => res.json({response, message: 'User profile successfully deleted'}))
        .catch(err => res.json({error: err, message: 'server error. Please try again'}));
})

router.post('/checkUsername', (req, res) => {
    const {userName} = req.body
    if (!userName) {
        res.status(400).json({
            error: 'error', message: 'userName required'
        });
        return ;
    }
    profileService.checkUsername(userName)
        .then(response => res.json(response))
        .catch(err => {
            res.json({
                error: err,
                message: 'server error. Try again!'
            })
        });
})

router.post('/checkEmail', (req, res) => {
    if (!req.body.email) {
        res.status(400).json({ error: 'error', message: 'email required'})
        return ;
    }
    profileService.checkEmail(req.body.email)
        .then(response => res.json(response))
        .catch(err => {
            res.json({
                error: err,
                message: 'server error. Try again!'
            })
        });
})

router.post('/resetPassword', (req, res) => {
    const email = req.body.email;
    const confirmEmail = req.body.confirmEmail;
    if (!email || !confirmEmail) {
        res.status(422).json({
            error: 'invalid request',
            message: 'provide both email and confirmEmail in request body'
        });
        return ;
    }
    if (email != confirmEmail) {
        res.json({
            error: 'invalid request',
            message: 'confirmEmail must match email'
        })
        return ;
    }
    profileService.resetPassword(email)
        .then(response => res.json(response))
        .catch(err => {
            res.json({
                error: err,
                message: 'server error'
            })
        });
});

router.put('/like/:id', (req, res) => {
    const userId = req.params.id;
    const targetId = req.body.targetId;
    const targetType = req.body.targetType
    if (!userId || !targetId || !targetType) {
        res.status(422).json({
            error: 'invalid request',
            message: "provide target id and user id and targetType"
        })
        return ;
    }
    profileAction.like(userId, targetType, targetId).then(ret => {
        res.status(200).json(ret)
    }).catch(err => {
        res.status(err.status).json(err)
    })

})

module.exports = router;