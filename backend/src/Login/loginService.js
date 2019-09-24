

const config = require('config');
const jwt = require('jsonwebtoken');
// const request = require('request');
// const baseURL = config.get('baseURL');
const bcrypt = require('bcryptjs');


const Profile = require('../models/Profile');
const { checkUsername, checkEmail, hashPassword, sendActivationLink } = require('../help');

function checkInemail(userName) {
    return new Promise((resolve, reject) => {
        Profile.findOne({"email": userName}).then(user => {
            resolve(user);
        }).catch(err => {
            resolve({
                error: 'server error'
            });
        });
    });
}

function checkInuserName(userName) {
    return new Promise((resolve, reject) => {
        Profile.findOne({userName: userName}).then(user => {
            resolve(user);
        }).catch(err => {
            resolve({
                error: 'server error'
            });
        });
    });
}

function dataToSendwhenLogin(user) {
    let data = {
        firstName: user.firstName,
        lastName: user.lastName,
        friends: user.friends,
        images: user.images,
        notification: user.notification,
        date: user.date,
        userName: user.userName,
        email: user.email
    }
    return data;
}

function login(userName, password) {
    // Profile.findOne({ type: 'iphone' }, function (err, adventure) {});
    return (new Promise(async (resolve, reject) => {
        if (!userName || !password) {
            resolve({
                error: 'invalid request',
                message: 'provide both userName and password'
            })
            return ;
        }
        let user = await checkInemail(userName);
        if (!user || user.error) {
            user = await checkInuserName(userName);
            if (!user || user.error) {
                resolve({
                    error: 'invalid request',
                    message: 'invalid userName or password'
                })
                return ;
            }
        }
        if (!user.isConfirmed) {
            resolve({
                error: 'Account not Confirmed',
                message: 'please confirm your email address first.'
            })
            return ;
        }
        bcrypt.compare(password, user.password).then(isTrue => {
            if (isTrue) {
                jwt.sign({id: user._id, userName: user.userName}, config.get('jwtToken'), (err, token) => {
                    console.log(user);
                    resolve({
                        token: token,
                        userId: user._id,
                        user: dataToSendwhenLogin(user)
                    });
                });
            } else {
                resolve({
                    error: 'invalid request',
                    message: 'invalid userName or password'
                })
            }
        }).catch(err => {
            resolve({
                error: err,
                message: 'server error'
            })
        })
    }));
}

module.exports = {
    login
}