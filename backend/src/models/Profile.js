
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


//create Schema for porfile
const ProfileSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    friends: {
        type: [String],
        default: []
    },
    images: {
        type: [String],
        default: []
    },
    notification: {
        type: Boolean,
        default: true
    },
    isConfirmed: {
        type: Boolean,
        default: false
    },
    confirmationHash: {
        type: String,
        default: ''
    },
    passwordResetHash: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: Date.now()
    },
    firstTime: {
        type: Boolean,
        default: true
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);