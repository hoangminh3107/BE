const { default: mongoose } = require('mongoose');
var db = require('./db');

const historySchame = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    },
    restaurantName: {
        type: String,
        require: true,
    },
    orderId: {
        type: String,
        require: true
    },
    price:{ 
        type: Number,
        require: true
    },
    time: {
        type: Date,
        require: true,
    },
    _id: mongoose.Schema.Types.ObjectId,
});
let historyOrder = db.mongoose.model('historyOrder', historySchame);