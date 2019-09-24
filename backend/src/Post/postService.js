

const {
    getUserWithId,
    getPostWithId
} = require('../help');

const Post = require('../models/Post');



function getAllPost() {
    return (new Promise((resolve, reject) => {
        Post.find().then(res => resolve(res));
    }))
}

function create(userId, postTitle, description, img) {
    return new Promise(async (resolve, reject) => {
        let user = await getUserWithId(userId);
        if (user.error) {
            reject(user);
            return ;
        }
        console.log("user => ", user)
        const newPost = new Post({
            userName: user.userName,
            userId: userId,
            postTitle: postTitle ? postTitle : null,
            description: description ? description : null,
            img: img ? img : null
        });
        newPost.save()
            .then(response => {
                if (!response) {
                    resolve({
                        error: 'Server error',
                        message: 'Server error.!!!! while making a new post'
                    })
                    return ;
                }
                console.log("response is : ", response)
                resolve({message: 'Post created Successfully'});
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

function remove(userId, postId) {
    return new Promise(async (resolve, reject) => {
        let user = await getUserWithId(userId);
        if (user.error) {
            reject(user);
            return ;
        }
        let post = await getPostWithId(postId);
        if (post.error) {
            reject(post);
            return ;
        }
        post.deleted = true;
        post.save()
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

function edit(userId, postId, postTitle, message, img) {
    return new Promise(async (resolve, reject) => {
        let user = await getUserWithId(userId);
        if (user.error) {
            reject(user);
            return ;
        }
        let post = await getPostWithId(postId);
        if (post.error) {
            reject(post);
            return ;
        }
        if (postTitle) {
            post.postTitle = postTitle;
        }
        if (message) {
            post.description = message;
        }
        if (img) {
            post.img = img;
        }
        post.save().then(response => {
            console.log("this is response at the backend => ", response);
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

function deletePost(id) {
    return (new Promise((resolve, reject) => {
        Post.findById(id)
            .then(post => post.remove().then((response) => resolve(response)))
            .catch(err => reject({
                ...err,
                status: 500
            }));
    }));
}

module.exports = {
    getAllPost,
    create,
    remove,
    edit,
    deletePost
}