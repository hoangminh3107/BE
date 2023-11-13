const { default: mongoose } = require("mongoose");
var db = require("./db");

const orderSchema = new mongoose.Schema(
    {
    userId: { 
        type: String, 
        required: true,
    },
    restaurantName: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: String,
    price:{
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
},
    {
        collection: 'Order'
    }

);
let Order = db.mongoose.model('Order', orderSchema);
module.exports = {
    Order
}
//