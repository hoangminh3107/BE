const { default: mongoose } = require("mongoose");
var db = require("./db");

<<<<<<< HEAD

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
=======
const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  image: String,
  price: {
    type: Number,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
});
let orderModel = db.mongoose.model("orderModel", orderSchema);
>>>>>>> e99f3b543e59d4ff7ee2ab5faae2de42ba241fb1
