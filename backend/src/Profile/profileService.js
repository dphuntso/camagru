

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
    getUserWithEmail
} = require('../help');

const Profile = require('../models/Profile');
const ActivateAccount = require('../models/ActivateAccount');



function getAllProfiles() {
    return (new Promise((resolve, reject) => {
        Profile.find().then(res => resolve(res));
    }))
}

function getProfile(req, res) {
    Profile.findById(req.params.id)
        .then(profile => {
            res.json(response);
        }).catch(err => {
            res.status(401).json({
                error: err,
                message: 'server error'
            })
        });
}

function removeSlashFromhash(hash) {
    let i = 0;
    let ret = '';
    while (i < hash.length) {
        if (hash[i] == '/') {
            ret += '_';
        } else {
            ret += hash[i];
        }
        i++;
    }
    return ret;
}

function createProfile(body) {
    return (new Promise(async (resolve, reject) => {
        let ret = await checkUsername(body.userName);
        if (ret.error) {
            resolve(ret);
            return ;
        }
        ret = await checkEmail(body.email);
        if (ret.error) {
            resolve(ret);
            return ;
        }
        if (body.password != body.confirmPassword) {
            resolve({
                error: 'password dont match',
                message: 'password dont match'
            })
            return ;
        }
        let password = await hashPassword(body.password);
        if (password.error) {
            resolve({
                error: 'Server error',
                message: 'Oops Server Error. seems like the engineers are slacking. Please try again after a while.'
            })
            return ;
        }
        let confirmationHash = await hashPassword(body.email + 'secret');
        confirmationHash = removeSlashFromhash(confirmationHash);
        const newProfile = new Profile({
            userName: body.userName,
            email: body.email,
            password: password,
            confirmationHash: confirmationHash
        });
        newProfile.save()
            .then(response => {
                if (!response) {
                    resolve({
                        error: 'Server error',
                        message: 'Oops Server Error. seems like the engineers are slacking. Please try again after a while.'
                    })
                    return ;
                }
                sendActivationLink(response._id, body.email, confirmationHash);
                resolve({message: 'successfully registered. Please check your email for confirmation link.'});
                return ;
                // sendActivationLink(response._id, body.email);
            })
            .catch(err => resolve({
                error: err,
                message: 'server error'
            }))
    }));

    // request(baseUrl + '/' + profileIndex, {
    //     method: 'POST',
    //     json: true,
    //     body: {
    //         userName: req.body.userName,
    //         email: req.body.email,
    //         password: body.password,
    //         isConfirmed: false
    //     }
    // }, (err, response, body) => {
    //     if (err || body.error) {
    //         res.json({
    //             error: (err) ? err : body.error
    //         })
    //         return ;
    //     }
    //     res.json(body);
    // })
}

function deleteProfile(id) {
    return (new Promise((resolve, reject) => {
        Profile.findById(id)
            .then(profile => profile.remove().then((response) => resolve(response)))
            .catch(err => resolve({
                err,
                status: 'fail'
            }));
    }));
}

function confirmAccount(hash) {
    return new Promise((resolve, reject) => {
        ActivateAccount.findOne({ hash: hash})
            .then(response => {
                if (!response) {
                    resolve(response);
                    return ;
                }
                Profile.findById(response.userId)
                    .then(user => {
                        if (!user) {
                            resolve({
                                error: 'expired link',
                                message: 'user doesnt exists'
                            })
                            return ;
                        }
                        if (user.confirmationHash == hash) {
                            Profile.findOneAndUpdate(
                                {"_id": user._id},
                                {
                                    "$set": {
                                        "isConfirmed": true,
                                        confirmationHash: ''
                                    }
                                }
                            ).then(ret => {
                                if (!ret) {
                                    resolve({
                                        error: 'server error',
                                        message: 'database connection error'
                                    })
                                    return ;
                                }
                                response.remove().then(data => data).catch(err => {
                                    console.log('confirm account error => ', err);
                                });
                                resolve({
                                    data: ret,
                                    message: 'Account Registered Successfully. please login to starting using the service.'
                                })
                                return ;
                            }).catch(err => {
                                resolve({
                                    error: err,
                                    message: 'server error'
                                })
                                return ;
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        resolve({
                            error: err.TypeError,
                            message: 'server error'
                        })
                        return ;
                    })
            })
            .catch(err => {
                resolve({
                    error: err,
                    message: 'server error'
                })
                return ;
            })
    })
}

function updateResetPassword(id, hash) {
    return new Promise((resolve, reject) => {
        user.findOneAndUpdate(
            {"_id": user._id},
            {
                "$set": {
                    "passwordResetHash": hash
                }
            }
        ).then(data => {
            resolve({
                message: data
            })
        })
        .catch(err=> {
            resolve({
                error: err,
                message: 'server error'
            })
        })
    })
}

function resetPassword(email) {
    return new Promise((resolve, reject) => {
        Profile.findOne({email: email})
            .then(async user => {
                if (user) {
                    if (user.email = email) {
                        let hash = await randomHash(email + 'something23');
                        hash = removeSlashFromhash(hash);
                        let response = await updateResetPassword;
                        if (response.error) {
                            resolve(response);
                            return ;
                        }
                        response = sendResetPasswordLink(email, hash);
                        if (response.error) {
                            resolve(response);
                            return ;
                        }
                    }
                }
                resolve({
                    message: 'reset link has been send to the email provided. Pleases check your email.'
                })
                return ;
            }).catch(err => {
                console.log('err');
                resolve({
                    error: err,
                    message: 'server error. please try again'
                })
            })
    })
}

function changePasswordWithHash(password, confirmPassword, hash, email) {
    return new Promise(async (resolve, reject) => {
        let user = await getUserWithEmail(email);
        if (user.error) {
            resolve({
                error: user.error,
                message: 'somehting went wrong. please try a bit later'
            })
            return ;
        }
        if (user.passwordResetHash != hash) {
            resolve({
                error: 'invalid request',
                message: 'The page you are looking for doesnt seem to exists. Do you need to be here?'
            });
            return;
        }
        resolve(changePassword(password, email));
    })
}

async function changePassword(password, email) {
    let hash = await hashPassword(password);
    return new Promise((resolve, reject) => {
        Profile.findOneAndUpdate(
            {"email": email},
            {
                "$set": {
                    "password": hash
                }
            }
        ).then(data => {
            resolve({
                message: data
            })
        })
        .catch(err=> {
            resolve({
                error: err,
                message: 'server error'
            })
        })
    });
}

module.exports = {
    getAllProfiles,
    getProfile,
    createProfile,
    deleteProfile,
    confirmAccount,
    resetPassword,
    changePasswordWithHash
}