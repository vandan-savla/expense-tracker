const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    amount: {
        type: Number,
        required: true,
        maxlength: 20,
        trim: true


    },
    type: {
        type:String,
        default: 'income',
    },
    date: {
        type: Date,
        default: Date.now,
        trim: true,
        required: true
    },
    category: {
        type:String,
        required: true,
        trim: true
    },
    description: {
    type:String,   
    required: true,
    trim: true,
    maxlength: 200
    }
},{timestamps: true});

module.exports = mongoose.model('Income', IncomeSchema);