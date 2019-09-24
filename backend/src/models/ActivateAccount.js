
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ActivateAccountSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    }
});

module.exports = ActivateAccount = mongoose.model('activateaccount', ActivateAccountSchema);