

const Profile = require('./models/Profile');
const Comment = require('./models/Comment');
const Post = require('./models/Post');
const ActivateAccount = require('./models/ActivateAccount');
const config = require('config');
const bcrypt = require('bcryptjs')

// mail options
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'Outlook365',
  auth: {
    user: config.email.register.email,
    pass: config.email.register.password,
  },
});

// sendGrid
const sendGridMail = require('@sendgrid/mail');
sendGridMail.setApiKey(config.sendgridAPI);


function registerMailOptioins(tomail, hash) {
    // hash and confirmAccount are joined in following html because -> react router doesnt let me use confirmAccount/:hash.
    // it only allows me to use /confrimAccount:hash. No idea y.
    const WEBSITE_URL = config.frontend + '/confirmAccount';
    return mailBody = {
        to: tomail,
        from: 'camagru@tutanota.com',
        subject: 'register account',
        text: `${config.register.message1} ${WEBSITE_URL}${hash}  ${config.register.message2}`,
        html: `${config.register.message1} <strong>${WEBSITE_URL}/${hash}</strong>  ${config.register.message2}`,
    };
}

function resetPasswordMailOptioins(tomail, hash) {
    // hash and confirmAccount are joined in following html because -> react router doesnt let me use confirmAccount/:hash.
    // it only allows me to use /confrimAccount:hash. No idea y.
    const WEBSITE_URL = config.frontend + '/resetPassword';
    return mailBody = {
        to: tomail,
        from: 'camagru@tutanota.com',
        subject: 'reset Password',
        text: `${config.register.message1} ${WEBSITE_URL}${hash}  ${config.register.message2}`,
        html: `${config.register.message1} <strong>${WEBSITE_URL}/${hash}</strong>  ${config.register.message2}`,
    };
}

function checkEmail(email) {
    return (new Promise((resolve, reject) => {
        Profile.findOne({ email: email}, (err, profile) => {
            if (err) {
                reject({error: err, message: 'server error. Try again!'});
                return ;
            }
            if (profile) {
                resolve({
                    error: true,
                    message: 'Email Already exist. please select another'
                })
                return ;
            }
            resolve({
                status: 'success'
            })
        })
    }));
}

function checkUsername(userName) {
    return (new Promise((resolve, reject) => {
        Profile.findOne({ userName: userName}, (err, profile) => {
            if (err) {
                reject({error: err, message: 'server error. Try again!'});
                return ;
            }
            if (profile) {
                resolve({
                    error: true,
                    message: 'userName Already exist. please select another'
                })
                return ;
            }
            resolve({
                status: 'success'
            })
        })
    }));
}

async function sendActivationLink(id, email, hash) {
    console.log('inside sendActivationLink')
    // const mailOptions = {
    //     from: config.email.register.email,
    //     to: email,
    //     subject: config.register.message3,
    //     text: `${config.register.message1} ${WEBSITE_URL}${hash}  ${config.register.message2}`,
    // };

    const activateAccount = new ActivateAccount({
        userId: id,
        hash: hash
    });
    let sendBody = registerMailOptioins(email, hash);
    activateAccount.save()
        .then(response => {
            console.log('inside sendActivationLink response \n********\n')
            sendGridMail.send(sendBody).then(response1 => {
                console.log('\n********\nafter sendMail.send \n********\n')
                console.log(response1)
                console.log('\n********\nend of respones\n********\n')
            });
            console.log('after sendgrid send \n********\n')
        }).catch(err => {
            // console.log({
            //     error: err,
            //     message: 'server error'
            // })
            resolve({
                error: err,
                message: 'server error'
            })
        })
}

function hashPassword(data) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(data, salt, (err, hash) => {
                console.log(err);
                if (err) {
                    resolve({
                        error: 'server error',
                        message: 'Server Error. please try again'
                    })
                    return ;
                }
                resolve(hash)
                return ;
            })
        })
    })
}

async function sendResetPasswordLink(email, hash) {
    return new Promise((resolve, reject) => {
        let sendBody = resetPasswordMailOptioins(email, hash);
        sendGridMail.send(sendBody).then(response1 => {
            console.log('\n********\nafter sendResetRequest.send \n********\n')
            console.log(response1)
            resolve({
                message: 'reset link send'
            });
            console.log('\n********\nend of respones\n********\n')
        }).catch(err => {
            console.log(err);
            resolve({
                error: err,
                message: 'server error'
            });
        });
    });
}

function randomHash(data) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(data + 'random' + Date.now(), salt, (err, hash) => {
                console.log(err);
                if (err) {
                    resolve({
                        error: 'server error',
                        message: 'Server Error. please try again'
                    })
                    return ;
                }
                resolve(hash)
                return ;
            })
        })
    })
}

function getUserWithEmail(email) {
    return new Promise((resolve, reject) => {
        Profile.findOne({email: email}, (err, profile) => {
            if (err) {
                resolve({
                    error: err,
                    message: 'server error'
                })
            }
            if (!profile) {
                resolve({
                    error: 'invalid email',
                    message: 'email doesnt exists'
                })
            }
            resolve(profile)
        });
    });
}

function getUserWithId(id) {
    return new Promise((resolve ,reject) => {
        Profile.findById(id, (err, user) => {
            if (err) {
                resolve({error: err,
                    status: 404,
                    message: "id not valid"
                })
            } else {
                resolve(user)
            }
        });
    });
}

function getCommentWithId(id) {
    return new Promise((resolve ,reject) => {
        Comment.findById(id, (err, user) => {
            if (err) {
                resolve({error: err,
                    status: 404,
                    message: "id not valid"
                })
            } else {
                resolve(user)
            }
        });
    });
}

function getPostWithId(id) {
    return new Promise((resolve ,reject) => {
        Post.findById(id, (err, user) => {
            if (err) {
                resolve({error: err,
                    status: 404,
                    error: "invalid request",
                    message: "id not valid"
                })
            } else {
                resolve(user)
            }
        });
    });
}

module.exports = {
    checkUsername,
    checkEmail,
    hashPassword,
    sendActivationLink,
    sendResetPasswordLink,
    randomHash,
    getUserWithEmail,
    getUserWithId,
    getCommentWithId,
    getPostWithId
}
