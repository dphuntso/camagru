

const request = require('request');
const backend = require('../utils/config').backend;

function requestBackend(url, body) {
    return new Promise((resolve, reject) => {
        request(url, body, (err, res, body) => {
            if (err || body.error) {
                resolve({
                    error: err ? err : body.error,
                    message: err ? 'server error' : body.message
                });
                return ;
            }
            resolve(body);
            return ;
        });
    })
}

function createAccount(user) {
    return (new Promise((resolve, reject) => {
        let url = backend + '/profile/create';
        request(url, {
            method: 'POST',
            json: true,
            body: user
        }, (err, res, body) => {
            if (err) {
                resolve({
                    error: err,
                    message: 'server error. Try registering again'
                })
                return ;
            }
            if (body.error) {
                resolve({
                    error: body.error,
                    message: body.message
                })
                return ;
            }
            resolve({
                status: 'success',
                message: 'registration successfull'
            })
            return ;
        });
        // resolve('done');
    }));
}

function login(userName, password) {
    return new Promise((resolve, reject) => {
        if (!userName || !password) {
            resolve({
                error: 'invalid request',
                message: 'provide both userName andn password'
            })
            return ;
        }
        request('http://localhost:9100/camagru/login', {
            method: 'POST',
            json: true,
            body: {
                userName: userName,
                password: password
            }
        }, (err, res, body) => {
            if (err || body.error) {
                resolve({
                    error: err ? err : body.error,
                    message: err ? 'server Error' : body.message
                })
                return ;
            }
            resolve(body);
            return ;
            // history.push('/profile');
        });
    });
}

function logout(id) {
    return new Promise((resolve, reject) => {
        if (id) {
            request('http://localhost:9100/camagru/logout/', {
                method: 'PUT',
                json: true,
                body: {
                    id: id
                }
            }, (err, res, body) => {
                if (err || body.error) {
                    resolve({
                        error: err ? err : body.error,
                        message: err ? 'server Error' : body.message
                    })
                    return ;
                }
                resolve(body);
                return ;
                // history.push('/profile');
            });
        } else {
            resolve('done from frontend');
        }
    })
}

function confirmAccount(hash) {
    return new Promise((resolve, reject) => {
        let url = backend + '/activate/' + hash;
        request(url, {
            method: 'POST'
        }, (err, res, body) => {
            if (err) {
                resolve({
                    error: err,
                    message: 'server error'
                });
                return ;
            }
            if (!body || body.error) {
                resolve({
                    error: body ? body.error : 'error',
                    message: 'please try again'
                });
                return ;
            }
            resolve({
                status: 'success',
                message: 'Email confirmed!!'
            });
            return ;
        });
    });
}

function resetPassword(email, confirmEmail) {
    return new Promise((resolve, reject) => {
        let url = backend + '/profile/resetPassword';
        let body = {
            method: 'POST',
            json: true,
            body: {
                email: email,
                confirmEmail: confirmEmail
            }
        }
        requestBackend(url, body).then(response => {
            if (response.error) {
                resolve(response);
                return ;
            }
            console.log('reset Response from backend => ', response)
            resolve({
                message: 'Password Reset Successfully.'
            })
        }).catch(err => {
            resolve({
                error: 'server error',
                message: 'please try again'
            })
        })
    })
}

module.exports = {
    createAccount,
    login,
    logout,
    confirmAccount,
    resetPassword
}