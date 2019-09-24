const express = require('express');
const comment = require('./../../src/Comment/comment');

const verifyToken = require('../../middleware/auth');

const router = express.Router();
const { getCommentWithId } = require('./../../src/help');

router.get('/', (req, res) => {
    comment.getAllComments()
        .then(response => res.json(response))
        .catch(err => {
            res.status(500).json(err)
        })
})

router.get('/:id', (req, res) => {
    getCommentWithId(req.params.id)
        .then(ret => res.json(ret))
        .catch(err => res.status(400).json(err));
});

router.post('/:id', (req, res) => {
    const userId = req.params.id;
    const { message, targetId, targetType } = req.body;
    if (!userId || !message || !targetId || !targetType) {
        res.status(422).json({
            error: 'invalid request',
            message: 'provide valid userId, targetId, message and targetType'
        })
        return ;
    }
    if (targetType != "post" && targetType != "comment") {
        res.status(422).json({
            error: 'invalid request',
            message: "targetType must be either post or comment"
        })
        return ;
    }
    comment.create(userId, message, targetId, targetType)
        .then(response => {
            res.json(response)
        })
        .catch(err => {
            res.status(err.status).json(err);
        })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    const { commentId } = req.body;

    if (!id || !commentId) {
        res.status(404).json({
            error: 'invalid request',
            message: "invlid userId or commentId"
        })
        return ;
    }
    comment.remove(id, commentId)
        .then(response => {
            res.json(response)
        })
        .catch(err => {
            res.status(err.status).json(err)
        });
});

router.put('/:id', (req, res) => {
    const userId = req.params.id
    let { commentId, message } = req.body;
    if (!userId || !commentId || !message) {
        res.status(400).json({
            error: 'invalid request',
            message: "require userId, commentId and new message"
        })
        return ;    
    }
    if (!message) {
        message = ".";
    }
    message = message + "(edited)";
    comment.edit(userId, commentId, message)
        .then(response => {
            res.json(response)
        }).catch(err => {
            res.status(err.status).json(err)
        })
});

module.exports = router;
