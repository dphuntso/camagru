
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


//create Schema for porfile
const CommentSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    likes: {
        type: [String],
        default: []
    },
    targetId: {
        type: String,
        required: true
    },
    targetType: {
        type: String,
        require: true
    },
    comments: {
        type: [Object],
        default: []
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

module.exports = Comment = mongoose.model('comment', CommentSchema);