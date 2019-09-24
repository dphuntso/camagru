
const {
    getUserWithId,
    getCommentWithId,
    getPostWithId
} = require('../help');

const Comment = require('../models/Comment');



function getAllComments() {
    return (new Promise((resolve, reject) => {
        Comment.find().then(res => resolve(res));
    }))
}

function create(userId, message, targetId, targetType) {
    console.log("inside comment create");
    return new Promise(async (resolve, reject) => {
        let user = await getUserWithId(userId);
        if (user.error) {
            reject(user);
            return ;
        }
        let target;
        if (targetType == "post") {
            target = await getPostWithId(targetId);
            if (target.error) {
                reject(target);
                return ;
            }

        } else if (targetType == "comment") {
            target = await getCommentWithId(targetId);
            if (target.error) {
                reject(target);
                return ;
            }
        }
        console.log("user => ", user)
        const newComment = new Comment({
            userName: user.userName,
            userId: userId,
            message: message,
            targetId: targetId,
            targetType: targetType
        });
        newComment.save()
            .then(response => {
                if (!response) {
                    reject({
                        status: 500,
                        error: 'Server error',
                        message: 'Server error.!!!! while making a new post'
                    })
                    return ;
                }
                target.comments.push(response._id);
                target.save()
                    .then(res => {
                    }).catch(err => {
                        console.log("error in comment create().. => ", err)
                    })
                resolve(response);
                return ;
                // sendActivationLink(response._id, body.email);
            })
            .catch(err => reject({
                status: 500,
                error: err,
                message: 'server error'
            }))
    })
}

function remove(userId, commentId) {
    return new Promise(async (resolve, reject) => {
        let user = await getUserWithId(userId);
        if (user.error) {
            reject(user);
            return ;
        }
        let comment = await getCommentWithId(commentId);
        if (comment.error) {
            reject(comment);
            return ;
        }
        comment.deleted = true;
        comment.save()
            .then(response => {
                if (!response) {
                    reject({
                        status: 500,
                        error: 'server Error',
                        message: "server error please try again later"
                    })
                    return ;
                }
                resolve(response)
            }).catch(err => {
                reject({...err, status: 500})
            })
    })
}

function edit(userId, commentId, message) {
    return new Promise(async (resolve, reject) => {
        let user = await getUserWithId(userId);
        if (user.error) {
            reject(user);
            return ;
        }
        let comment = await getCommentWithId(commentId);
        if (comment.error) {
            reject(comment);
            return ;
        }
        comment.message = message;
        comment.save()
            .then(response => {
                if (!response) {
                    reject({
                        status: 500,
                        error: 'server Error',
                        message: "server error please try again later"
                    })
                    return ;
                }
                resolve(response)
            }).catch(err => {
                reject({...err, status: 500})
            })
    })
}

module.exports = {
    getAllComments,
    create,
    remove,
    edit
}