

const config = require('config');
const jwt = require('jsonwebtoken');
// const request = require('request');
// const baseURL = config.get('baseURL');
const bcrypt = require('bcryptjs');

const Profile = require('../models/Profile');

function logout(id) {
    return new Promise((resolve, reject) => {
        resolve('log out');
    })
}

module.exports = {
    logout
}