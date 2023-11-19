const { default: mongoose } = require("mongoose");
var db = require("./db");

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
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
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        orderDate: {
            type: Date,
            default: Date.now,
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