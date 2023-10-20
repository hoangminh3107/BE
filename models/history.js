const { default: mongoose } = require('mongoose');
var db = require('./db');

const historySchame = new mongoose.Schema({
    userId: {
        type: String,
        require: true,
    },
    orderId: {
        type: String,
        require: true,
    },
    restaurantName: {
        type: String,
        require: true,
    },
    price:{ 
        type: Number,
        require: true
    },
    time: {
        type: Date,
        require: true,
    },
},
{
    collection: 'History'
}
);
let History = db.mongoose.model('History', historySchame);
module.exports = {
    History
}
//