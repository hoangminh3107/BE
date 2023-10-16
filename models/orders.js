const { default: mongoose } = require("mongoose");
var db = require("./db");

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
