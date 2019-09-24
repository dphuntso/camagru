

const config = require('config');
const request = require('request');

const baseUrl = config.get('baseURL')
const profileIndex = config.get('profileIndex');

const {
    checkUsername,
    checkEmail,
    hashPassword,
    sendActivationLink,
    sendResetPasswordLink,
    randomHash,
    getUserWithEmail,
    getPostWithId,
    getUserWithId,
    getCommentWithId
} = require('../help');

const Post = require('../models/Post');
const Profile = require('../models/Profile');
const Comment = require('../models/Comment');

function like(userId, targetType, targetId) {
    return new Promise(async (resolve, reject) => {
        let user = await getUserWithId(userId);
        let target;
        if (targetType === "comment") {
            target = await getCommentWithId(targetId);
        }
        else if (targetType === "post") {
            target = await getPostWithId(targetId);
        }
        else {
            reject({
                status: 422,
                error: 'invalid request',
                message: `target type(${targetType}) invalid`
            })
        }
        if (user.error) {
            reject(user);
        }
        if (target.error) {
            reject(post);
        }
        let list = target.likes;
        let i = 0;
        let len = list.length;
        let bool = true;
        while (i < len) {
            console.log("i => ", i, ", list[i] => ", list[i])
            if (list[i] == userId) {
                console.log("this should shouw up")
                list.splice(i, 1);
                target.likes = list;
                bool = false;
                break ;
            }
            i++;
        }
        if (bool) {
            target.likes.push(userId);
        }
        target.save().then(res => {
            resolve(res);
        }).catch(err => {
            reject({
                error: err,
                status: 500,
                message: 'server error.'
            })
        })
    })
    
}

module.exports = {
    like
}