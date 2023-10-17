const { default: mongoose } = require("mongoose");
var db = require("./db");

const orderSchema = new mongoose.Schema(
    {
    userId: { 
        type: String, 
        required: true 
    },
    name: {
        type: String,
        require: true
    },
    image: String,
    price:{
        type: Number,
        require: true,
    },
    quantity: {
        type: Number,
        require: true,
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
