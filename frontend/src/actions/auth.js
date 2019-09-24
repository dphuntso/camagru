
import {
    LOG_IN_ATTEMPT,
    LOG_IN_SUCCESS,
    LOG_IN_FAIL,
    LOG_OUT,
    REGISTER_ATTEMPT,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    CONFIRM_ACCOUNT_ATTEMPT,
    CONFIRM_ACCOUNT_SUCCESS,
    CONFIRM_ACCOUNT_FAIL,
    RESET_PASSWORD_ATTEMPT,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    CURRENT_PAGE
} from './types';
import { history } from '../router/AppRouter';
import request from 'request';
import authAPI from '../api/auth';

const backend = require('../utils/config').backend;

export const logout = (id) => dispatch => {
    dispatch({type: LOG_OUT});
    authAPI.logout(id).then(response => {
        console.log('\n\n\n*********response from logout => ', response, '********\n\n\n');
    }).catch(err => {
        console.log(err);
    });
}

export const login = (userName, password) => dispatch => {
    dispatch({type: LOG_IN_ATTEMPT});
    if (!userName || !password) {
        dispatch({
            type: LOG_IN_FAIL,
            payload: {
                message: 'provide both userName and password'
            }
        })
        return ;
    }
    authAPI.login(userName, password).then(response => {
        if (!response || response.error) {
            dispatch({
                type: LOG_IN_FAIL,
                payload: {
                    message: !response ? 'Something Went Wrong. Please Try again' : response.message
                }
            });
            return ;
        }
        dispatch({
            type: LOG_IN_SUCCESS,
            payload: {
                user: response.user,
                token: response.token,
                userId: response.userId
            }
        });
        history.push('/');
    }).catch(err => {
        dispatch({
            type: LOG_IN_FAIL,
            payload: {
                message: 'Something Went Wrong. Please Try again'
            }
        })
    });
}

function checkEmail(email) {
    return (new Promise((resolve, reject) => {
        let error;
        request(backend + '/profile/checkEmail', {
            method: 'POST',
            json: true,
            body: {
                email: email
            }
        }, (err, res, body) => {
            if (err){
                error = {
                    emailState: true,
                    emailMessage: 'server Error. Please Try again'
                }
            }
            else if (body.error) {
                console.log('body => ', body)
                error = {
                    emailState: true,
                    emailMessage: body.message
                }
            } else {
                error = {
                    emailState: false,
                    emailMessage: ''
                }
            }
            resolve(error);
        });
    }));
}

function checkUsername(userName) {
    return (new Promise((resolve, reject) => {
        if (!userName) {
            resolve({userNameState: true, userNameMessage: 'userName Cannot be empty'})
            return ;
        }
        request('http://localhost:9100/camagru/profile/checkUsername', {
            method: 'POST',
            json: true,
            body: {
                userName: userName
            }
        }, (err, res, body) => {
            if (err){
                resolve({userNameState: true, userNameMessage: 'Unexpected error. please try again'})
            }
            else if (body.error) {
                resolve({userNameState: true, userNameMessage: body.message})
            } else {
                resolve({userNameState: false, userNameMessage: ''})
            }
            return ;
        });

    }));
}


export const register = (userInfo) => dispatch => {
    return new Promise(async (resolve, reject) => {
        const { email, userName, password, confirmPassword } = userInfo;
        dispatch({type: REGISTER_ATTEMPT});
        authAPI.createAccount(userInfo).then(response => {
            if (response.error) {
                dispatch({type: REGISTER_FAIL, payload: response.message});
                resolve('');
                return ;
            }
            dispatch({type: REGISTER_SUCCESS});
            history.push('/registerSuccess');
            resolve({});
        }).catch(err => {
            history.push('/registerError');
            resolve({});
        });
    })
}

export const confirmAccount = (hash) => dispatch => {
    dispatch({type: CONFIRM_ACCOUNT_ATTEMPT});
    authAPI.confirmAccount(hash).then(response => {
        if (response.error) {
            dispatch({
                type: CONFIRM_ACCOUNT_FAIL,
                payload: {
                    message: response.message
                }
            })
            return ;
        }
        dispatch({type: CONFIRM_ACCOUNT_SUCCESS});
        return;
    }).catch(err => {
        console.log('confirm Account => ', err)
        dispatch({
            type: CONFIRM_ACCOUNT_FAIL
        });
    });
    // return (new Promise((resolve, reject) => {
    //     request(url, {
    //         method: 'POST'
    //     }, (err, res, body) => {
    //         if (err) {
    //             resolve('');
    //             dispatch({type: CONFIRM_ACCOUNT_FAIL});
    //             return ;
    //         }
    //         if (!body || body.error) {
    //             resolve('');
    //             dispatch({type: CONFIRM_ACCOUNT_FAIL});
    //         }
    //         resolve('');
    //         dispatch({type: CONFIRM_ACCOUNT_SUCCESS});
    //         return ;
    //     });
    // }))
}


/**
 *  intended usage of this function => toggle between home page and picture page when logo(header logo) is pressed
 */
export const changeCurrentPage = () => dispatch => {
    dispatch({
        type: CURRENT_PAGE
    })
}

export const resetPassword = (email, confirmEmail) => dispatch => {
    dispatch({type: RESET_PASSWORD_ATTEMPT});
    authAPI.resetPassword(email, confirmEmail).then(response => {
        if (response.error) {
            dispatch({
                type: RESET_PASSWORD_FAIL,
                payload: {
                    message: response.message
                }
            })
            return ;
        }
        dispatch({
            type: RESET_PASSWORD_SUCCESS
        });
    }).catch(err => {
        console.log('reset PAssword => ', err)
        dispatch({
            type: CONFIRM_ACCOUNT_FAIL
        });
    });
}
