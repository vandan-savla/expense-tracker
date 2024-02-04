const mongoose = require('mongoose');

const UserModel = new mongoose.Schema({

    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', UserModel);