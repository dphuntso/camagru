
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


//create Schema for porfile
const PostSchema = new Schema({
    postTitle: {
        type: String,
        default: ''
    },
    img: {
        type: String,
        default: null
    },
    filterId: {
        type: String,
        default: null
    },
    userName: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    likes: {
        type: [String],
        default: []
    },
    comments: {
        type: [Object],
        default: []
    },
    description: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: Date.now()
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

module.exports = Post = mongoose.model('post', PostSchema);