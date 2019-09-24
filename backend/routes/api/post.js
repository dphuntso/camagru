const express = require('express');
const post = require('./../../src/Post/postService');
const profileAction = require('./../../src/Profile/action');
const profileService = require('./../../src/Profile/profileService');

const verifyToken = require('../../middleware/auth');
const { getPostWithId } = require('./../../src/help');

const router = express.Router();

router.get('/', (req, res) => {
    post.getAllPost()
        .then(response => res.json(response))
    
})

router.get('/:id', (req, res) => {
    getPostWithId(req.params.id)
        .then(ret => res.json(ret))
        .catch(err => res.status(400).json(err))
});

router.post('/:id', (req, res) => {
    const userId = req.params.id;
    const { postTitle, message, img } = req.body;
    if (!userId) {
        res.status(400).json({
            error: 'invalid request',
            message: 'profileId must be a valid one'
        })
    }
    post.create(userId, postTitle, message, img)
        .then(response => {
            res.json(response)
        })
        .catch(err => {
            res.status(err.status).json(err);
        })
    
})

router.delete('/:id', (req, res) => {
    post.deletePost(req.params.id)
        .then(response => res.json({response, message: 'Post successfully deleted'}))
        .catch(err => res.json({error: err, message: 'server error. Please try again'}));
})

router.put('/:id', (req, res) => {
    const userId = req.params.id;
    let { postId, postTitle, message, img } = req.body;
    if (!postId || !userId) {
        res.status(400).json({
            error: "invalid request",
            message: "userId and postId required"
        })
    }
    if (!postTitle) {
        postTitle = null;
    }
    if (!message) {
        message = null;
    }
    if (!img) {
        img = null;
    }
    post.edit(userId, postId, postTitle, message, img)
        .then(response => {
            res.json(response)
        })
        .catch(err => {
            res.status(err.status).json(err);
        })
})

module.exports = router;
